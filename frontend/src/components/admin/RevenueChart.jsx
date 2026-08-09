import { useMemo } from "react";

export default function RevenueChart({ orders = [] }) {

    /*
     * Calculate revenue for each day.
     */

    const revenueData = useMemo(() => {

        const revenueMap = {};

        orders.forEach((order) => {

            // Only delivered orders generate revenue
            if (order.orderStatus !== "Delivered") {
                return;
            }

            if (!order.createdAt) {
                return;
            }

            const date = new Date(order.createdAt);

            const key = date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
            });

            if (!revenueMap[key]) {
                revenueMap[key] = 0;
            }

            revenueMap[key] += Number(
                order.deliveryFee || 0
            );
        });


        /*
         * Convert object into array.
         */

        return Object.entries(revenueMap)
            .map(([date, revenue]) => ({
                date,
                revenue,
            }))
            .slice(-7);

    }, [orders]);


    return (
        <div className="bg-white rounded-2xl shadow p-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold">
                        Revenue Analytics
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Revenue from delivered orders
                    </p>

                </div>

            </div>


            {/* No Data */}

            {revenueData.length === 0 ? (

                <div className="h-80 border-2 border-dashed rounded-xl flex items-center justify-center">

                    <p className="text-slate-500">
                        No revenue data available.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {revenueData.map((item) => (

                        <div key={item.date}>

                            <div className="flex justify-between mb-2">

                                <span className="text-sm font-medium text-slate-600">
                                    {item.date}
                                </span>

                                <span className="font-semibold text-slate-800">
                                    ₹
                                    {item.revenue.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>

                            </div>


                            {/* Revenue Bar */}

                            <div className="w-full bg-slate-200 rounded-full h-4">

                                <div
                                    className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${Math.min(
                                            (item.revenue /
                                                Math.max(
                                                    ...revenueData.map(
                                                        (item) =>
                                                            item.revenue
                                                    )
                                                )) *
                                                100,
                                            100
                                        )}%`,
                                    }}
                                />

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}