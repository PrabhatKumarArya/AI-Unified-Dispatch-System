import { useEffect, useState } from "react";
import {
    FaBell,
    FaUserCircle,
    FaMotorcycle,
    FaBox,
    FaExclamationTriangle,
    FaCheckCircle,
} from "react-icons/fa";

import { getNotifications } from "../../services/notificationService";

export default function RiderNavbar() {
    const [user, setUser] = useState(null);

    const [notifications, setNotifications] = useState([]);

    const [showNotifications, setShowNotifications] =
        useState(false);

    const [loadingNotifications, setLoadingNotifications] =
        useState(false);

    useEffect(() => {
        loadUser();
        fetchNotifications();

        // Refresh notifications every 15 seconds
        const interval = setInterval(() => {
            fetchNotifications();
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    // -----------------------------
    // Load logged-in rider
    // -----------------------------

    const loadUser = () => {
        try {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                setUser(null);
                return;
            }

            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error(
                "Failed to load rider user:",
                error
            );

            setUser(null);
        }
    };

    // -----------------------------
    // Fetch notifications
    // -----------------------------

    const fetchNotifications = async () => {
        try {
            setLoadingNotifications(true);

            const data = await getNotifications();

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
        } finally {
            setLoadingNotifications(false);
        }
    };

    // -----------------------------
    // Notification icon
    // -----------------------------

    const getNotificationIcon = (type) => {
        switch (type) {
            case "assignment":
                return <FaMotorcycle />;

            case "order":
                return <FaBox />;

            case "delivery":
                return <FaCheckCircle />;

            case "warning":
                return <FaExclamationTriangle />;

            default:
                return <FaBell />;
        }
    };

    // -----------------------------
    // Time formatter
    // -----------------------------

    const formatTime = (date) => {
        if (!date) return "";

        const notificationDate = new Date(date);
        const now = new Date();

        const difference =
            now.getTime() -
            notificationDate.getTime();

        const minutes = Math.floor(
            difference / (1000 * 60)
        );

        if (minutes < 1) {
            return "Just now";
        }

        if (minutes < 60) {
            return `${minutes} min ago`;
        }

        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return `${hours} hr ago`;
        }

        const days = Math.floor(hours / 24);

        return `${days} day${days > 1 ? "s" : ""} ago`;
    };

    const riderName = user?.name || "Rider";
    const riderRole = user?.role || "rider";

    return (
        <div className="flex items-center justify-between">

            {/* ========================= */}
            {/* LEFT */}
            {/* ========================= */}

            <div>
                <div className="flex items-center gap-3">

                    <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                        <FaMotorcycle size={22} />
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Rider Dashboard
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Welcome back, {riderName} 👋
                        </p>

                    </div>

                </div>
            </div>


            {/* ========================= */}
            {/* RIGHT */}
            {/* ========================= */}

            <div className="flex items-center gap-6">

                {/* ========================= */}
                {/* NOTIFICATION */}
                {/* ========================= */}

                <div className="relative">

                    <button
                        type="button"
                        onClick={() =>
                            setShowNotifications(
                                !showNotifications
                            )
                        }
                        className="relative p-2 rounded-xl hover:bg-slate-100 transition"
                        aria-label="Notifications"
                    >

                        <FaBell
                            size={23}
                            className="text-slate-700"
                        />

                        {/* Notification Badge */}

                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                {notifications.length > 99
                                    ? "99+"
                                    : notifications.length}
                            </span>
                        )}

                    </button>


                    {/* ========================= */}
                    {/* DROPDOWN */}
                    {/* ========================= */}

                    {showNotifications && (

                        <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">

                            {/* Header */}

                            <div className="flex items-center justify-between px-5 py-4 border-b">

                                <h2 className="text-lg font-bold text-slate-800">
                                    Notifications
                                </h2>

                                <span className="text-sm text-blue-600">
                                    {notifications.length} new
                                </span>

                            </div>


                            {/* Notification List */}

                            <div className="max-h-96 overflow-y-auto">

                                {loadingNotifications ? (

                                    <div className="p-6 text-center text-slate-500">
                                        Loading notifications...
                                    </div>

                                ) : notifications.length === 0 ? (

                                    <div className="p-8 text-center">

                                        <FaBell
                                            size={30}
                                            className="mx-auto text-slate-300"
                                        />

                                        <p className="mt-3 text-slate-500">
                                            No notifications yet.
                                        </p>

                                    </div>

                                ) : (

                                    notifications.map(
                                        (notification) => (

                                            <div
                                                key={
                                                    notification._id
                                                }
                                                className="flex gap-4 p-4 border-b hover:bg-slate-50 transition cursor-pointer"
                                            >

                                                {/* Icon */}

                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">

                                                    {getNotificationIcon(
                                                        notification.type
                                                    )}

                                                </div>


                                                {/* Content */}

                                                <div className="flex-1 min-w-0">

                                                    <h3 className="font-semibold text-slate-800">
                                                        {
                                                            notification.title
                                                        }
                                                    </h3>

                                                    <p className="text-sm text-slate-500 mt-1">
                                                        {
                                                            notification.message
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-400 mt-2">
                                                        {formatTime(
                                                            notification.createdAt
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                        )
                                    )

                                )}

                            </div>


                            {/* Footer */}

                            <div className="p-3 border-t text-center">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNotifications(
                                            false
                                        )
                                    }
                                    className="text-blue-600 font-medium text-sm hover:underline"
                                >
                                    Close
                                </button>

                            </div>

                        </div>
                    )}

                </div>


                {/* ========================= */}
                {/* RIDER PROFILE */}
                {/* ========================= */}

                <div className="flex items-center gap-3">

                    <FaUserCircle
                        size={40}
                        className="text-blue-600"
                    />

                    <div className="hidden md:block">

                        <h3 className="font-semibold text-slate-800">
                            {riderName}
                        </h3>

                        <p className="text-sm text-slate-500 capitalize">
                            {riderRole}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}