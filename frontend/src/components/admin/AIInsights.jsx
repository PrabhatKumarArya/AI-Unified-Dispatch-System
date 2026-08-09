import { useMemo } from "react";

export default function AIInsights({ orders = [] }) {

    const insights = useMemo(() => {

        if (orders.length === 0) {
            return [];
        }


        // =========================
        // Today's orders
        // =========================

        const today = new Date().toDateString();

        const todaysOrders = orders.filter(
            (order) =>
                order.createdAt &&
                new Date(
                    order.createdAt
                ).toDateString() === today
        );


        // =========================
        // Delivered orders
        // =========================

        const deliveredOrders =
            todaysOrders.filter(
                (order) =>
                    order.orderStatus ===
                    "Delivered"
            );


        // =========================
        // Average ETA
        // =========================

        const ordersWithETA =
            todaysOrders.filter(
                (order) =>
                    Number(
                        order.estimatedTime
                    ) > 0
            );


        const averageETA =
            ordersWithETA.length > 0
                ? Math.round(
                      ordersWithETA.reduce(
                          (sum, order) =>
                              sum +
                              Number(
                                  order.estimatedTime
                              ),
                          0
                      ) /
                          ordersWithETA.length
                  )
                : 0;


        // =========================
        // Rider utilization
        // =========================

        const assignedOrders =
            todaysOrders.filter(
                (order) =>
                    order.rider
            );


        const riderUtilization =
            todaysOrders.length > 0
                ? Math.round(
                      (assignedOrders.length /
                          todaysOrders.length) *
                          100
                  )
                : 0;


        // =========================
        // Completion rate
        // =========================

        const completionRate =
            todaysOrders.length > 0
                ? Math.round(
                      (deliveredOrders.length /
                          todaysOrders.length) *
                          100
                  )
                : 0;


        // =========================
        // Generate insights
        // =========================

        return [
            {
                icon: "📦",
                text: `${todaysOrders.length} orders created today.`,
            },

            {
                icon: "✅",
                text: `${deliveredOrders.length} orders delivered today.`,
            },

            {
                icon: "⏱",
                text:
                    averageETA > 0
                        ? `Average estimated delivery time is ${averageETA} minutes.`
                        : "No ETA data available yet.",
            },

            {
                icon: "🛵",
                text: `${riderUtilization}% of today's orders have been assigned to riders.`,
            },

            {
                icon: "📊",
                text: `${completionRate}% of today's orders have been completed.`,
            },
        ];

    }, [orders]);


    return (
        <div className="bg-white rounded-2xl shadow p-6">

            {/* Header */}

            <div className="mb-6">

                <h2 className="text-2xl font-bold">
                    AI Insights
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Real-time insights based on
                    dispatch data.
                </p>

            </div>


            {/* No Data */}

            {insights.length === 0 ? (

                <div className="bg-slate-100 rounded-xl p-5 text-center">

                    <p className="text-slate-500">
                        Not enough data to generate
                        insights.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {insights.map(
                        (item, index) => (

                            <div
                                key={index}
                                className="bg-slate-100 rounded-xl p-4 flex items-start gap-3 hover:bg-slate-200 transition"
                            >

                                <span className="text-xl">
                                    {item.icon}
                                </span>

                                <p className="text-slate-700">
                                    {item.text}
                                </p>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}