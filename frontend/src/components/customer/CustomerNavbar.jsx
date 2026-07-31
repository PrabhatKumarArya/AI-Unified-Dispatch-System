import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function CustomerNavbar() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-md px-8 py-5 flex items-center justify-between">

      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {greeting}, Prabhat 👋
        </h1>

        <p className="text-slate-500 mt-1">
          {today}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-72">
          <FaSearch className="text-slate-500" />

          <input
            type="text"
            placeholder="Search orders..."
            className="bg-transparent outline-none ml-3 w-full"
          />
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell
            size={22}
            className="text-slate-700 hover:text-blue-600 transition"
          />

          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">

          <FaUserCircle
            size={40}
            className="text-blue-600"
          />

          <div className="hidden md:block">
            <h3 className="font-semibold text-slate-800">
              Prabhat
            </h3>

            <p className="text-sm text-slate-500">
              Customer
            </p>
          </div>

        </div>

      </div>
      
    </div>
    
  );
}