import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { STATUS_COLORS } from "../../utils/constants";

const mockOrders = [
  { id: "#A0241", customer: "Prabhat Singh", service: "Food", rider: "Rahul Sharma", status: "Delivered", time: "18 min", date: "Today, 2:30 PM" },
  { id: "#A0240", customer: "Aman Verma", service: "Parcel", rider: "Priya Patel", status: "Out for Delivery", time: "25 min", date: "Today, 2:15 PM" },
  { id: "#A0239", customer: "Anjali Sharma", service: "Pharmacy", rider: "Aman Singh", status: "Picked Up", time: "12 min", date: "Today, 1:58 PM" },
  { id: "#A0238", customer: "Rohit Kumar", service: "Grocery", rider: "—", status: "Pending", time: "20 min", date: "Today, 1:45 PM" },
  { id: "#A0237", customer: "Sneha Patel", service: "Food", rider: "Rohit Kumar", status: "Accepted", time: "15 min", date: "Today, 1:30 PM" },
  { id: "#A0236", customer: "Vikram Nair", service: "Parcel", rider: "Rahul Sharma", status: "Delivered", time: "22 min", date: "Today, 1:10 PM" },
];

export default function ManageOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", "Pending", "Accepted", "Picked Up", "Out for Delivery", "Delivered"];

  const filtered = mockOrders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manage Orders</h1>
          <p className="text-slate-500 mt-1">View and manage all platform orders.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
          {mockOrders.length} Total Orders
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search by order ID, customer, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {["Order ID", "Customer", "Service", "Rider", "ETA", "Date", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50 transition">
                <td className="px-5 py-4 font-mono font-bold text-blue-700">{o.id}</td>
                <td className="px-5 py-4 text-slate-700">{o.customer}</td>
                <td className="px-5 py-4">
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-medium">{o.service}</span>
                </td>
                <td className="px-5 py-4 text-slate-600">{o.rider}</td>
                <td className="px-5 py-4 text-slate-600">{o.time}</td>
                <td className="px-5 py-4 text-slate-400 text-xs">{o.date}</td>
                <td className="px-5 py-4">
                  <span className={`badge ${STATUS_COLORS[o.status] || "bg-slate-100 text-slate-600"}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline text-xs">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">No orders found.</div>
        )}
      </div>
    </div>
  );
}