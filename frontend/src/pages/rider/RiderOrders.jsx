import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";

export default function RiderOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();

        // Refresh live orders every 15 seconds
        const interval = setInterval(() => {
            fetchOrders();
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getOrders();

            console.log("Rider Orders:", data);

            setOrders(
                Array.isArray(data.orders)
                    ? data.orders
                    : []
            );
        } catch (error) {
            console.error(
                "Rider Orders Fetch Error:",
                error
            );

            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Assigned":
                return "bg-blue-100 text-blue-700";

            case "Confirmed":
                return "bg-purple-100 text-purple-700";

            case "Picked Up":
                return "bg-yellow-100 text-yellow-700";

            case "Out for Delivery":
                return "bg-orange-100 text-orange-700";

            case "Delivered":
                return "bg-green-100 text-green-700";

            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold">
                    Assigned Orders
                </h1>

                <p className="text-slate-500 mt-2">
                    Manage today's delivery tasks.
                </p>

                <div className="bg-white rounded-2xl shadow mt-8 p-8 text-center">
                    <p className="text-slate-500">
                        Loading assigned orders...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="text-3xl font-bold">
                    Assigned Orders
                </h1>

                <p className="text-slate-500 mt-2">
                    Manage today's delivery tasks.
                </p>

                <div className="bg-white rounded-2xl shadow mt-8 p-8">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
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
            </div>
        );
    }

    return (
        <div>
            {/* Header */}

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Assigned Orders
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage today's delivery tasks.
                    </p>
                </div>

                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-semibold">
                    {orders.length} Orders
                </span>

            </div>


            {/* Orders */}

            <div className="bg-white rounded-2xl shadow mt-8 overflow-hidden">

                {orders.length === 0 ? (

                    <div className="p-10 text-center">

                        <p className="text-slate-500">
                            No orders have been assigned to you.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-100">

                                <tr>
                                    <th className="p-4 text-left">
                                        Order
                                    </th>

                                    <th className="p-4 text-left">
                                        Customer
                                    </th>

                                    <th className="p-4 text-left">
                                        Address
                                    </th>

                                    <th className="p-4 text-left">
                                        Status
                                    </th>

                                    <th className="p-4 text-left">
                                        ETA
                                    </th>
                                </tr>

                            </thead>


                            <tbody>

                                {orders.map((order) => (

                                    <tr
                                        key={order._id}
                                        className="border-t hover:bg-slate-50 transition"
                                    >

                                        {/* Order */}

                                        <td className="p-4 font-medium text-slate-800">
                                            #{order._id?.slice(-6)}
                                        </td>


                                        {/* Customer */}

                                        <td className="p-4">

                                            <div className="font-medium text-slate-800">
                                                {order.customer?.name ||
                                                    "Unknown Customer"}
                                            </div>

                                            <div className="text-sm text-slate-500">
                                                {order.customer?.email || ""}
                                            </div>

                                        </td>


                                        {/* Address */}

                                        <td className="p-4 text-slate-600">
                                            {order.deliveryAddress ||
                                                "Address unavailable"}
                                        </td>


                                        {/* Status */}

                                        <td className="p-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                                                    order.orderStatus
                                                )}`}
                                            >
                                                {order.orderStatus ||
                                                    "Pending"}
                                            </span>

                                        </td>


                                        {/* ETA */}

                                        <td className="p-4 text-slate-600">
                                            {order.estimatedTime
                                                ? `${order.estimatedTime} min`
                                                : "N/A"}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}