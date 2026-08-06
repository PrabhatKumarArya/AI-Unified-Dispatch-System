import { FaBell, FaUserCircle } from "react-icons/fa";
import { getStoredUser } from "../../utils/helpers";

export default function RiderNavbar() {
  const user = getStoredUser();
  return (
    <header className="bg-white rounded-2xl shadow-sm px-6 py-4 mb-8 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">Welcome back,</p>
        <h2 className="font-bold text-slate-800">{user?.name || "Rider"}</h2>
      </div>
      <div className="flex items-center gap-3">
        {/* Online toggle */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 bg-green-500 rounded-full pulse-dot inline-block" />
          Online
        </div>
        <button className="relative p-2 hover:bg-slate-100 rounded-xl transition">
          <FaBell className="text-slate-600" size={17} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl">
          <FaUserCircle size={22} className="text-blue-600" />
          <span className="hidden sm:block text-sm font-semibold text-slate-700">{user?.name || "Rider"}</span>
        </div>
      </div>
    </header>
  );
}