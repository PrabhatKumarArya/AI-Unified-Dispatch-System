export default function RiderPerformance({ orders = [] }) {

    /*
     * Build rider statistics from real orders.
     */

    const riderMap = {};


    orders.forEach((order) => {

        if (!order.rider) {
            return;
        }


        const riderId =
            order.rider._id;


        if (!riderMap[riderId]) {

            riderMap[riderId] = {
                id: riderId,
                name:
                    order.rider.name ||
                    "Unknown Rider",

                assigned: 0,
                completed: 0,
            };

        }


        // Every order assigned to this rider
        riderMap[riderId].assigned++;


        // Count completed deliveries
        if (
            order.orderStatus ===
            "Delivered"
        ) {
            riderMap[riderId].completed++;
        }

    });


    /*
     * Convert object into array
     * and sort by completed deliveries.
     */

    const riders = Object.values(riderMap)
        .sort(
            (a, b) =>
                b.completed -
                a.completed
        )
        .slice(0, 5);


    return (
        <div className="bg-white rounded-2xl shadow p-6 w-full">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                    Rider Performance
                </h2>

                <span className="text-sm text-slate-500">
                    Top 5
                </span>

            </div>


            {/* No Riders */}

            {riders.length === 0 ? (

                <div className="text-center py-10">

                    <p className="text-slate-500">
                        No rider data available.
                    </p>

                </div>

            ) : (

                <div>

                    {riders.map(
                        (rider) => {

                            const completionRate =
                                rider.assigned >
                                0
                                    ? Math.round(
                                          (rider.completed /
                                              rider.assigned) *
                                              100
                                      )
                                    : 0;


                            return (
                                <div
                                    key={rider.id}
                                    className="border-b last:border-b-0 py-4"
                                >

                                    <div className="flex justify-between items-start">

                                        {/* Rider */}

                                        <div>

                                            <h3 className="font-semibold text-slate-800">
                                                {rider.name}
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">

                                                {
                                                    rider.completed
                                                }{" "}
                                                Deliveries

                                            </p>

                                        </div>


                                        {/* Completion */}

                                        <span className="font-bold text-green-600">
                                            {
                                                completionRate
                                            }%
                                        </span>

                                    </div>


                                    {/* Progress Bar */}

                                    <div className="mt-3">

                                        <div className="w-full bg-slate-200 rounded-full h-2">

                                            <div
                                                className="bg-green-500 h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${completionRate}%`,
                                                }}
                                            />

                                        </div>

                                    </div>


                                    {/* Assigned Orders */}

                                    <p className="text-xs text-slate-400 mt-2">

                                        {
                                            rider.assigned
                                        }{" "}
                                        assigned orders

                                    </p>

                                </div>
                            );

                        }
                    )}

                </div>

            )}

        </div>
    );
}