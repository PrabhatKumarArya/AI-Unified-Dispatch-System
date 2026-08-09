import { useEffect, useState } from "react";
import {
    FaUserCircle,
    FaMotorcycle,
    FaStar,
} from "react-icons/fa";

import { getRiderOrders } from "../../services/riderService";

export default function RiderProfile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            setLoading(true);
            setError("");

            // Get logged-in rider
            const storedUser = localStorage.getItem("user");

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

            // Get rider orders
            const data = await getRiderOrders();

            setOrders(
                Array.isArray(data.orders)
                    ? data.orders
                    : []
            );
        } catch (err) {
            console.error(
                "Rider Profile Fetch Error:",
                err
            );

            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow p-8">
                <h1 className="text-3xl font-bold">
                    Rider Profile
                </h1>

                <p className="text-slate-500 mt-4">
                    Loading profile...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow p-8">
                <h1 className="text-3xl font-bold">
                    Rider Profile
                </h1>

                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={loadProfile}
                        className="mt-3 text-blue-600 font-semibold hover:underline"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const riderName = user?.name || "Rider";

    const riderRole = user?.role || "rider";

    // Completed deliveries
    const completedDeliveries = orders.filter(
        (order) =>
            order.orderStatus === "Delivered"
    ).length;

    // If your User model later contains rating,
    // this will automatically use it.
    const rating = user?.rating ?? 5.0;

    // If your User model later contains experience,
    // this will automatically use it.
    const experience = user?.experience
        ? `${user.experience} Years`
        : "Not Available";

    return (
        <div>

            {/* Heading */}

            <h1 className="text-3xl font-bold">
                Rider Profile
            </h1>


            {/* Profile Card */}

            <div className="bg-white rounded-2xl shadow p-8 mt-8">

                {/* Rider Information */}

                <div className="flex items-center gap-6">

                    <FaUserCircle
                        size={90}
                        className="text-blue-600"
                    />

                    <div>

                        <h2 className="text-2xl font-bold">
                            {riderName}
                        </h2>

                        <p className="text-slate-500 capitalize">
                            {riderRole === "rider"
                                ? "Delivery Partner"
                                : riderRole}
                        </p>

                        {user?.email && (
                            <p className="text-sm text-slate-400 mt-1">
                                {user.email}
                            </p>
                        )}

                    </div>

                </div>


                {/* Statistics */}

                <div className="grid md:grid-cols-3 gap-6 mt-10">

                    {/* Deliveries */}

                    <div className="bg-slate-100 rounded-xl p-6">

                        <FaMotorcycle
                            className="text-blue-600"
                            size={30}
                        />

                        <h3 className="mt-3 font-semibold">
                            Deliveries
                        </h3>

                        <p className="text-3xl font-bold mt-1">
                            {completedDeliveries}
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                            Completed
                        </p>

                    </div>


                    {/* Rating */}

                    <div className="bg-slate-100 rounded-xl p-6">

                        <FaStar
                            className="text-yellow-500"
                            size={30}
                        />

                        <h3 className="mt-3 font-semibold">
                            Rating
                        </h3>

                        <p className="text-3xl font-bold mt-1">
                            {Number(rating).toFixed(1)}
                        </p>

                    </div>


                    {/* Experience */}

                    <div className="bg-slate-100 rounded-xl p-6">

                        <h3 className="font-semibold">
                            Experience
                        </h3>

                        <p className="text-3xl font-bold mt-3">
                            {experience}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}
