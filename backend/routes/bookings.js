import express from 'express';
import bookingController from '../controllers/bookingController.js';
const router = express.Router();

// Create a new booking
router.post('/booking', bookingController.createBooking);
// Delete a booking by id
router.delete('/booking/:id', bookingController.deleteBookingById);

export default router;