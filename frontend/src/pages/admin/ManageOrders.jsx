import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";

export default function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();

                console.log("Orders API response:", data);

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
                <p className="text-slate-600">
                    Loading orders...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-600">
                    Error: {error}
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold text-slate-900 mb-6">
                Manage Orders
            </h1>

            <div className="bg-white rounded-2xl shadow overflow-hidden">

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
                                Service
                            </th>

                            <th className="p-4 text-left">
                                Rider
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {orders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="p-6 text-center text-slate-500"
                                >
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-t hover:bg-slate-50"
                                >
                                    <td className="p-4">
                                        #{order._id}
                                    </td>

                                    <td className="p-4">
                                        {order.customer?.name || "Unknown"}
                                    </td>

                                    <td className="p-4">
                                        {order.service}
                                    </td>

                                    <td className="p-4">
                                        {order.rider?.name || "Not Assigned"}
                                    </td>

                                    <td className="p-4">
                                        {order.status}
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}