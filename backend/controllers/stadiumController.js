import { stadiumModel } from '../models/stadiumModel.js';


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
        
        // validations
        const sports = ["BASKETBALL", "BASEBALL", "VOLLEYBALL", "TENNIS", "TABLETENNIS"];
        if (!sports.includes(sport)) return res.status(400).json({msg: "Sport not found."});

        // update stadium
        const stadium = await stadiumModel.updateStadiumById(name, sport, isIndoor, longitude, latitude, description, img_url, address, tel, openTime, closeTime, createdById);
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
    }
}

export default stadiumController;