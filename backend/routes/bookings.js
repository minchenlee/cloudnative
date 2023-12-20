import express from 'express';
import bookingController from '../controllers/bookingController.js';
import isAuth from '../middleware/isAuth.js';
const router = express.Router();

// Create a new booking
router.post('/booking', isAuth, bookingController.createBooking);
// Get bookings by user id
router.get('/user', isAuth, bookingController.getBookingsByUserId);
// Get booking by id
router.get('/booking/:id', bookingController.getBookingById);
// Get booking by sport and dates
router.post('/sport/:sport', bookingController.getBookingBySportAndDates);
// Get bookings by stadium and date
router.get('/stadium/:stadiumId/date/:date', bookingController.getBookingByStadiumAndDate);
// Delete a booking by id
router.delete('/booking/:id', bookingController.deleteBookingById);


export default router;