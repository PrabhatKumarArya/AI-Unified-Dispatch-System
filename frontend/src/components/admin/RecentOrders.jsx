export default function RecentOrders({ orders = [] }) {

    // Show latest 5 orders
    const recentOrders = [...orders]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, 5);


    return (
        <div className="bg-white rounded-2xl shadow p-6 w-full">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                    Recent Orders
                </h2>

                <span className="text-sm text-slate-500">
                    {recentOrders.length} recent
                </span>

            </div>


            {/* No Orders */}

            {recentOrders.length === 0 ? (

                <div className="text-center py-10">

                    <p className="text-slate-500">
                        No orders found.
                    </p>

                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-3 px-2">
                                    Order
                                </th>

                                <th className="text-left py-3 px-2">
                                    Customer
                                </th>

                                <th className="text-left py-3 px-2">
                                    Service
                                </th>

                                <th className="text-left py-3 px-2">
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {recentOrders.map(
                                (order) => (

                                    <tr
                                        key={order._id}
                                        className="border-b hover:bg-slate-50 transition"
                                    >

                                        {/* Order ID */}

                                        <td className="py-4 px-2 font-medium">
                                            #
                                            {order._id
                                                ?.slice(-6)
                                                .toUpperCase()}
                                        </td>


                                        {/* Customer */}

                                        <td className="px-2">

                                            {order.customer?.name ||
                                                "Unknown Customer"}

                                        </td>


                                        {/* Service */}

                                        <td className="px-2">

                                            {order.serviceType ||
                                                "N/A"}

                                        </td>


                                        {/* Status */}

                                        <td className="px-2">

                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                                    order.orderStatus ===
                                                    "Delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : order.orderStatus ===
                                                          "Cancelled"
                                                        ? "bg-red-100 text-red-700"
                                                        : order.orderStatus ===
                                                          "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-blue-100 text-blue-700"
                                                }`}
                                            >
                                                {order.orderStatus ||
                                                    "Unknown"}

                                            </span>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}