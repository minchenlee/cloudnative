import { stadiumModel } from '../models/stadiumModel.js';


const stadiumController = {
    createStadium: async (req, res) => {
        const {sport, status, longitude, latitude, description, img_url, address, tel, createdById} = req.body;
        
        // validations
        const sports = ["BASKETBALL", "BASEBALL", "VOLLEYBALL", "TENNIS", "TABLETENNIS"];
        if (!sports.includes(sport)) return res.status(400).json({msg: "Sport not found."});

        const statuses = ["OPEN", "CLOSED", "MAINTENANCE"];
        if (!statuses.includes(status)) return res.status(400).json({msg: "Status not found."});

        // create stadium
        const stadium = await stadiumModel.createStadium(sport, status, longitude, latitude, description, img_url, address, tel, createdById);
        res.status(200).json({
            msg: "Stadium created successfully.",
            data: {
                stadium
            }
        });
    }
}

export default stadiumController;