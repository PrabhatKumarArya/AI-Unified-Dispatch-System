import { useEffect, useState } from "react";
import { FaMotorcycle } from "react-icons/fa";

const API = "http://localhost:5000/api/orders";

export default function LiveOrderStatus() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        const activeOrders = data.orders.filter((order) =>
          ["Pending", "Assigned", "In Transit"].includes(order.orderStatus)
        );

        setOrders(activeOrders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function getProgress(status) {
    switch (status) {
      case "Pending":
        return 15;

      case "Assigned":
        return 35;

      case "Picked Up":
        return 60;

      case "In Transit":
        return 85;

      case "Delivered":
        return 100;

      default:
        return 0;
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Live Order Status
      </h2>

      {orders.length === 0 ? (
        <p className="text-slate-500">
          No Active Orders
        </p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => {
            const progress = getProgress(order.orderStatus);

            return (
              <div
                key={order._id}
                className="border rounded-xl p-5 hover:shadow-md transition"
              >

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-3">
                    <FaMotorcycle className="text-blue-600 text-2xl" />

                    <div>
                      <h3 className="font-semibold">
                        Order #{order._id.slice(-6)}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {order.serviceType}
                      </p>

                      <p className="text-xs text-slate-400">
                        {order.orderStatus}
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-blue-600">
                    ETA: {order.estimatedTime} min
                  </span>

                </div>

                <div className="mt-5">

                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="text-right text-sm mt-2 text-slate-500">
                    {progress}% Completed
                  </p>

                </div>

                <div className="mt-4 text-sm text-slate-600">

                  <p>
                    <strong>Pickup:</strong>{" "}
                    {order.pickupAddress}
                  </p>

                  <p>
                    <strong>Delivery:</strong>{" "}
                    {order.deliveryAddress}
                  </p>

                  <p>
                    <strong>Fee:</strong> ₹
                    {order.deliveryFee}
                  </p>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}