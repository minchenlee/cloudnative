import { stadiumModel } from '../models/stadiumModel.js';
import { defaultCourtModel as courtModel } from '../models/courtModel.js';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const accessKeySecret = process.env.ACCESS_KEY_SECRET

const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: accessKeySecret
    }
});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const stadiumController = {
    createStadium: async (req, res) => {
        const {name, sport, isIndoor, time, location, description, img_url, contactInfo, createdById} = req.body;
        
        // validations
        const sports = ["BASKETBALL", "BADMINTON", "VOLLEYBALL", "TENNIS", "TABLETENNIS"];
        if (!sports.includes(sport)) return res.status(400).json({msg: "Sport not found."});

        const {openTime, closeTime} = time;
        const {address, longitude, latitude} = location;
        const {tel} = contactInfo;

        // create stadium
        const stadium = await stadiumModel.createStadium(name, sport, isIndoor, longitude, latitude, description, img_url, address, tel, openTime, closeTime, createdById);
        res.status(200).json({
            msg: "Stadium created successfully.",
            data: {
                stadium
            }
        });
    },
    updateStadiumImageById: async (req, res) => {
        try {
            if (!req.file) {
                res.status(400).json({msg: "No file uploaded."});
            }
            const {id} = req.params;
            const {buffer} = req.file;
            // upload image to S3
            const imgKey = randomImageName();
            const uploadParams = {
                Bucket: bucketName,
                Key: imgKey,
                Body: buffer,
                ContentType: req.file.mimetype,
            };
            const uploadCommand = new PutObjectCommand(uploadParams);
            const data = await s3Client.send(uploadCommand);
    
            if (data) {
                const stadium = await stadiumModel.updateStadiumImageById(id, imgKey);
                res.status(200).json({
                    msg: "Upload stadium image successfully.",
                    data: {
                        stadium
                    }
                });
            } else {
                res.status(500).json({msg: "Upload stadium image failed."});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Upload stadium image failed."});
        }
    },
    getStaduimImageById: async (req, res) => {
        try {
            const {id} = req.params;
            const stadium = await stadiumModel.getStadiumById(id);

            const getObjectParams = {
                Bucket: bucketName,
                Key: stadium.img_url
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            if (!url) return res.status(500).json({msg: "Get stadium image failed."});
            stadium.url = url;
            res.status(200).json({
                msg: "Get stadium image successfully.",
                data: {
                    stadium
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Get stadium image failed."});        
        }
    },
    deleteStadiumImageById: async (req, res) => {
        try {
            const {id} = req.params;
            const stadium = await stadiumModel.getStadiumById(id);
            const deleteParams = {
                Bucket: bucketName,
                Key: stadium.img_url
            };
            const command = new DeleteObjectCommand(deleteParams);
            const data = await s3Client.send(command);
            if (!data) return res.status(500).json({msg: "Delete stadium image failed."});
            const deletedStadium = await stadiumModel.deleteStadiumImageById(id);
            res.status(200).json({
                msg: "Delete stadium image successfully.",
                data: {
                    deletedStadium
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Delete stadium image failed."});        
        }
    },
    getAllStadiums: async (req, res) => {
        const stadiums = await stadiumModel.getAllStadiums();
        res.status(200).json({
            msg: "Get all stadiums successfully.",
            data: {
                stadiums
            }
        });
    },
    getStadiumById: async (req, res) => {
        const {id} = req.params;
        const stadium = await stadiumModel.getStadiumById(id);
        res.status(200).json({
            msg: "Get stadium by id successfully.",
            data: {
                stadium
            }
        });
    },
    updateStadiumById: async (req, res) => {
        const {id} = req.params;
        const {name, sport, isIndoor, time, location, description, img_url, contactInfo, createdById} = req.body;
        const {openTime, closeTime} = time;
        const {address, latitude, longitude} = location;
        const {tel} = contactInfo;
        console.log(location)
        // validations
        const sports = ["BASKETBALL", "BASEBALL", "VOLLEYBALL", "TENNIS", "TABLETENNIS"];
        if (!sports.includes(sport)) return res.status(400).json({msg: "Sport not found."});

        // update stadium
        const stadium = await stadiumModel.updateStadiumById(id, name, sport, isIndoor, longitude, latitude, description, img_url, address, tel, openTime, closeTime, createdById);
        res.status(200).json({
            msg: "Update stadium by id successfully.",
            data: {
                stadium
            }
        });
    },
    deleteStadiumById: async (req, res) => {
        const {id} = req.params;
        const stadium = await stadiumModel.deleteStadiumById(id);
        res.status(200).json({
            msg: "Delete stadium by id successfully.",
            data: {
                stadium
            }
        });
    },
    getStadiumsByUserId: async (req, res) => {
        const {userId} = req.params;
        const stadiums = await stadiumModel.getStadiumsByUserId(userId);
        // count each stadium's court number
        for (const stadium of stadiums) {
            const courts = await courtModel.getCourtsByStadiumId(stadium.id);
            stadium.courtNumber = courts.length;
        }
        console.log(stadiums)
        res.status(200).json({
            message: "Get stadiums by user id successfully.",
            data: {
                stadiums
            }
        });
    },
}

export default stadiumController;