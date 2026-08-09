import { useEffect, useState } from "react";
import { FaBell, FaSearch, FaUserCircle, FaExclamationTriangle, FaMotorcycle, FaBox, FaCheckCircle,} from "react-icons/fa";
import { getNotifications, markNotificationRead,} from "../../services/notificationService";

export default function AdminNavbar() {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loadingNotifications, setLoadingNotifications] = useState(false);
    const [today, setToday] = useState(
        new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    );
    // Load admin + notifications
    useEffect(() => {
        loadUser();
        fetchNotifications();
        // Refresh notifications every 10 seconds
        const notificationInterval =setInterval(() => {fetchNotifications();}, 10000);
        // Update date
        const dateInterval = setInterval(() => {setToday(new Date().toLocaleDateString(
                        "en-IN",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }));
        }, 60000);
        return () => {
            clearInterval(notificationInterval);
            clearInterval(dateInterval);
        };
    }, []);
    // Load logged-in admin
    function loadUser() {
        try {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) { setUser(null);return;}
            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error("Failed to load user:",error);
            setUser(null);
        }
    }
    // Fetch live notifications
    async function fetchNotifications() {
        try {
            setLoadingNotifications(true);
            const data = await getNotifications();
            console.log("Notifications:",data);
            setNotifications(Array.isArray(data.notifications) ? data.notifications: []);
        } catch (error) {
            console.error("Notification Fetch Error:",error);
        } finally {
            setLoadingNotifications(false);
        }
    }
    // Handle notification click
    async function handleNotificationClick(notification) {
        try {
            if (!notification.isRead) {
                await markNotificationRead(notification._id);
                setNotifications((prev) => prev.map((item) => item._id === notification._id ? { ...item, isRead: true, } : item ));
            }
        } catch (error) {
            console.error("Read notification error:",error);
        }
    }
    const unreadCount = notifications.filter((notification) => !notification.isRead).length;
    const adminName = user?.name || "Admin";
    const adminRole = user?.role || "Administrator";
    // Notification icon
    function getNotificationIcon(type) {

        switch (type) {

            case "order":
                return <FaBox />;

            case "assignment":
                return <FaMotorcycle />;

            case "delivery":
                return <FaCheckCircle />;

            case "warning":
                return (
                    <FaExclamationTriangle />
                );

            default:
                return <FaBell />;

        }
    }


    return (
        <div className="flex items-center justify-between">


            {/* LEFT */}

            <div>

                <h1 className="text-3xl font-bold text-slate-800">
                    Admin Dashboard
                </h1>

                <h3 className="text-slate-500 mt-1">
                    Monitor orders, riders and
                    dispatch operations.
                </h3>

            </div>


            {/* RIGHT */}

            <div className="flex items-center gap-6">


                {/* SEARCH */}

                <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-72">

                    <FaSearch className="text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search orders, riders..."
                        className="bg-transparent outline-none ml-3 w-full text-sm"
                    />

                </div>


                {/* NOTIFICATIONS */}

                <div className="relative">

                    <button
                        type="button"
                        onClick={() =>
                            setShowNotifications(
                                (prev) => !prev
                            )
                        }
                        className="relative cursor-pointer"
                        aria-label="Notifications"
                    >

                        <FaBell
                            size={22}
                            className="text-slate-700 hover:text-blue-600 transition"
                        />


                        {/* Unread count */}

                        {unreadCount > 0 && (

                            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">

                                {unreadCount > 99
                                    ? "99+"
                                    : unreadCount}

                            </span>

                        )}

                    </button>


                    {/* DROPDOWN */}

                    {showNotifications && (

                        <div className="absolute right-0 top-10 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">


                            {/* HEADER */}

                            <div className="flex items-center justify-between px-5 py-4 border-b">

                                <h2 className="font-bold text-lg text-slate-800">
                                    Notifications
                                </h2>

                                <span className="text-sm text-blue-600">
                                    {unreadCount} unread
                                </span>

                            </div>


                            {/* LIST */}

                            <div className="max-h-96 overflow-y-auto">

                                {loadingNotifications ? (

                                    <div className="p-6 text-center text-slate-500">

                                        Loading notifications...

                                    </div>

                                ) : notifications.length ===
                                  0 ? (

                                    <div className="p-6 text-center">

                                        <FaBell
                                            className="mx-auto text-slate-300"
                                            size={28}
                                        />

                                        <p className="text-slate-500 mt-3">
                                            No notifications yet.
                                        </p>

                                    </div>

                                ) : (

                                    notifications.map(
                                        (
                                            notification
                                        ) => (

                                            <div
                                                key={
                                                    notification._id
                                                }
                                                onClick={() =>
                                                    handleNotificationClick(
                                                        notification
                                                    )
                                                }
                                                className={`flex gap-4 p-4 border-b cursor-pointer transition ${
                                                    notification.isRead
                                                        ? "bg-white hover:bg-slate-50"
                                                        : "bg-blue-50 hover:bg-blue-100"
                                                }`}
                                            >


                                                {/* ICON */}

                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">

                                                    {getNotificationIcon(
                                                        notification.type
                                                    )}

                                                </div>


                                                {/* CONTENT */}

                                                <div className="flex-1 min-w-0">

                                                    <div className="flex items-start justify-between gap-2">

                                                        <h3 className="font-semibold text-slate-800">

                                                            {
                                                                notification.title
                                                            }

                                                        </h3>


                                                        {!notification.isRead && (

                                                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />

                                                        )}

                                                    </div>


                                                    <p className="text-sm text-slate-500 mt-1">

                                                        {
                                                            notification.message
                                                        }

                                                    </p>


                                                    <p className="text-xs text-slate-400 mt-2">

                                                        {notification.createdAt
                                                            ? new Date(
                                                                  notification.createdAt
                                                              ).toLocaleString(
                                                                  "en-IN"
                                                              )
                                                            : "Just now"}

                                                    </p>

                                                </div>

                                            </div>

                                        )
                                    )

                                )}

                            </div>


                            {/* FOOTER */}

                            <div className="p-3 border-t text-center">

                                <button
                                    type="button"
                                    onClick={
                                        fetchNotifications
                                    }
                                    className="text-blue-600 font-medium text-sm hover:underline"
                                >
                                    Refresh Notifications
                                </button>

                            </div>

                        </div>

                    )}

                </div>


                {/* ADMIN PROFILE */}

                <div className="flex items-center gap-3">

                    <FaUserCircle
                        size={38}
                        className="text-blue-600"
                    />

                    <div className="hidden md:block">

                        <h3 className="font-semibold text-slate-800">
                            {adminName}
                        </h3>

                        <p className="text-sm text-slate-500 capitalize">
                            {adminRole}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}