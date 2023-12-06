import {userModel} from '../models/userModel.js';

const userController = {
    createUser: async (req, res) => {
        const {email, username} = req.body;
        try {
            const user = await userModel.createUser(email, username);
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({msg: error.message});
        }
    },
    getUserbyId: async (req, res) => {
        const {id} = req.params;
        const user = await userModel.getUserById(id);
        res.json(user);
    },
    getUserByUsername: async (req, res) => {
        const {username} = req.params;
        const user = await userModel.getUserByUsername(username);
        res.json(user);
    },
    updateUser: async (req, res) => {
        const {id} = req.params;
        const {username, password} = req.body;
        const user = await userModel.updateUser(id, username, password);
        res.json(user);
    }
}

export default userController;