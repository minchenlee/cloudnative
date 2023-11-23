import express from 'express';
import stadiumController from '../controllers/stadiumController.js';
const router = express.Router();

// Create a new stadium
router.post('/stadium', stadiumController.createStadium);
// Get all stadiums
router.get('/stadiums', stadiumController.getAllStadiums);
// Get a stadium by id
router.get('/stadium/:id', stadiumController.getStadiumById);

export default router;