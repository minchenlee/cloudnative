import {userModel} from '../models/userModel.js';

const userController = {
    createUser: async (req, res) => {
        const {username, password} = req.body;
        const user = await userModel.createUser(username, password);
        res.json(user);
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