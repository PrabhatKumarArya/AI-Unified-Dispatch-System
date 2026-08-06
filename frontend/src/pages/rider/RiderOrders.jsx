import { useState } from "react";
import { FaSearch, FaFilter, FaMotorcycle, FaCheckCircle } from "react-icons/fa";
import { STATUS_COLORS } from "../../utils/constants";

const mockOrders = [
  { id: "#A0242", service: "Food", customer: "Prabhat Singh", pickup: "Spice Garden, MP Nagar", delivery: "12 Green Park Colony", fee: "₹80", eta: "14 min", status: "Accepted", date: "Today, 2:30 PM" },
  { id: "#A0241", service: "Pharmacy", customer: "Anjali Sharma", pickup: "MedPlus, Arera Colony", delivery: "45 Arera Colony", fee: "₹65", eta: "18 min", status: "Pending", date: "Today, 2:15 PM" },
  { id: "#A0239", service: "Grocery", customer: "Aman Verma", pickup: "Reliance Fresh, Kotra", delivery: "89 Kotra Sultanabad", fee: "₹90", eta: "22 min", status: "Delivered", date: "Today, 1:30 PM" },
  { id: "#A0237", service: "Food", customer: "Rohit Kumar", pickup: "McDonald's, DB Mall", delivery: "7 Shyamla Hills", fee: "₹55", eta: "16 min", status: "Delivered", date: "Today, 12:45 PM" },
];

export default function RiderOrders() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(mockOrders);

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || o.status === filter;
    return matchSearch && matchFilter;
  });

  function updateStatus(id, newStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  }

  return (
    <div className="space-y-6 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Orders</h1>
        <p className="text-slate-500 mt-1">Manage and track your deliveries.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Today", value: orders.length, color: "text-blue-600" },
          { label: "Active", value: orders.filter((o) => ["Pending","Accepted","Picked Up"].includes(o.status)).length, color: "text-orange-600" },
          { label: "Delivered", value: orders.filter((o) => o.status === "Delivered").length, color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Accepted", "Delivered"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                filter === f ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:border-blue-200 transition">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-blue-700">{order.id}</span>
                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-lg font-medium">{order.service}</span>
              </div>
              <span className={`badge ${STATUS_COLORS[order.status] || "bg-slate-100 text-slate-600"}`}>
                {order.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-600 mb-4">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Customer</p>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Pickup</p>
                <p className="font-medium truncate">{order.pickup}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Delivery</p>
                <p className="font-medium truncate">{order.delivery}</p>
              </div>
              <div className="flex gap-4 text-xs">
                <span>ETA: <strong>{order.eta}</strong></span>
                <span>Fee: <strong className="text-green-600">{order.fee}</strong></span>
                <span className="text-slate-400">{order.date}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 flex-wrap">
              {order.status === "Pending" && (
                <button
                  onClick={() => updateStatus(order.id, "Accepted")}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-xl font-medium transition"
                >
                  Accept Order
                </button>
              )}
              {order.status === "Accepted" && (
                <>
                  <button
                    onClick={() => updateStatus(order.id, "Picked Up")}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-xl font-medium transition flex items-center gap-1.5"
                  >
                    <FaMotorcycle size={13} /> Mark Picked Up
                  </button>
                </>
              )}
              {order.status === "Picked Up" && (
                <button
                  onClick={() => updateStatus(order.id, "Delivered")}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-xl font-medium transition flex items-center gap-1.5"
                >
                  <FaCheckCircle size={13} /> Mark Delivered
                </button>
              )}
              {order.status === "Delivered" && (
                <span className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                  <FaCheckCircle size={13} /> Completed
                </span>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
            <FaMotorcycle size={40} className="mx-auto mb-3 opacity-30" />
            <p>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
}