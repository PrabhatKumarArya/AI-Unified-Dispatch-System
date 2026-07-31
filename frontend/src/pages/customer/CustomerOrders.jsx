import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders, deleteOrder } from "../../services/orderService";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);

      setOrders((prev) =>
        prev.filter((order) => order._id !== id)
      );

      alert("Order deleted successfully");
    } catch (error) {
      alert(error.message);
    }
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.serviceType
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order._id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <h2 className="text-center text-xl mt-10">
        Loading Orders...
      </h2>
    );
  }

  return (
    <div className="mt-8">

      <h1 className="text-3xl font-bold">
        My Orders
      </h1>

      <p className="text-slate-500 mt-2">
        Track all your deliveries.
      </p>

      <input
        type="text"
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 w-full md:w-96 border rounded-xl px-4 py-3"
      />

      <div className="bg-white rounded-2xl shadow mt-8 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">ETA</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order._id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">
                  #{order._id.slice(-6)}
                </td>

                <td className="p-4">
                  {order.serviceType}
                </td>

                <td className="p-4">
                  {order.orderStatus}
                </td>

                <td className="p-4">
                  {order.estimatedTime} min
                </td>

                <td className="p-4 flex gap-3">

                  <Link
                    to={`/customer/orders/${order._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}