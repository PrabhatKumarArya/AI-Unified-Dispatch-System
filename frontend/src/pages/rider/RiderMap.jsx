import { useEffect, useState } from "react";
import {
    FaMapMarkedAlt,
    FaSpinner,
    FaExclamationTriangle,
    FaMotorcycle,
    FaMapMarkerAlt,
    FaSyncAlt,
} from "react-icons/fa";

const API = "http://localhost:5000/api/orders";

export default function RiderMap() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAssignedOrders();

        const interval = setInterval(() => {
            fetchAssignedOrders(true);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    async function fetchAssignedOrders(isBackgroundRefresh = false) {
        try {
            if (isBackgroundRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Authentication token not found");
            }

            const response = await fetch(API, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },

                // Don't use browser cache
                cache: "no-store",
            });

            const data = await response.json();

            console.log("Rider Orders:", data);

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to load orders"
                );
            }

            const activeOrders = (data.orders || []).filter(
                (order) =>
                    [
                        "Assigned",
                        "Confirmed",
                        "Picked Up",
                        "Out for Delivery",
                    ].includes(order.orderStatus)
            );

            setOrders(activeOrders);
        } catch (error) {
            console.error("Rider Map Error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    function handleRefresh() {
        fetchAssignedOrders(false);
    }

    return (
        <div>
            {/* Header */}

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Route Navigation
                    </h1>

                    <p className="text-slate-500 mt-2">
                        AI optimized delivery route.
                    </p>
                </div>

                {/* Refresh Button */}

                <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={loading || refreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                    <FaSyncAlt
                        className={
                            refreshing
                                ? "animate-spin"
                                : ""
                        }
                    />

                    {refreshing
                        ? "Refreshing..."
                        : "Refresh"}
                </button>

            </div>

            {/* Main Card */}

            <div className="bg-white rounded-2xl shadow p-6 mt-8">

                {/* Initial Loading */}

                {loading ? (

                    <div className="h-[500px] flex flex-col items-center justify-center">

                        <FaSpinner
                            className="text-blue-600 animate-spin"
                            size={40}
                        />

                        <p className="text-slate-500 mt-4">
                            Loading your delivery route...
                        </p>

                    </div>

                ) : error ? (

                    /* Error */

                    <div className="h-[500px] flex flex-col items-center justify-center">

                        <FaExclamationTriangle
                            className="text-red-500"
                            size={45}
                        />

                        <p className="text-red-600 mt-4">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={handleRefresh}
                            className="mt-4 text-blue-600 font-medium hover:underline"
                        >
                            Try Again
                        </button>

                    </div>

                ) : orders.length === 0 ? (

                    /* No Orders */

                    <div className="h-[500px] flex flex-col items-center justify-center">

                        <FaMapMarkedAlt
                            className="text-slate-400"
                            size={70}
                        />

                        <h2 className="text-2xl font-bold mt-6">
                            No Active Deliveries
                        </h2>

                        <p className="text-slate-500 mt-3">
                            You currently have no active
                            delivery routes.
                        </p>

                    </div>

                ) : (

                    /* Orders */

                    <div>

                        {/* Map */}

                        <div className="h-[400px] border-2 border-dashed rounded-xl bg-slate-50 flex flex-col items-center justify-center">

                            <FaMapMarkedAlt
                                className="text-blue-600"
                                size={80}
                            />

                            <h2 className="text-2xl font-bold mt-6">
                                Live Route Map
                            </h2>

                            <p className="text-slate-500 mt-3">
                                {orders.length} active{" "}
                                {orders.length === 1
                                    ? "delivery"
                                    : "deliveries"}
                            </p>

                        </div>

                        {/* Active Orders */}

                        <div className="mt-8">

                            <div className="flex items-center justify-between mb-4">

                                <h2 className="text-xl font-bold text-slate-800">
                                    Active Delivery Route
                                </h2>

                                <span className="text-sm text-slate-500">
                                    {orders.length} active
                                </span>

                            </div>

                            <div className="space-y-4">

                                {orders.map(
                                    (order, index) => (

                                        <div
                                            key={order._id}
                                            className="border rounded-xl p-4 hover:bg-slate-50 transition"
                                        >

                                            <div className="flex gap-4">

                                                {/* Number */}

                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                                                    {index + 1}
                                                </div>

                                                <div className="flex-1">

                                                    <div className="flex items-center justify-between">

                                                        <h3 className="font-semibold text-slate-800">
                                                            Order #
                                                            {order._id?.slice(
                                                                -6
                                                            )}
                                                        </h3>

                                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                            {
                                                                order.orderStatus
                                                            }
                                                        </span>

                                                    </div>

                                                    {/* Customer */}

                                                    <div className="flex items-center gap-2 mt-3">

                                                        <FaMotorcycle className="text-slate-400" />

                                                        <span className="text-slate-600">
                                                            {
                                                                order
                                                                    .customer
                                                                    ?.name
                                                            }
                                                        </span>

                                                    </div>

                                                    {/* Pickup */}

                                                    <div className="flex gap-2 mt-3">

                                                        <FaMapMarkerAlt className="text-green-500 mt-1" />

                                                        <div>
                                                            <p className="text-xs text-slate-400">
                                                                Pickup
                                                            </p>

                                                            <p className="text-sm text-slate-600">
                                                                {
                                                                    order.pickupAddress
                                                                }
                                                            </p>
                                                        </div>

                                                    </div>

                                                    {/* Delivery */}

                                                    <div className="flex gap-2 mt-3">

                                                        <FaMapMarkerAlt className="text-red-500 mt-1" />

                                                        <div>
                                                            <p className="text-xs text-slate-400">
                                                                Delivery
                                                            </p>

                                                            <p className="text-sm text-slate-600">
                                                                {
                                                                    order.deliveryAddress
                                                                }
                                                            </p>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
