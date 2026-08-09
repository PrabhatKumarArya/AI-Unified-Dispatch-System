export default function RiderPerformance({
    orders = [],
    completedOrders = [],
}) {

    const totalOrders =
        orders.length;

    const completed =
        completedOrders.length;

    const completionRate =
        totalOrders > 0
            ? Math.round(
                  (completed /
                      totalOrders) *
                      100
              )
            : 0;


    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
                Rider Performance
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-blue-50 rounded-xl p-5">

                    <p className="text-slate-500">
                        Total Orders
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        {totalOrders}
                    </h2>

                </div>


                <div className="bg-green-50 rounded-xl p-5">

                    <p className="text-slate-500">
                        Completed
                    </p>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        {completed}
                    </h2>

                </div>


                <div className="bg-purple-50 rounded-xl p-5">

                    <p className="text-slate-500">
                        Completion Rate
                    </p>

                    <h2 className="text-3xl font-bold text-purple-600 mt-2">
                        {completionRate}%
                    </h2>

                </div>

            </div>

        </div>
    );
}