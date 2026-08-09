import { useEffect, useState } from "react";
import {
    getSettings,
    updateSettings,
} from "../../services/settingsService";

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        enableAIRecommendations: true,
        enableNotifications: true,
        maintenanceMode: false,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        try {
            setLoading(true);
            setError("");

            const data = await getSettings();

            console.log("Settings API response:", data);

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to load settings"
                );
            }

            setSettings({
                enableAIRecommendations:
                    data.settings.enableAIRecommendations,

                enableNotifications:
                    data.settings.enableNotifications,

                maintenanceMode:
                    data.settings.maintenanceMode,
            });
        } catch (error) {
            console.error(
                "Settings Fetch Error:",
                error
            );

            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleChange(name) {
        const updatedSettings = {
            ...settings,
            [name]: !settings[name],
        };

        try {
            setSaving(true);
            setError("");
            setMessage("");

            setSettings(updatedSettings);

            const data = await updateSettings(
                updatedSettings
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                        "Failed to update settings"
                );
            }

            setSettings(data.settings);

            setMessage("Settings updated successfully.");
        } catch (error) {
            console.error(
                "Settings Update Error:",
                error
            );

            // Revert UI if update fails
            setSettings(settings);

            setError(error.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow p-8">

                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="mt-4 text-slate-500">
                    Loading settings...
                </p>

            </div>
        );
    }

    return (
        <div>

            <div className="flex items-center justify-between mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Settings
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage system and AI configuration.
                    </p>
                </div>

                {saving && (
                    <span className="text-sm text-slate-500">
                        Saving...
                    </span>
                )}

            </div>


            {/* Error */}
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600">
                        {error}
                    </p>
                </div>
            )}


            {/* Success */}
            {message && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-600">
                        {message}
                    </p>
                </div>
            )}


            <div className="bg-white rounded-2xl shadow p-8">

                <div className="space-y-6">

                    {/* AI Recommendations */}
                    <div className="flex items-center justify-between border-b pb-5">

                        <div>
                            <h3 className="font-semibold text-slate-800">
                                Enable AI Recommendations
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Allow the AI engine to generate
                                dispatch recommendations.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={
                                settings.enableAIRecommendations
                            }
                            onChange={() =>
                                handleChange(
                                    "enableAIRecommendations"
                                )
                            }
                            disabled={saving}
                            className="w-5 h-5"
                        />

                    </div>


                    {/* Notifications */}
                    <div className="flex items-center justify-between border-b pb-5">

                        <div>
                            <h3 className="font-semibold text-slate-800">
                                Enable Notifications
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Enable system and delivery
                                notifications.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={
                                settings.enableNotifications
                            }
                            onChange={() =>
                                handleChange(
                                    "enableNotifications"
                                )
                            }
                            disabled={saving}
                            className="w-5 h-5"
                        />

                    </div>


                    {/* Maintenance Mode */}
                    <div className="flex items-center justify-between">

                        <div>
                            <h3 className="font-semibold text-slate-800">
                                Maintenance Mode
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Temporarily disable normal
                                system operations.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={
                                settings.maintenanceMode
                            }
                            onChange={() =>
                                handleChange(
                                    "maintenanceMode"
                                )
                            }
                            disabled={saving}
                            className="w-5 h-5"
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}