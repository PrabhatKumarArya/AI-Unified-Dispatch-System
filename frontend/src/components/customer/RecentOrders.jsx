import { useEffect, useState } from "react";

import API_URL from "../../services/api"; 
const API = `${API_URL}/orders`;

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        // Latest 5 orders
        setOrders(data.orders.slice(0, 5));
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "In Transit":
        return "bg-yellow-100 text-yellow-700";

      case "Pending":
        return "bg-orange-100 text-orange-700";

      case "Assigned":
        return "bg-indigo-100 text-indigo-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Recent Orders
        </h2>

        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-slate-500">
          No Orders Found
        </p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Order ID</th>
                <th className="text-left py-3">Service</th>
                <th className="text-left py-3">Status</th>
                <th className="text-right py-3">Amount</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="py-4 font-medium">
                    #{order._id.slice(-6)}
                  </td>

                  <td>
                    {order.serviceType}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="text-right font-semibold">
                    ₹{order.deliveryFee}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}