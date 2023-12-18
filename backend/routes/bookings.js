import express from 'express';
import bookingController from '../controllers/bookingController.js';
const router = express.Router();

// Create a new booking
router.post('/booking', bookingController.createBooking);
// Get bookings by user id
router.get('/user', bookingController.getBookingsByUserId);
// Get booking by sport and dates
router.post('/sport/:sport', bookingController.getBookingBySportAndDates);
// Get bookings by stadium and date
router.get('/stadium/:stadiumId/date/:date', bookingController.getBookingByStadiumAndDate);
// Delete a booking by id
router.delete('/booking/:id', bookingController.deleteBookingById);


export default router;