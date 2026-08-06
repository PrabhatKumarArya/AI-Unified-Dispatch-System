import { STATUS_COLORS } from "../../utils/constants";
import { shortOrderId, formatDate } from "../../utils/helpers";

const mockOrders = [
  { _id: "abc001xyz", customer: { name: "Prabhat Singh" }, serviceType: "Food", orderStatus: "Delivered", createdAt: new Date(), estimatedTime: 18 },
  { _id: "abc002xyz", customer: { name: "Aman Verma" }, serviceType: "Parcel", orderStatus: "Out for Delivery", createdAt: new Date(), estimatedTime: 25 },
  { _id: "abc003xyz", customer: { name: "Anjali Sharma" }, serviceType: "Pharmacy", orderStatus: "Pending", createdAt: new Date(), estimatedTime: 12 },
  { _id: "abc004xyz", customer: { name: "Rohit Kumar" }, serviceType: "Grocery", orderStatus: "Accepted", createdAt: new Date(), estimatedTime: 20 },
  { _id: "abc005xyz", customer: { name: "Sneha Patel" }, serviceType: "Food", orderStatus: "Picked Up", createdAt: new Date(), estimatedTime: 15 },
];

export default function RecentOrders({ orders = mockOrders }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
        <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
          Live Feed
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              <th className="pb-3 pr-4 font-semibold">Order ID</th>
              <th className="pb-3 pr-4 font-semibold">Customer</th>
              <th className="pb-3 pr-4 font-semibold">Service</th>
              <th className="pb-3 pr-4 font-semibold">ETA</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-slate-50 transition">
                <td className="py-3 pr-4 font-mono text-blue-600 font-medium">
                  {shortOrderId(order._id)}
                </td>
                <td className="py-3 pr-4 text-slate-700">
                  {order.customer?.name || "Unknown"}
                </td>
                <td className="py-3 pr-4">
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-medium">
                    {order.serviceType}
                  </span>
                </td>
                <td className="py-3 pr-4 text-slate-600">
                  {order.estimatedTime} min
                </td>
                <td className="py-3">
                  <span className={`badge ${STATUS_COLORS[order.orderStatus] || "bg-slate-100 text-slate-600"}`}>
                    {order.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}