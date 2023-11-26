import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

const activityModel = {
    createActivity: async (hostId, sport, date, startHour, endHour, note, capacity) => {
        const activity = await prisma.activity.create({
            data: {
                hostId,
                sport,
                date,
                startHour,
                endHour,
                note,
                capacity
            },
        });
        return activity;
    },
    deleteActivityById: async (id) => {
        const activity = await prisma.activityRecord.delete({
            where: {
                id: parseInt(id),
            },
        });
        return activity;
    },
    joinActivity: async (userId, activityId) => {
        const activityRecord = await prisma.activityRecord.create({
            data: {
                id: parseInt(activityId),
                userId: parseInt(userId),
            },
        });
        return activityRecord;
    },
    leaveActivity: async (userId, activityId) => {
        const activityRecord = await prisma.activityRecord.delete({
            where: {
                id: parseInt(activityId),
                userId: parseInt(userId),
            },
        });
        return activityRecord;
    }
}

export { activityModel };