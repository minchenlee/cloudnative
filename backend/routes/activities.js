import express from 'express';
import activityController from '../controllers/activityController.js';
const router = express.Router();

// Create a new activity
router.post('/activity', activityController.createActivity);
// Delete a activity by id
router.delete('/activity/:id', activityController.deleteActivityById);
// Join an activity by id
router.post('/activity/record/:id', activityController.joinActivity);
// Leave an activity by id
router.delete('/activity/record/:id', activityController.leaveActivity);
export default router;