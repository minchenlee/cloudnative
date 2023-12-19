import express from 'express';
import bookingController from '../controllers/bookingController.js';
const router = express.Router();
import isAuth from '../middleware/isAuth.js';

// Create a new booking
router.post('/booking', isAuth, bookingController.createBooking);
// Get bookings by user id
router.get('/user', bookingController.getBookingsByUserId);
// Get booking by sport and dates
router.get('/sport/:sport', bookingController.getBookingBySportAndDates);
// Get bookings by stadium and date
router.get('/stadium/:stadiumId/date/:date', bookingController.getBookingByStadiumAndDate);
// Delete a booking by id
router.delete('/booking/:id', bookingController.deleteBookingById);


export default router;