import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: [
                "order",
                "assignment",
                "delivery",
                "rider",
                "warning",
                "system",
            ],
            default: "system",
        },

        recipientRole: {
            type: String,
            enum: ["admin", "customer", "rider"],
            default: null,
        },

        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            default: null,
        },

        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Notification",
    notificationSchema
);