import {
  FaHome,
  FaClipboardList,
  FaMotorcycle,
  FaUsers,
  FaChartBar,
  FaRobot,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const menu = [
  {
    icon: <FaHome />,
    title: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <FaClipboardList />,
    title: "Orders",
    path: "/admin/orders",
  },
  {
    icon: <FaMotorcycle />,
    title: "Riders",
    path: "/admin/riders",
  },
  {
    icon: <FaUsers />,
    title: "Customers",
    path: "/admin/customers",
  },
  {
    icon: <FaChartBar />,
    title: "Analytics",
    path: "/admin/analytics",
  },
  {
    icon: <FaRobot />,
    title: "AI Monitor",
    path: "/admin/ai-monitor",
  },
  {
    icon: <FaCog />,
    title: "Settings",
    path: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

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
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-600">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </aside>
  );
}