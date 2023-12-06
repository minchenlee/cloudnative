import { bookingModel } from "../models/bookingModel.js";
import { stadiumModel } from "../models/stadiumModel.js";
// import { courtModel } from "../models/courtModel.js"};

const bookingController = {
    getBookingsByUserId: async (req, res) => {
        // get user id from jwt
        const userId = req.user.id;
        try {
            const bookings = await bookingModel.getBookingsByUserId(userId);
            res.status(200).json({
                msg: "Get bookings by user id successfully.",
                data: {
                    bookings
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal server error."
            });
        }
    },
    getBookingBySportAndDates: async (req, res) => {
        const { sport } = req.params;
        const { startDate, endDate } = req.body;
        // data should be like this:
        // {
        //     "stadium1": {
        //         "indoor": true,  
        //         "bookingHours": {
        //              "2023-12-04": [ 3, 4, 5],
        //              "2023-12-05": [ 3, 4, 0],
        //              "2023-12-06": [ 14, 13, 12]
        //          },
        // }
        const data = {}
        try {
            const stadiums = await stadiumModel.getStadiumsBySport(sport);
            for (const stadium of stadiums) {
                data[stadium.id] = {
                    "name": stadium.name,
                }
            }
            // initial date range
            for (let i = new Date(startDate); i <= new Date(endDate); i.setDate(i.getDate() + 1)) {
                for (const stadium of stadiums) {
                    data[stadium.id][i.toISOString().split('T', 1)[0]] = [0, 0, 0]
                }
            }
            const bookings = await bookingModel.getBookingBySportAndDates(sport, startDate, endDate);

            for (const booking of bookings) {
                // aggregate bookings by stadium and date
                const morningHours = Math.max(12 - booking.startHour, 0) - Math.max(12 - booking.endHour, 0)
                const eveningHours = Math.max(booking.endHour - 18, 0) - Math.max(booking.startHour - 18, 0)
                const afternoonHours = booking.endHour - booking.startHour - morningHours - eveningHours
                data[booking.stadiumId][booking.date.toISOString().split('T', 1)[0]] = [0, 0, 0]
                data[booking.stadiumId][booking.date.toISOString().split('T', 1)[0]][0] += morningHours;
                data[booking.stadiumId][booking.date.toISOString().split('T', 1)[0]][1] += afternoonHours;
                data[booking.stadiumId][booking.date.toISOString().split('T', 1)[0]][2] += eveningHours;
            }
            res.status(200).json({
                msg: "Get bookings by sport and dates successfully.",
                data
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal server error."
            });
        }
    },
    getBookingByStadiumAndDate: async (req, res) => {
        const {stadiumId, date} = req.params;
        const data = {}
        try {
            // const courts = await courtModel.getCourtsByStadiumId(stadiumId);
            // for (const court of courts) {
            //     data[court.name] = {}
            // }
            const bookings = await bookingModel.getBookingByStadiumAndDate(stadiumId, date);
            for (const booking of bookings) {
                if (!data[booking.courtId]) {
                    data[booking.courtId] = []
                }
                data[booking.courtId].push({
                    "startHour": booking.startHour,
                    "endHour": booking.endHour,
                    "userId": booking.userId
                })
            }
            res.status(200).json({
                msg: "Get bookings by stadium and date successfully.",
                data
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal server error."
            });
        }
    },
    createBooking: async (req, res) => {
        // const userId = req.user.id;
        const userId = 1;
        const { courtId, bookingDate, bookingStartHour, bookingEndHour} = req.body;
        // TODO: get vendorId and stadiumId from courtId or get from frontend
        // const stadium = await stadiumModel.getStadiumByCourtId(courtId);
        // const court = await courtModel.getStadiumByCourtId(courtId);
        const vendorId = 1
        const stadiumId = 1
        const sport = "BASKETBALL"
        // TODO: validations and transactions
        // create booking
        try {
            await bookingModel.createBooking(userId, vendorId, stadiumId, courtId, sport, bookingDate, bookingStartHour, bookingEndHour);
            res.status(200).json({
                msg: "Booking created successfully."
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal server error."
            });
        }

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
    },
}
export default bookingController;