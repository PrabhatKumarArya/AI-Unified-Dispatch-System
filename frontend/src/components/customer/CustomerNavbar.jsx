import { FaBell, FaUserCircle } from "react-icons/fa";

export default function CustomerNavbar() {
  return (
    <div className="bg-white rounded-2xl shadow px-8 py-5 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-slate-500">
          Manage your deliveries efficiently.
        </p>
      </div>

      <div className="flex items-center gap-6">

        <FaBell
          size={22}
          className="cursor-pointer text-slate-600"
        />

        <FaUserCircle
          size={36}
          className="text-blue-600"
        />

      </div>

    </div>
  );
}