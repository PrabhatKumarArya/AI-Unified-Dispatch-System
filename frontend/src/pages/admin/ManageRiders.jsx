import { useState } from "react";
import { FaSearch, FaMotorcycle, FaStar, FaMapMarkerAlt } from "react-icons/fa";

const mockRiders = [
  { id: "R001", name: "Rahul Sharma", zone: "Zone A — North", deliveries: 42, rating: 4.9, status: "Online", avatar: "RS", earnings: "₹4,200", today: 8 },
  { id: "R002", name: "Priya Patel", zone: "Zone B — East", deliveries: 38, rating: 4.8, status: "Offline", avatar: "PP", earnings: "₹3,800", today: 0 },
  { id: "R003", name: "Aman Singh", zone: "Zone A — North", deliveries: 51, rating: 5.0, status: "Online", avatar: "AS", earnings: "₹5,100", today: 11 },
  { id: "R004", name: "Rohit Kumar", zone: "Zone C — West", deliveries: 29, rating: 4.6, status: "Online", avatar: "RK", earnings: "₹2,900", today: 5 },
  { id: "R005", name: "Sneha Joshi", zone: "Zone D — South", deliveries: 35, rating: 4.7, status: "Offline", avatar: "SJ", earnings: "₹3,500", today: 0 },
];

export default function ManageRiders() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = mockRiders.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.zone.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Manage Riders</h1>
        <p className="text-slate-500 mt-1">View and manage all delivery riders.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: "Total Riders", value: mockRiders.length, color: "text-blue-600" },
          { label: "Online Now", value: mockRiders.filter((r) => r.status === "Online").length, color: "text-green-600" },
          { label: "Avg Rating", value: (mockRiders.reduce((s, r) => s + r.rating, 0) / mockRiders.length).toFixed(1) + "⭐", color: "text-yellow-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search riders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Online", "Offline"].map((f) => (
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

      {/* Rider Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((rider) => (
          <div key={rider.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 card-hover">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                {rider.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{rider.name}</h3>
                <p className="text-xs text-slate-400">{rider.id}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                rider.status === "Online"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {rider.status}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-slate-400 text-xs">Deliveries</p>
                <p className="font-bold text-slate-800 mt-0.5">{rider.deliveries}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-slate-400 text-xs">Rating</p>
                <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                  <FaStar className="text-yellow-400" size={11} /> {rider.rating}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-slate-400 text-xs">Today's Orders</p>
                <p className="font-bold text-slate-800 mt-0.5">{rider.today}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-slate-400 text-xs">Earnings</p>
                <p className="font-bold text-green-600 mt-0.5">{rider.earnings}</p>
              </div>
            </div>

            {/* Zone */}
            <div className="flex items-center gap-1.5 mt-4 text-slate-500 text-sm">
              <FaMapMarkerAlt size={12} className="text-blue-500" />
              {rider.zone}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-xl transition font-medium">
                View Profile
              </button>
              <button className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm py-2 rounded-xl transition font-medium">
                Assign Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}