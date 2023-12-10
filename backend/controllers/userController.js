import {userModel} from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userController = {
    createUser: async (req, res) => {
        try {
            const {email, password, username, role, tel} = req.body;
            // user input validation
            // check if required fields are filled
            if (!email || !password || !role) {
                return res.status(400).json({"message": "Please fill in required fields"});
            }
            // check if email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (!emailRegex.test(email)) {
                return res.status(400).json({"message": "Invalid email format"});
            }
            // check if tel is valid
            const telRegex = /^\d{10}$/;
            if (!telRegex.test(tel)) {
                return res.status(400).json({"message": "Invalid phone number format"});
            }
            // check if user exists
            const userExists = await userModel.getUserByEmail(email);
            if (userExists) {
                return res.status(409).json({"message": "User already exists"});
            }
            
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // create a jwt token
            const token = jwt.sign({email: email, role: role}, process.env.JWT_SECRET, {expiresIn: '3d'});
            // create a new user
            const user = await userModel.createUser(email, hashedPassword, username, role, tel);
            // return user and jwt token
            res.status(200).json({
                "message": "User created successfully",
                "data": {
                    "user": user,
                    "token": token
                }
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
            if (!user) {
                return res.status(404).json({"message": "User not found"});
            }
            res.json({
                "message": "User retrieved successfully",
                "data": {
                    "user": user
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },
    updateUser: async (req, res) => {
        try {
            const {id} = req.params;
            const {username, password, tel, role} = req.body;

            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await userModel.updateUser(id, username, hashedPassword, tel, role);
            res.json({
                "message": "User updated successfully",
                "data": {
                    "user": user
                }
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
                "data": {
                    "user": user
                }
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
                    "data": {
                        "user": user,
                        "token": token
                    }
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