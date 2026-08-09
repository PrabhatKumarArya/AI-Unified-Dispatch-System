import Settings from "../models/Settings.js";

// Get system settings
export const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        // Create default settings if none exist
        if (!settings) {
            settings = await Settings.create({});
        }

        res.status(200).json({
            success: true,
            settings,
        });
    } catch (error) {
        console.error("Get Settings Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update system settings
export const updateSettings = async (req, res) => {
    try {
        const {
            enableAIRecommendations,
            enableNotifications,
            maintenanceMode,
        } = req.body;

        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings();
        }

        if (enableAIRecommendations !== undefined) {
            settings.enableAIRecommendations =
                enableAIRecommendations;
        }

        if (enableNotifications !== undefined) {
            settings.enableNotifications =
                enableNotifications;
        }

        if (maintenanceMode !== undefined) {
            settings.maintenanceMode =
                maintenanceMode;
        }

        await settings.save();

        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            settings,
        });
    } catch (error) {
        console.error("Update Settings Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};