import { useEffect, useState } from "react";

import {
    FaBell,
    FaTrafficLight,
    FaRobot,
    FaClipboardCheck,
    FaBox,
    FaMotorcycle,
    FaExclamationTriangle,
} from "react-icons/fa";

import { getNotifications } from "../../services/notificationService";


export default function RiderNotifications() {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        fetchNotifications();

    }, []);


    async function fetchNotifications() {

        try {

            setLoading(true);
            setError("");

            const data = await getNotifications();

            console.log(
                "Rider Notifications:",
                data
            );


            setNotifications(
                Array.isArray(data.notifications)
                    ? data.notifications
                    : []
            );

        } catch (error) {

            console.error(
                "Notification Fetch Error:",
                error
            );

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    function getNotificationIcon(type) {

        switch (type) {

            case "assignment":
                return <FaMotorcycle />;

            case "order":
                return <FaBox />;

            case "delivery":
                return <FaClipboardCheck />;

            case "traffic":
                return <FaTrafficLight />;

            case "ai":
                return <FaRobot />;

            case "warning":
                return <FaExclamationTriangle />;

            default:
                return <FaBell />;
        }
    }


    function formatTime(date) {

        if (!date) {
            return "";
        }

        const notificationDate =
            new Date(date);

        return notificationDate.toLocaleString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit",
            }
        );
    }


    return (
        <div className="bg-white rounded-2xl shadow p-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">
                        Notifications
                    </h2>

                    <p className="text-slate-500 text-sm mt-1">
                        Latest updates related to your deliveries.
                    </p>

                </div>


                <div className="bg-blue-100 text-blue-600 w-11 h-11 rounded-xl flex items-center justify-center">

                    <FaBell size={20} />

                </div>

            </div>


            {/* Loading */}

            {loading && (

                <div className="border rounded-xl p-6 text-center">

                    <FaBell
                        className="mx-auto text-blue-500 animate-pulse"
                        size={28}
                    />

                    <p className="text-slate-500 mt-3">
                        Loading notifications...
                    </p>

                </div>

            )}


            {/* Error */}

            {!loading && error && (

                <div className="border border-red-200 bg-red-50 rounded-xl p-5">

                    <p className="text-red-600">
                        Failed to load notifications.
                    </p>

                    <button
                        onClick={fetchNotifications}
                        className="mt-3 text-blue-600 font-medium hover:underline"
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* Empty */}

            {!loading &&
                !error &&
                notifications.length === 0 && (

                    <div className="border rounded-xl p-8 text-center">

                        <FaBell
                            className="mx-auto text-slate-400"
                            size={30}
                        />

                        <p className="text-slate-500 mt-3">
                            No notifications yet.
                        </p>

                    </div>
                )}


            {/* Live Notifications */}

            {!loading &&
                !error &&
                notifications.length > 0 && (

                    <div className="space-y-4">

                        {notifications.map(
                            (notification) => (

                                <div
                                    key={notification._id}
                                    className="flex gap-4 p-4 border rounded-xl hover:bg-slate-50 transition"
                                >

                                    {/* Icon */}

                                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg flex-shrink-0">

                                        {getNotificationIcon(
                                            notification.type
                                        )}

                                    </div>


                                    {/* Content */}

                                    <div className="flex-1">

                                        <div className="flex items-start justify-between gap-4">

                                            <h3 className="font-semibold text-slate-800">

                                                {
                                                    notification.title
                                                }

                                            </h3>

                                            <span className="text-xs text-slate-400 whitespace-nowrap">

                                                {formatTime(
                                                    notification.createdAt
                                                )}

                                            </span>

                                        </div>


                                        <p className="text-slate-500 text-sm mt-1">

                                            {
                                                notification.message
                                            }

                                        </p>


                                        {/* Order */}

                                        {notification.order && (

                                            <p className="text-xs text-blue-600 mt-2">

                                                Order #
                                                {
                                                    notification.order._id
                                                        ?.toString()
                                                        .slice(-6)
                                                }

                                            </p>

                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>
                )}


        </div>
    );
}