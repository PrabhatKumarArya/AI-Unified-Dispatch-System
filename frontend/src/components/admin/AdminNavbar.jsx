import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function AdminNavbar() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-md px-8 py-5 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-slate-500">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-6">

        <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-72">
          <FaSearch />
          <input
            className="bg-transparent outline-none ml-3 w-full"
            placeholder="Search..."
          />
        </div>

        <FaBell size={22} />

        <FaUserCircle
          size={38}
          className="text-blue-600"
        />

      </div>

    </div>
  );
}