import { useMemo } from "react";

import {
    FaClipboardList,
    FaMotorcycle,
    FaUsers,
    FaCheckCircle,
} from "react-icons/fa";


export default function SystemAnalytics({
    orders = [],
}) {

    const analytics = useMemo(() => {

        // =========================
        // Total Orders
        // =========================

        const totalOrders =
            orders.length;


        // =========================
        // Today's Orders
        // =========================

        const today =
            new Date().toDateString();

        const todaysOrders =
            orders.filter(
                (order) =>
                    order.createdAt &&
                    new Date(
                        order.createdAt
                    ).toDateString() === today
            );


        // =========================
        // Completed Today
        // =========================

        const completedToday =
            todaysOrders.filter(
                (order) =>
                    order.orderStatus ===
                    "Delivered"
            );


        // =========================
        // Customers
        // =========================

        const uniqueCustomers =
            new Set(
                orders
                    .map(
                        (order) =>
                            order.customer?._id
                    )
                    .filter(Boolean)
            );


        // =========================
        // Riders
        // =========================

        const uniqueRiders =
            new Set(
                orders
                    .map(
                        (order) =>
                            order.rider?._id
                    )
                    .filter(Boolean)
            );


        // =========================
        // Average Delivery Time
        // =========================

        const deliveredWithTime =
            orders.filter(
                (order) =>
                    order.orderStatus ===
                        "Delivered" &&
                    Number(
                        order.estimatedTime
                    ) > 0
            );


        const averageDeliveryTime =
            deliveredWithTime.length > 0
                ? Math.round(
                      deliveredWithTime.reduce(
                          (sum, order) =>
                              sum +
                              Number(
                                  order.estimatedTime
                              ),
                          0
                      ) /
                          deliveredWithTime.length
                  )
                : 0;


        // =========================
        // Success Rate
        // =========================

        const successfulOrders =
            orders.filter(
                (order) =>
                    order.orderStatus ===
                    "Delivered"
            );


        const nonCancelledOrders =
            orders.filter(
                (order) =>
                    order.orderStatus !==
                    "Cancelled"
            );


        const successRate =
            nonCancelledOrders.length > 0
                ? Math.round(
                      (successfulOrders.length /
                          nonCancelledOrders.length) *
                          100
                  )
                : 0;


        return {

            totalOrders,

            completedToday:
                completedToday.length,

            customers:
                uniqueCustomers.size,

            riders:
                uniqueRiders.size,

            averageDeliveryTime,

            successRate,

        };

    }, [orders]);


    const cards = [

        {
            icon: <FaClipboardList />,
            title: "Total Orders",
            value:
                analytics.totalOrders,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },

        {
            icon: <FaMotorcycle />,
            title: "Assigned Riders",
            value:
                analytics.riders,
            color: "text-green-600",
            bg: "bg-green-100",
        },

        {
            icon: <FaUsers />,
            title: "Customers",
            value:
                analytics.customers,
            color: "text-purple-600",
            bg: "bg-purple-100",
        },

        {
            icon: <FaCheckCircle />,
            title: "Completed Today",
            value:
                analytics.completedToday,
            color: "text-orange-600",
            bg: "bg-orange-100",
        },

    ];


    return (
        <div className="bg-white rounded-2xl shadow p-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold text-slate-800">
                    System Analytics
                </h2>

                <span className="text-sm text-slate-500">
                    Live Overview
                </span>

            </div>


            {/* Main Statistics */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                {cards.map(
                    (item) => (

                        <div
                            key={item.title}
                            className="border rounded-2xl p-5 hover:shadow-lg transition"
                        >

                            {/* Icon */}

                            <div
                                className={`${item.bg} w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${item.color}`}
                            >
                                {item.icon}
                            </div>


                            {/* Title */}

                            <h3 className="mt-5 text-slate-500">
                                {item.title}
                            </h3>


                            {/* Value */}

                            <h1
                                className={`text-4xl font-bold mt-2 ${item.color}`}
                            >
                                {item.value.toLocaleString(
                                    "en-IN"
                                )}
                            </h1>

                        </div>

                    )
                )}

            </div>


            {/* Secondary Analytics */}

            <div className="grid md:grid-cols-3 gap-6 mt-8">

                {/* Average Delivery Time */}

                <div className="bg-slate-100 rounded-xl p-5">

                    <p className="text-slate-500">
                        Average Delivery Time
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-2">

                        {analytics.averageDeliveryTime}

                        {" "}min

                    </h2>

                </div>


                {/* Success Rate */}

                <div className="bg-slate-100 rounded-xl p-5">

                    <p className="text-slate-500">
                        Success Rate
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">

                        {analytics.successRate}%

                    </h2>

                </div>


                {/* AI Accuracy */}

                <div className="bg-slate-100 rounded-xl p-5">

                    <p className="text-slate-500">
                        AI Accuracy
                    </p>

                    <h2 className="text-3xl font-bold text-purple-600 mt-2">

                        N/A

                    </h2>

                    <p className="text-xs text-slate-400 mt-1">
                        AI model not connected yet
                    </p>

                </div>

            </div>

        </div>
    );
}