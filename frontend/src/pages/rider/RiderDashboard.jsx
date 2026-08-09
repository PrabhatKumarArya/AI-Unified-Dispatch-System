import { useEffect, useState } from "react";

import RiderStatCard from "../../components/rider/RiderStatCard";
import AssignedOrders from "../../components/rider/AssignedOrders";
import RoutePreview from "../../components/rider/RoutePreview";
import TodayEarnings from "../../components/rider/TodayEarnings";
import LiveDeliveryStatus from "../../components/rider/LiveDeliveryStatus";
import RiderNotifications from "../../components/rider/RiderNotifications";
import RiderPerformance from "../../components/rider/RiderPerformance";

import { getRiderOrders } from "../../services/riderService";


export default function RiderDashboard() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // Fetch orders
    const fetchOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getRiderOrders();

            console.log(
                "Rider Orders:",
                data
            );

            setOrders(
                Array.isArray(data.orders)
                    ? data.orders
                    : []
            );

        } catch (error) {

            console.error(
                "Rider Orders Error:",
                error
            );

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    // Initial fetch + live refresh
    useEffect(() => {

        fetchOrders();

        const interval =
            setInterval(
                fetchOrders,
                10000
            );

        return () => {
            clearInterval(interval);
        };

    }, []);


    // Loading
    if (loading) {

        return (
            <div className="bg-white rounded-2xl shadow p-8">

                <h1 className="text-2xl font-bold">
                    Rider Dashboard
                </h1>

                <p className="text-slate-500 mt-3">
                    Loading delivery data...
                </p>

            </div>
        );
    }


    // Error
    if (error) {

        return (
            <div className="bg-white rounded-2xl shadow p-8">

                <h1 className="text-2xl font-bold">
                    Rider Dashboard
                </h1>

                <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4">

                    <p className="text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={fetchOrders}
                        className="mt-3 text-blue-600 font-medium hover:underline"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    // Active statuses
    const activeStatuses = [
        "Assigned",
        "Confirmed",
        "Picked Up",
        "Out for Delivery",
    ];


    // Assigned orders
    const assignedOrders =
        orders.filter((order) =>
            activeStatuses.includes(
                order.orderStatus
            )
        );


    // Active deliveries
    const activeOrders =
        orders.filter((order) =>
            [
                "Confirmed",
                "Picked Up",
                "Out for Delivery",
            ].includes(
                order.orderStatus
            )
        );


    // Completed orders
    const completedOrders =
        orders.filter(
            (order) =>
                order.orderStatus ===
                "Delivered"
        );


    // Today's date
    const today = new Date();


    // Today's deliveries
    const todayDeliveries =
        completedOrders.filter(
            (order) => {

                if (!order.deliveredAt) {
                    return false;
                }

                const date =
                    new Date(
                        order.deliveredAt
                    );

                return (
                    date.getDate() ===
                        today.getDate() &&
                    date.getMonth() ===
                        today.getMonth() &&
                    date.getFullYear() ===
                        today.getFullYear()
                );
            }
        );


    // Today's earnings
    const todayEarnings =
        todayDeliveries.reduce(
            (total, order) =>
                total +
                Number(
                    order.deliveryFee || 0
                ),
            0
        );


    // Current delivery
    const currentDelivery =
        orders.find((order) =>
            [
                "Confirmed",
                "Picked Up",
                "Out for Delivery",
            ].includes(
                order.orderStatus
            )
        ) || null;


    return (
        <div className="space-y-10">


            {/* Header */}

            <section>

                <h1 className="text-3xl font-bold text-slate-800">
                    Rider Dashboard
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage your deliveries and track your performance.
                </p>

            </section>


            {/* Statistics */}

            <section>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                    <RiderStatCard
                        title="Assigned Orders"
                        value={
                            assignedOrders.length
                        }
                    />

                    <RiderStatCard
                        title="Active Deliveries"
                        value={
                            activeOrders.length
                        }
                    />

                    <RiderStatCard
                        title="Completed Today"
                        value={
                            todayDeliveries.length
                        }
                    />

                    <RiderStatCard
                        title="Today's Earnings"
                        value={`₹${todayEarnings}`}
                    />

                </div>

            </section>


            {/* Orders + Earnings */}

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                <div className="xl:col-span-2">

                    <AssignedOrders
                        orders={assignedOrders}
                        onRefresh={fetchOrders}
                    />

                </div>

                <TodayEarnings
                    orders={todayDeliveries}
                    earnings={todayEarnings}
                />

            </section>


            {/* Route */}

            <section>

                <RoutePreview
                    order={currentDelivery}
                />

            </section>


            {/* Live Delivery */}

            <section>

                <LiveDeliveryStatus
                    order={currentDelivery}
                    onRefresh={fetchOrders}
                />

            </section>


            {/* Notifications */}

            <section>

                <RiderNotifications />

            </section>


            {/* Performance */}

            <section>

                <RiderPerformance
                    orders={orders}
                    completedOrders={
                        completedOrders
                    }
                />

            </section>

        </div>
    );
}