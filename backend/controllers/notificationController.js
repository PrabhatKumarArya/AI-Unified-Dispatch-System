import Notification from "../models/Notification.js";

// Get notifications for logged-in user
export const getNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            $or: [
                { recipient: req.user._id },
                {
                    recipient: null,
                    recipientRole: req.user.role,
                },
                {
                    recipient: null,
                    recipientRole: "all",
                },
            ],
        })
            .populate("order", "_id orderStatus serviceType")
            .sort({ createdAt: -1 })
            .limit(50);


        res.json({
            success: true,
            count: notifications.length,
            notifications,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Mark notification as read
export const markNotificationRead = async (req, res) => {
    try {
        const notification =
            await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        notification.isRead = true;

        await notification.save();

        res.json({
            success: true,
            message: "Notification marked as read",
            notification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};