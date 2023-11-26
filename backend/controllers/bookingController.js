import { bookingModel } from "../models/bookingModel.js";

const bookingController = {
    createBooking: async (req, res) => {
        const {userId, courtId, bookingDate, bookingStartHour, bookingEndHour} = req.body;
        const bookingDateISO = new Date(bookingDate)
        // TODO: get vendorId and stadiumId from courtId or get from frontend
        const vendorId = 1
        const stadiumId = 1
        const sport = "BASKETBALL"
        // TODO: validations and transactions
        // create booking
        for (let hour = bookingStartHour; hour <= bookingEndHour; hour++) {
            await bookingModel.createBooking(userId, vendorId, stadiumId, courtId, sport, bookingDateISO.toISOString(), hour);
        } 
        res.status(200).json({
            msg: "Booking created successfully."
        });
    },
    deleteBookingById: async (req, res) => {
        const {id} = req.params;
        const booking = await bookingModel.deleteBookingById(id);
        res.status(200).json({
            msg: "Booking deleted successfully.",
            data: {
                booking
            }
        });
    }
}
export default bookingController;