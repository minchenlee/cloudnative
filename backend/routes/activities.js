import express from 'express';
import activityController from '../controllers/activityController.js';
import isAuth from '../middleware/isAuth.js';
const router = express.Router();

// Create a new activity with booking id
router.post('/:bookingId', activityController.createActivity);
// Get activities by user id
router.get('/user', isAuth, activityController.getActivitiesByUserId);
// Get activities by sport and date
router.get('/sport/:sport/date/:date', activityController.getActivitiesBySportAndDate);
// Get activities summary
router.get('/', activityController.getActivities);
// Delete a activity by id
router.delete('/activity/:id', isAuth, activityController.deleteActivityById);
// Join an activity by id
router.post('/activity/booking/:bookingId', isAuth, activityController.joinActivity);
// Leave an activity by id
router.delete('/activity/booking/:bookingId', isAuth, activityController.leaveActivity);
export default router;