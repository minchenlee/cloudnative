import express from 'express';
import stadiumController from '../controllers/stadiumController.js';
const router = express.Router();

// Create a new stadium
router.post('/stadium', stadiumController.createStadium);

export default router;