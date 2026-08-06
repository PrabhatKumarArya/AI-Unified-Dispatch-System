import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { getStoredUser } from "../../utils/helpers";

export default function AdminNavbar() {
  const user = getStoredUser();

  return (
    <header className="bg-white rounded-2xl shadow-sm px-6 py-4 mb-8 flex items-center justify-between">
      {/* Search */}
      <div className="relative hidden md:block">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Search orders, riders..."
          className="pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-slate-50"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Live indicator */}
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 bg-green-500 rounded-full pulse-dot inline-block" />
          Live
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-slate-100 rounded-xl transition">
          <FaBell className="text-slate-600" size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-2 rounded-xl">
          <FaUserCircle size={22} className="text-blue-600" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-700 leading-tight">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-slate-400 capitalize">{user?.role || "admin"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}