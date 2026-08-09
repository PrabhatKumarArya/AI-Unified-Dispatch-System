import { useEffect, useState } from "react";

export default function CustomerSettings() {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        orderUpdates: true,
        promotionalNotifications: false,
    });

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const storedSettings = localStorage.getItem("customerSettings");

        if (storedSettings) {
            setSettings(JSON.parse(storedSettings));
        }
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;

        setSettings((prev) => ({
            ...prev,
            [name]: checked,
        }));

        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem(
            "customerSettings",
            JSON.stringify(settings)
        );

        setSaved(true);
    };

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold text-slate-900">
                Settings
            </h1>

            <p className="text-slate-500 mt-2">
                Manage notification and account settings.
            </p>

            <div className="bg-white rounded-2xl shadow mt-8 p-6 max-w-3xl">

                <h2 className="text-xl font-semibold text-slate-900 mb-6">
                    Notification Settings
                </h2>

                {/* Email Notifications */}
                <div className="flex items-center justify-between py-4 border-b">

                    <div>
                        <p className="font-medium text-slate-900">
                            Email Notifications
                        </p>

                        <p className="text-sm text-slate-500">
                            Receive important updates through email.
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />

                </div>

                {/* Order Updates */}
                <div className="flex items-center justify-between py-4 border-b">

                    <div>
                        <p className="font-medium text-slate-900">
                            Order Updates
                        </p>

                        <p className="text-sm text-slate-500">
                            Get notifications about your delivery status.
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        name="orderUpdates"
                        checked={settings.orderUpdates}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />

                </div>

                {/* Promotional Notifications */}
                <div className="flex items-center justify-between py-4">

                    <div>
                        <p className="font-medium text-slate-900">
                            Promotional Notifications
                        </p>

                        <p className="text-sm text-slate-500">
                            Receive offers and promotional messages.
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        name="promotionalNotifications"
                        checked={settings.promotionalNotifications}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />

                </div>

                {/* Save */}
                <div className="mt-6 flex items-center gap-4">

                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Save Settings
                    </button>

                    {saved && (
                        <p className="text-green-600 font-medium">
                            Settings saved successfully.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}