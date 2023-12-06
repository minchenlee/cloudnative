import {userModel} from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userController = {
    createUser: async (req, res) => {
        try {
            const {email, password, username, role} = req.body;
            // user input validation

            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // create a jwt token
            const token = jwt.sign({email: email, role: role}, process.env.JWT_SECRET, {expiresIn: '3d'});
            // create a new user
            const user = await userModel.createUser(email, hashedPassword, username, role);
            // return user and jwt token
            res.status(200).json({
                "message": "User created successfully",
                "user": user,
                "token": token
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },
    getUserbyId: async (req, res) => {
        const {id} = req.params;
        const user = await userModel.getUserById(id);
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