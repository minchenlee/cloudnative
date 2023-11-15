import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

const {createUser, getUserById, getUserByUsername, updateUser} = userController;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create a new user
router.post('/', createUser);

export default router;