import { FaBell, FaSearch, FaUserCircle, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getStoredUser } from "../../utils/helpers";

export default function CustomerNavbar() {
  const user = getStoredUser();

  return (
    <header className="bg-white rounded-2xl shadow-sm px-6 py-4 mb-8 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative hidden md:block flex-1 max-w-xs">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Track an order..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Create order CTA */}
        <Link
          to="/customer/create-order"
          className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
        >
          <FaPlusCircle size={14} />
          New Order
        </Link>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-slate-100 rounded-xl transition">
          <FaBell className="text-slate-600" size={17} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-2 rounded-xl">
          <FaUserCircle size={22} className="text-blue-600" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-700 leading-tight">
              {user?.name || "Customer"}
            </p>
            <p className="text-xs text-slate-400">Customer</p>
          </div>
        </div>
      </div>
    </header>
  );
}