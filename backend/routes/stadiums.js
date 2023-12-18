import express from 'express';
import stadiumController from '../controllers/stadiumController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Create a new stadium
router.post('/stadium', stadiumController.createStadium);
// Update stadium image by id
router.post('/stadium/:id/image', upload.single('image'), stadiumController.updateStadiumImageById);
// Get stadium image by id
router.get('/stadium/:id/image', stadiumController.getStaduimImageById);
// Delete stadium image by id
router.patch('/stadium/:id/image', stadiumController.deleteStadiumImageById);
// Get all stadiums
router.get('/stadiums', stadiumController.getAllStadiums);
// Get a stadium by id
router.get('/stadium/:id', stadiumController.getStadiumById);
// Update a stadium by id
router.patch('/stadium/:id', stadiumController.updateStadiumById);
// Delete a stadium by id
router.delete('/stadium/:id', stadiumController.deleteStadiumById);

export default router;