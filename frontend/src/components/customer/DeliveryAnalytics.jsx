import { useEffect, useState } from "react";

import {
    FaChartLine,
    FaCheckCircle,
    FaClock,
    FaMoneyBillWave,
} from "react-icons/fa";

const API = "http://localhost:5000/api/orders";

export default function DeliveryAnalytics() {
    const [loading, setLoading] = useState(true);

    const [analytics, setAnalytics] = useState({
        completedToday: 0,
        avgDeliveryTime: 0,
        todayRevenue: 0,
        efficiency: 0,
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    async function fetchAnalytics() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(API, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            console.log("Analytics API response:", data);

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to fetch analytics"
                );
            }

            const orders = Array.isArray(data.orders)
                ? data.orders
                : [];

            /*
             * Get today's date
             */
            const today = new Date().toDateString();

            /*
             * Orders created today
             */
            const todaysOrders = orders.filter((order) => {
                if (!order.createdAt) {
                    return false;
                }

                return (
                    new Date(order.createdAt).toDateString() === today
                );
            });

            /*
             * Delivered orders
             *
             * Supports both:
             * order.status
             * order.orderStatus
             */
            const completedOrders = todaysOrders.filter((order) => {
                const status =
                    order.orderStatus || order.status;

                return status?.toLowerCase() === "delivered";
            });

            /*
             * Total revenue
             */
            const totalRevenue = completedOrders.reduce(
                (sum, order) => {
                    return (
                        sum +
                        Number(order.deliveryFee || 0)
                    );
                },
                0
            );

            /*
             * Average delivery time
             */
            const totalDeliveryTime = completedOrders.reduce(
                (sum, order) => {
                    return (
                        sum +
                        Number(order.estimatedTime || 0)
                    );
                },
                0
            );

            const averageTime =
                completedOrders.length > 0
                    ? (
                          totalDeliveryTime /
                          completedOrders.length
                      ).toFixed(1)
                    : 0;

            /*
             * Delivery efficiency
             */
            const efficiency =
                todaysOrders.length > 0
                    ? Math.round(
                          (completedOrders.length /
                              todaysOrders.length) *
                              100
                      )
                    : 0;

            /*
             * Update analytics state
             */
            setAnalytics({
                completedToday: completedOrders.length,
                avgDeliveryTime: averageTime,
                todayRevenue: totalRevenue,
                efficiency,
            });
        } catch (error) {
            console.error("Analytics Error:", error);
        } finally {
            setLoading(false);
        }
    }

    /*
     * Analytics cards
     */
    const cards = [
        {
            icon: (
                <FaCheckCircle
                    className="text-green-600"
                    size={24}
                />
            ),
            title: "Completed Today",
            value: analytics.completedToday,
        },

        {
            icon: (
                <FaClock
                    className="text-blue-600"
                    size={24}
                />
            ),
            title: "Average Delivery Time",
            value: `${analytics.avgDeliveryTime} min`,
        },

        {
            icon: (
                <FaMoneyBillWave
                    className="text-purple-600"
                    size={24}
                />
            ),
            title: "Today's Revenue",
            value: `₹${analytics.todayRevenue}`,
        },

        {
            icon: (
                <FaChartLine
                    className="text-orange-600"
                    size={24}
                />
            ),
            title: "Efficiency",
            value: `${analytics.efficiency}%`,
        },
    ];

    /*
     * Loading state
     */
    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow p-6">

                <h2 className="text-2xl font-bold">
                    Delivery Analytics
                </h2>

                <p className="mt-6 text-slate-500">
                    Loading analytics...
                </p>

            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
                Delivery Analytics
            </h2>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {cards.map((item) => (
                    <div
                        key={item.title}
                        className="border rounded-xl p-5 hover:shadow-md transition"
                    >

                        {item.icon}

                        <h3 className="mt-4 font-semibold text-slate-700">
                            {item.title}
                        </h3>

                        <p className="text-3xl font-bold mt-2 text-slate-900">
                            {item.value}
                        </p>

                    </div>
                ))}

            </div>

            {/* Efficiency */}
            <div className="mt-10">

                <h3 className="font-semibold mb-3">
                    Delivery Efficiency
                </h3>

                <div className="w-full bg-slate-200 rounded-full h-5 overflow-hidden">

                    <div
                        className="bg-blue-600 h-5 rounded-full transition-all duration-500"
                        style={{
                            width: `${analytics.efficiency}%`,
                        }}
                    />

                </div>

                <div className="flex justify-between text-sm mt-2 text-slate-500">

                    <span>0%</span>

                    <span>
                        {analytics.efficiency}% Delivered
                    </span>

                    <span>100%</span>

                </div>

            </div>

        </div>
    );
}