import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

const activityModel = {
    createActivity: async (userId, bookingId) => {
        const activity = await prisma.activityRecord.create({
            data: {
                userId: parseInt(userId),
                bookingId: parseInt(bookingId),
            },
        });
        return activity;
    },
    getActivities: async (startDate, endDate) => {
        const activities = await prisma.bookingRecord.groupBy({
            by: ['sport', 'date'],
            _count: {
                id: true,
            },
            where: {
                date: {
                    lte: new Date(endDate),
                    gte: new Date(startDate),
                },
                isActivity: {
                    equals: true
                }
            },
            cacheStrategy: { swr: 60, ttl: 60 }
        });
        return activities;
    },
    getActivitiesByUserId: async (userId) => {
        const activities = await prisma.activityRecord.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                belongs: true
            },
            cacheStrategy: { swr: 60, ttl: 60 }
        });
        return activities;
    },
    getActivitiesBySportAndDate: async (sport, date) => {
        const activities = await prisma.bookingRecord.findMany({
            where: {
                sport: sport.toUpperCase(),
                date: new Date(date),
                isActivity: true
            },
            include: {
                maker: true,
                activitiesRecords: true,
                stadiumAt: true
            },
            cacheStrategy: { swr: 60, ttl: 60 }
        });
        return activities;
    },
    updateActivityById: async (id, sport, date, startHour, endHour, courtId, capacity, note, isActivity) => {
        const activity = await prisma.bookingRecord.update({
            where: {
                id: parseInt(id),
            },
            data: {
                sport,
                date,
                startHour,
                endHour,
                courtId,
                capacity,
                note,
                isActivity,
            },
        });
        return activity;
    },
    deleteActivityByBookingId: async (id) => {
        const activity = await prisma.activityRecord.deleteMany({
            where: {
                bookingId: {
                    equals: parseInt(id)
                }
            },            
        });
        return activity;
    },
    joinActivity: async (userId, bookingId) => {
        const activityRecord = await prisma.activityRecord.create({
            data: {
                bookingId: parseInt(bookingId),
                userId: parseInt(userId),
            },
        });
        return activityRecord;
    },
    leaveActivity: async (userId, bookingId) => {
        const activityRecord = await prisma.activityRecord.delete({
            where: {
                id: parseInt(bookingId),
                userId: parseInt(userId),
            },
        });
        return activityRecord;
    }
}

export { activityModel };