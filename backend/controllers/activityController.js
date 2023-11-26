import { activityModel } from '../models/activityModel.js';

const activityController = {
    createActivity: async (req, res) => {
        const {hostId, sport, date, startHour, endHour, note, capacity} = req.body;
        const activityDateISO = new Date(date)

        const activity = await activityModel.createActivity(hostId, sport, activityDateISO.toISOString(), startHour, endHour, note, capacity);
        console.log(activity)
        const activityRecord = await activityModel.joinActivity(hostId, activity.id);
        res.status(200).json({
            msg: "Activity created successfully.",
            data: {
                activity,
                activityRecord
            }
        });
    },
    deleteActivityById: async (req, res) => {
        const {id} = req.params;
        const activityRecord = await activityModel.deleteActivityById(id);
        res.status(200).json({
            msg: "Activity deleted successfully.",
            data: {
                activityRecord
            }
        });
    },
    joinActivity: async (req, res) => {
        // TODO: user validation
        const userId = req.user.id;
        const activityId = req.params;
        const activityRecord = await activityModel.joinActivity(userId, activityId);
        res.status(200).json({
            msg: "Activity joined successfully.",
            data: {
                activityRecord
            }
        });
    }, 
    leaveActivity: async (req, res) => {
        // TODO: user validation
        const userId = req.user.id;
        const activityId= req.params;
        const activityRecord = await activityModel.leaveActivity(userId, activityId);
        res.status(200).json({
            msg: "Activity left successfully.",
            data: {
                activityRecord
            }
        });
    }
}
export default activityController;