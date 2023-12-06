import {userModel} from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userController = {
    createUser: async (req, res) => {
        try {
            const {email, password, username, role} = req.body;
            // user input validation
            if (!email || !password || !username || !role) {
                return res.status(400).json({"message": "Please fill in all fields"});
            }
            // check if user exists
            const userExists = await userModel.getUserByEmail(email);
            if (userExists) {
                return res.status(400).json({"message": "User already exists"});
            }
            
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
    getUserById: async (req, res) => {
        try {
            const {id} = req.params;
            const user = await userModel.getUserById(id);
            res.json({
                "message": "User retrieved successfully",
                "user": user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },
    updateUser: async (req, res) => {
        try {
            const {id} = req.params;
            const {username, password} = req.body;
            const user = await userModel.updateUser(id, username, password);
            res.json({
                "message": "User updated successfully",
                "user": user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;
            const user = await userModel.deleteUser(id);
            res.json({
                "message": "User deleted successfully",
                "user": user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },
    userLogin: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await userModel.userLogin(email, password);
            if (user) {
                const token = jwt.sign({email: email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '3d'});
                res.status(200).json({
                    "message": "User logged in successfully",
                    "user": user,
                    "token": token
                });
            } else {
                res.status(400).json({"message": "Invalid credentials"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    }
}

export default userController;