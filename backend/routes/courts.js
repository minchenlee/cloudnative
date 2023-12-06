import express from 'express';
import courtController from '../controllers/courtController.js';
const router = express.Router();

// Create a new court
router.post('/court', courtController.createCourt);
// Get all courts
router.get('/courts', courtController.getAllCourts);
// Get a court by id
router.get('/court/:id', courtController.getCourtById);
// Update a court by id
router.patch('/court/:id', courtController.updateCourtById);
// Delete a court by id
router.delete('/court/:id', courtController.deleteCourtById);

export default router;