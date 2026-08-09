import { useEffect, useState } from "react";

import StatCard from "../../components/customer/StatCard";
import RecentOrders from "../../components/customer/RecentOrders";
import AIRecommendation from "../../components/customer/AIRecommendation";
import LiveOrderStatus from "../../components/customer/LiveOrderStatus";

import { getOrders } from "../../services/orderService";

export default function CustomerDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();

                console.log("Customer orders:", data);

                if (Array.isArray(data.orders)) {
                    setOrders(data.orders);
                } else {
                    throw new Error("Invalid orders data received");
                }
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-slate-500">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-600">
                    Failed to load dashboard: {error}
                </p>
            </div>
        );
    }

    const totalOrders = orders.length;

    const activeOrders = orders.filter((order) => {
        const status = (
            order.orderStatus ||
            order.status ||
            ""
        ).toLowerCase();

        return (
            status === "pending" ||
            status === "on route" ||
            status === "processing"
        );
    }).length;

    const deliveredOrders = orders.filter((order) => {
        const status = (
            order.orderStatus ||
            order.status ||
            ""
        ).toLowerCase();

        return status === "delivered";
    }).length;

    return (
        <>

            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                />

                <StatCard
                    title="Active Orders"
                    value={activeOrders}
                />

                <StatCard
                    title="Delivered Orders"
                    value={deliveredOrders}
                />

            </section>

            {/* Orders + AI */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 items-start">

                <div className="w-full min-w-0">
                    <RecentOrders orders={orders} />
                </div>

                <div className="w-full min-w-0">
                    <AIRecommendation />
                </div>

            </section>

            {/* Live Order Status */}
            <section className="mt-10">
                <LiveOrderStatus orders={orders} />
            </section>

        </>
    );
}