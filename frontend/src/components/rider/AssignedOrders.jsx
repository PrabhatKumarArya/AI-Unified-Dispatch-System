import { useState } from "react";
import { FaMapMarkerAlt, FaStore, FaCheckCircle, FaMotorcycle } from "react-icons/fa";
import { STATUS_COLORS } from "../../utils/constants";

const mockAssigned = [
  {
    id: "#A0242",
    service: "Food",
    pickup: "Spice Garden Restaurant, Bhopal",
    delivery: "12 Green Park Colony",
    eta: "14 min",
    fee: "₹80",
    status: "Accepted",
  },
  {
    id: "#A0241",
    service: "Pharmacy",
    pickup: "MedPlus Pharmacy, MP Nagar",
    delivery: "45 Arera Colony",
    eta: "18 min",
    fee: "₹65",
    status: "Pending",
  },
];

export default function AssignedOrders() {
  const [orders, setOrders] = useState(mockAssigned);

  function updateStatus(id, newStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-800">Assigned Orders</h2>
        <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-semibold">
          {orders.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-slate-100 rounded-xl p-5 hover:border-blue-200 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-bold text-blue-700">{order.id}</span>
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg font-medium">
                  {order.service}
                </span>
                <span className={`badge ${STATUS_COLORS[order.status] || "bg-slate-100 text-slate-600"}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <FaStore className="text-green-500 flex-shrink-0" size={12} />
                <span className="truncate">{order.pickup}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500 flex-shrink-0" size={12} />
                <span className="truncate">{order.delivery}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-3 text-xs text-slate-400">
                <span>ETA: <strong className="text-slate-600">{order.eta}</strong></span>
                <span>Fee: <strong className="text-green-600">{order.fee}</strong></span>
              </div>
              <div className="flex gap-2">
                {order.status === "Pending" && (
                  <button
                    onClick={() => updateStatus(order.id, "Accepted")}
                    className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Accept
                  </button>
                )}
                {order.status === "Accepted" && (
                  <button
                    onClick={() => updateStatus(order.id, "Picked Up")}
                    className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-orange-600 transition font-medium flex items-center gap-1"
                  >
                    <FaMotorcycle size={11} /> Pickup
                  </button>
                )}
                {order.status === "Picked Up" && (
                  <button
                    onClick={() => updateStatus(order.id, "Delivered")}
                    className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-1"
                  >
                    <FaCheckCircle size={11} /> Deliver
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <FaMotorcycle size={32} className="mx-auto mb-3 opacity-30" />
            <p>No assigned orders right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}