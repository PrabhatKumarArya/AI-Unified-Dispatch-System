import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
    {
        enableAIRecommendations: {
            type: Boolean,
            default: true,
        },

        enableNotifications: {
            type: Boolean,
            default: true,
        },

        maintenanceMode: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;