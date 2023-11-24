import express from 'express';
import stadiumController from '../controllers/stadiumController.js';
const router = express.Router();

// Create a new stadium
router.post('/stadium', stadiumController.createStadium);
// Get all stadiums
router.get('/stadiums', stadiumController.getAllStadiums);
// Get a stadium by id
router.get('/stadium/:id', stadiumController.getStadiumById);
// Update a stadium by id
router.patch('/stadium/:id', stadiumController.updateStadiumById);
// Delete a stadium by id
router.delete('/stadium/:id', stadiumController.deleteStadiumById);

export default router;