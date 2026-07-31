import {
  FaHome,
  FaClipboardList,
  FaMapMarkedAlt,
  FaWallet,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink,useNavigate } from "react-router-dom";

const menuItems = [
  {
    icon: <FaHome />,
    title: "Dashboard",
    path: "/rider/dashboard",
  },
  {
    icon: <FaClipboardList />,
    title: "Orders",
    path: "/rider/orders",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Route Map",
    path: "/rider/map",
  },
  {
    icon: <FaWallet />,
    title: "Earnings",
    path: "/rider/earnings",
  },
  {
    icon: <FaUser />,
    title: "Profile",
    path: "/rider/profile",
  },
];

export default function RiderSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          AI Dispatch
        </h1>

        <p className="text-slate-400 text-sm">
          Rider Portal
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button onClick={handleLogout} className="flex items-center gap-4 w-full px-4 py-3 rounded-xl hover:bg-red-600 transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </aside>
  );
}