import { useEffect, useState } from "react";

import AdminStatCard from "../../components/admin/AdminStatCard";
import RecentOrders from "../../components/admin/RecentOrders";
import RiderPerformance from "../../components/admin/RiderPerformance";
import AIInsights from "../../components/admin/AIInsights";
import RevenueChart from "../../components/admin/RevenueChart";
import SystemAnalytics from "../../components/admin/SystemAnalytics";

import API_URL from "../../services/api"; 
const API = `${API_URL}/orders`;

export default function AdminDashboard() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================
    // Fetch Orders
    // =========================

    
    useEffect(() => {
        fetchOrders();
    }, []);


    async function fetchOrders() {

        try {

            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error(
                    "Authentication token not found"
                );
            }


            const response = await fetch(API, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            const data = await response.json();

            console.log(
                "Admin Orders:",
                data
            );


            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to fetch orders"
                );
            }


            setOrders(
                Array.isArray(data.orders)
                    ? data.orders
                    : []
            );

        } catch (error) {

            console.error(
                "Admin Dashboard Error:",
                error
            );

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    // =========================
    // Loading
    // =========================

    if (loading) {

        return (
            <div className="p-6">

                <p className="text-slate-500">
                    Loading admin dashboard...
                </p>

            </div>
        );

    }


    // =========================
    // Error
    // =========================

    if (error) {

        return (
            <div className="p-6">

                <p className="text-red-600">
                    Failed to load dashboard:
                    {" "}
                    {error}
                </p>

                <button
                    onClick={fetchOrders}
                    className="mt-3 text-blue-600 font-medium hover:underline"
                >
                    Try Again
                </button>

            </div>
        );

    }


    // =========================
    // Date
    // =========================

    const today = new Date();

    const todayString =
        today.toDateString();


    // =========================
    // Today's Orders
    // =========================

    const todaysOrders =
        orders.filter(
            (order) =>
                new Date(
                    order.createdAt
                ).toDateString() ===
                todayString
        );


    // =========================
    // Revenue
    // =========================

    const revenue =
        orders
            .filter(
                (order) =>
                    order.orderStatus ===
                    "Delivered"
            )
            .reduce(
                (total, order) =>
                    total +
                    Number(
                        order.deliveryFee || 0
                    ),
                0
            );


    // =========================
    // Active Orders
    // =========================

    const activeOrders =
        orders.filter(
            (order) =>
                [
                    "Pending",
                    "Confirmed",
                    "Assigned",
                    "Picked Up",
                    "Out for Delivery",
                ].includes(
                    order.orderStatus
                )
        );


    // =========================
    // Statistics
    // =========================

    const statistics = {

        todaysOrders:
            todaysOrders.length,

        activeOrders:
            activeOrders.length,

        customers:
            new Set(
                orders
                    .map(
                        (order) =>
                            order.customer?._id
                    )
                    .filter(Boolean)
            ).size,

        revenue,
    };


    return (
        <div className="w-full">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="mb-8">

                <h5 className="text-slate-500 mt-1">
                </h5>

            </div>


            {/* =========================
                TOP STATISTICS
            ========================= */}

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                <AdminStatCard
                    title="Today's Orders"
                    value={
                        statistics.todaysOrders
                    }
                    color="text-blue-600"
                />


                <AdminStatCard
                    title="Active Orders"
                    value={
                        statistics.activeOrders
                    }
                    color="text-green-600"
                />


                <AdminStatCard
                    title="Customers"
                    value={
                        statistics.customers
                    }
                    color="text-purple-600"
                />


                <AdminStatCard
                    title="Revenue"
                    value={`₹${statistics.revenue.toLocaleString(
                        "en-IN"
                    )}`}
                    color="text-orange-500"
                />

            </section>


            {/* =========================
                REVENUE CHART
            ========================= */}

            <section className="mt-10">

                <RevenueChart
                    orders={orders}
                />

            </section>


            {/* =========================
                ORDERS + RIDER PERFORMANCE
            ========================= */}

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10 items-start">

                <div className="xl:col-span-2 min-w-0">

                    <RecentOrders
                        orders={orders}
                    />

                </div>


                <div className="min-w-0">

                    <RiderPerformance
                        orders={orders}
                    />

                </div>

            </section>


            {/* =========================
                AI INSIGHTS
            ========================= */}

            <section className="mt-10">

                <AIInsights
                    orders={orders}
                />

            </section>


            {/* =========================
                SYSTEM ANALYTICS
            ========================= */}

            <section className="mt-10">

                <SystemAnalytics
                    orders={orders}
                />

            </section>

        </div>
    );
}