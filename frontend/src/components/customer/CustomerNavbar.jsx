import { useEffect, useState } from "react";
import {
    FaBell,
    FaSearch,
    FaUserCircle,
} from "react-icons/fa";

import { getNotifications } from "../../services/notificationService";

export default function CustomerNavbar() {
    const [user, setUser] = useState(null);
    
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] =
        useState(false);

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 17
            ? "Good Afternoon"
            : "Good Evening";

    const today = new Date().toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

    useEffect(() => {
        loadUser();
        fetchNotifications();

        // Refresh notifications every 10 seconds
        const interval = setInterval(() => {
            fetchNotifications();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    function loadUser() {
        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) return;

        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error(
                "Invalid user data:",
                error
            );
        }
    }

    async function fetchNotifications() {
        try {
            const data = await getNotifications();

            console.log(
                "Customer notifications:",
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
        }
    }

    // Only unread notifications
    const unreadNotifications =
        notifications.filter(
            (notification) =>
                !notification.isRead
        );

    const notificationCount =
        unreadNotifications.length;

    return (
        <div className="flex items-center justify-between">

            {/* Left Section */}

            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    {greeting},{" "}
                    {user?.name || "Customer"} 👋
                </h1>

                <p className="text-slate-500 mt-1">
                    {today}
                </p>
            </div>


            {/* Right Section */}

            <div className="flex items-center gap-6">

                {/* Search */}

                <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-72">

                    <FaSearch className="text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="bg-transparent outline-none ml-3 w-full"
                    />

                </div>


                {/* Notifications */}

                <div className="relative">

                    <button
                        type="button"
                        onClick={() =>
                            setShowNotifications(
                                (prev) => !prev
                            )
                        }
                        className="relative cursor-pointer"
                    >

                        <FaBell
                            size={22}
                            className="text-slate-700 hover:text-blue-600 transition"
                        />

                        {notificationCount > 0 && (
                            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                {notificationCount}
                            </span>
                        )}

                    </button>


                    {/* Notification Dropdown */}

                    {showNotifications && (
                        <div className="absolute right-0 top-10 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">

                            <div className="flex items-center justify-between px-5 py-4 border-b">

                                <h2 className="font-bold text-lg">
                                    Notifications
                                </h2>

                                <span className="text-sm text-blue-600">
                                    {notificationCount} unread
                                </span>

                            </div>


                            <div className="max-h-96 overflow-y-auto">

                                {notifications.length ===
                                0 ? (
                                    <div className="p-6 text-center text-slate-500">
                                        No notifications.
                                    </div>
                                ) : (
                                    notifications.map(
                                        (notification) => (
                                            <div
                                                key={
                                                    notification._id
                                                }
                                                className={`p-4 border-b hover:bg-slate-50 ${
                                                    !notification.isRead
                                                        ? "bg-blue-50"
                                                        : ""
                                                }`}
                                            >

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
                                                    {new Date(
                                                        notification.createdAt
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>

                                            </div>
                                        )
                                    )
                                )}

                            </div>

                        </div>
                    )}

                </div>


                {/* User */}

                <div className="flex items-center gap-3 cursor-pointer">

                    <FaUserCircle
                        size={40}
                        className="text-blue-600"
                    />

                    <div className="hidden md:block">

                        <h3 className="font-semibold text-slate-800">
                            {user?.name ||
                                "Customer"}
                        </h3>

                        <p className="text-sm text-slate-500 capitalize">
                            {user?.role ||
                                "customer"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}
