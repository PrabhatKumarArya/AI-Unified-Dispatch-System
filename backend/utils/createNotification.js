import Notification from "../models/Notification.js";

const createNotification = async ({
    title,
    message,
    type = "system",
    recipientRole,
    recipient = null,
    order = null,
}) => {
    try {
        const notification = await Notification.create({
            title,
            message,
            type,
            recipientRole,
            recipient,
            order,
        });

        return notification;

    } catch (error) {

        console.error(
            "Notification creation failed:",
            error.message
        );

        return null;
    }
};

export default createNotification;