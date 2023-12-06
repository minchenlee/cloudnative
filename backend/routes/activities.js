import express from 'express';
import activityController from '../controllers/activityController.js';
const router = express.Router();

// Create a new activity with booking id
router.post('/:bookingId', activityController.createActivity);
// Get activities by user id
router.get('/user', activityController.getActivitiesByUserId);
// Get activities by sport and date
router.get('/sport/:sport/date/:date', activityController.getActivitiesBySportAndDate);
// Get activities summary
router.get('/', activityController.getActivities);
// Delete a activity by id
router.delete('/activity/:id', activityController.deleteActivityById);
// Join an activity by id
router.post('/activity/booking/:bookingId', activityController.joinActivity);
// Leave an activity by id
router.delete('/activity/booking/:bookingId', activityController.leaveActivity);
export default router;