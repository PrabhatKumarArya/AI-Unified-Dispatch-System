import { useState } from "react";
import { FaSearch, FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";

const mockCustomers = [
  { id: "C001", name: "Prabhat Singh", email: "prabhat@gmail.com", phone: "9876543210", orders: 24, joined: "Jan 2026", status: "Active" },
  { id: "C002", name: "Aman Verma", email: "aman@gmail.com", phone: "9876543211", orders: 12, joined: "Feb 2026", status: "Active" },
  { id: "C003", name: "Anjali Sharma", email: "anjali@gmail.com", phone: "9876543212", orders: 38, joined: "Dec 2025", status: "Active" },
  { id: "C004", name: "Rohit Kumar", email: "rohit@gmail.com", phone: "9876543213", orders: 7, joined: "Mar 2026", status: "Inactive" },
  { id: "C005", name: "Sneha Patel", email: "sneha@gmail.com", phone: "9876543214", orders: 19, joined: "Jan 2026", status: "Active" },
  { id: "C006", name: "Vikram Nair", email: "vikram@gmail.com", phone: "9876543215", orders: 45, joined: "Nov 2025", status: "Active" },
];

export default function ManageCustomers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = mockCustomers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Manage Customers</h1>
        <p className="text-slate-500 mt-1">View and manage registered customers.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: "Total Customers", value: "5,472", color: "text-blue-600" },
          { label: "Active Today", value: "1,284", color: "text-green-600" },
          { label: "New This Week", value: "143", color: "text-purple-600" },
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
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Inactive"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Orders</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Joined</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="flex items-center gap-1.5 text-slate-600">
                      <FaEnvelope size={11} className="text-slate-400" /> {c.email}
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <FaPhone size={10} className="text-slate-400" /> {c.phone}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-700">{c.orders}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">{c.joined}</td>
                <td className="px-6 py-4">
                  <span className={`badge ${
                    c.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <FaUserCircle size={40} className="mx-auto mb-3 opacity-30" />
            <p>No customers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}