import { bookingModel } from '../models/bookingModel.js';
import { activityModel } from '../models/activityModel.js';

const activityController = {
    createActivity: async (req, res) => {
        const {userId, note, capacity} = req.body;
        const {bookingId} = req.params;
        const isActivity = true;
        try {
            await bookingModel.updateBookingById(bookingId, isActivity, note, capacity);
            const activityRecord = await activityModel.createActivity(userId, bookingId);
            res.status(200).json({
                msg: "Activity created successfully.",
                data: {
                    activityRecord
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Failed to create activity."
            });
        }
    },
    getActivities: async (req, res) => {
        const {startDate, endDate} = req.body;
        const activities = await activityModel.getActivities(startDate, endDate);
        const data = []
        for (const activity of activities) {
            data.push({
                "sport": activity.sport,
                "date": activity.date.toISOString().split('T')[0],
                "count": activity._count.id,
            })
        }
        res.status(200).json({
            msg: "Get activities summary successfully.",
            data
        });
    },
    getActivitiesByUserId: async (req, res) => {
        const userId = req.user.id;
        const activities = await activityModel.getActivitiesByUserId(userId);
        const records = []
        for (const activity of activities) {
            const booking = await bookingModel.getBookingById(activity.bookingId);
            records.push({
                "activityId": activity.id,
                "id": activity.bookingId,
                "date": activity.belongs.date.toISOString().split('T')[0],
                "startHour": activity.belongs.startHour,
                "endHour": activity.belongs.endHour,
                "stadium": booking.stadiumAt.name,
                "stadiumId": booking.stadiumAt.id,
                "court": booking.courtId,
                "maker": booking.maker.username,
                "makerId": booking.maker.id,
                "capacity": booking.capacity,
                "note": booking.note,
                "participants": booking.activitiesRecords.map(record => record.userId)
            })
        }
        res.status(200).json({
            msg: "Get activities by user id successfully.",
            data: {
                activities: records,
            }
        });
    },
    getActivitiesBySportAndDate: async (req, res) => {
        const {sport, date} = req.params;
        const activities = await activityModel.getActivitiesBySportAndDate(sport, date);
        const records = []
        for (const activity of activities) {
            records.push({
                "id": activity.id,
                "date": activity.date.toISOString().split('T')[0],
                "startHour": activity.startHour,
                "endHour": activity.endHour,
                "stadium": activity.stadiumAt.name,
                "stadiumId": activity.stadiumAt.id,
                "court": activity.courtId,
                "maker": activity.maker.username,
                "makerId": activity.maker.id,
                "capacity": activity.capacity,
                "note": activity.note,
                "participants": activity.activitiesRecords.map(record => record.userId)
            })
        }
        res.status(200).json({
            msg: "Get activities by sport and date successfully.",
            data: {
                sport,
                activities: records
            }
        });
    },
    updateActivityById: async (req, res) => {
        const {id} = req.params;
        const {note, capacity} = req.body;
        const isActivity = true;
        try {
            const activityRecord = await bookingModel.updateBookingById(id, isActivity, note, capacity);
            res.status(200).json({
                msg: "Activity updated successfully.",
                data: {
                    activityRecord
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Failed to update activity."
            });
        }
    },
    deleteActivityById: async (req, res) => {
        const {id} = req.params;
        try {
            const activityRecord = await activityModel.deleteActivityByBookingId(id);
            res.status(200).json({
                msg: "Activity deleted successfully.",
                data: {
                    activityRecord
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Failed to delete activity."
            });
        }
    },
    joinActivity: async (req, res) => {
        const userId = req.user.id;
        const {bookingId} = req.params;
        try {
            const activityRecord = await activityModel.joinActivity(userId, bookingId);
            res.status(200).json({
                msg: "Activity joined successfully.",
                data: {
                    activityRecord
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Failed to join activity."
            });
        }
    },
    leaveActivity: async (req, res) => {
        // TODO: user validation
        const userId = req.user.id;
        const {bookingId}= req.params;
        try {
            const activityRecord = await activityModel.leaveActivity(userId, bookingId);
            res.status(200).json({
                msg: "Activity left successfully.",
                data: {
                    activityRecord
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Failed to leave activity."
            });
        }
    }
}
export default activityController;