import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../services/orderService";
import { shortOrderId, formatDate } from "../../utils/helpers";
import { STATUS_COLORS } from "../../utils/constants";

const mockOrders = [
  { _id: "mock001xyz", serviceType: "Food", orderStatus: "Delivered", estimatedTime: 18, createdAt: new Date() },
  { _id: "mock002xyz", serviceType: "Grocery", orderStatus: "Out for Delivery", estimatedTime: 25, createdAt: new Date() },
  { _id: "mock003xyz", serviceType: "Pharmacy", orderStatus: "Pending", estimatedTime: 12, createdAt: new Date() },
];

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((data) => setOrders((data.orders || []).slice(0, 5)))
      .catch(() => setOrders(mockOrders))
      .finally(() => setLoading(false));
  }, []);

  const displayOrders = orders.length > 0 ? orders : mockOrders;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
        <Link
          to="/customer/orders"
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map((i) => (
            <div key={i} className="skeleton h-14 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {displayOrders.map((order) => (
            <Link
              key={order._id}
              to={`/customer/orders/${order._id}`}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xs font-bold text-blue-700">
                  {order.serviceType?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-700 text-sm">
                    {shortOrderId(order._id)}
                  </p>
                  <p className="text-xs text-slate-400">{order.serviceType} · {order.estimatedTime} min</p>
                </div>
              </div>
              <span className={`badge ${STATUS_COLORS[order.orderStatus] || "bg-slate-100 text-slate-600"}`}>
                {order.orderStatus}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}