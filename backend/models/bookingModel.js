import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

const bookingModel = {
    createBooking: async (userId, vendorId, stadiumId, courtId, sport, date, hour) => {
        const booking = await prisma.bookingRecord.create({
            data: {
                userId,
                vendorId,
                stadiumId,
                courtId,
                sport,
                date,
                hour
            },
        });
        return booking;
    },
    deleteBookingById: async (id) => {
        const booking = await prisma.bookingRecord.delete({
            where: {
                id: parseInt(id),
            },
        });
        return booking;
    }
}

export { bookingModel };