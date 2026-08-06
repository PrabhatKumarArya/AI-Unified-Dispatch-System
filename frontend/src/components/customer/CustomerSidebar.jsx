import {
  FaHome,
  FaClipboardList,
  FaRobot,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaPlusCircle,
} from "react-icons/fa";

import { NavLink,useNavigate } from "react-router-dom";

const menuItems = [
  {
    icon: <FaHome />,
    title: "Dashboard",
    path: "/customer/dashboard",
  },
  {
    icon: <FaClipboardList />,
    title: "My Orders",
    path: "/customer/orders",
  },
  {
    icon: <FaRobot />,
    title: "AI Dispatch",
    path: "/customer/ai-dispatch",
  },
  {
    icon: <FaUser />,
    title: "Profile",
    path: "/customer/profile",
  },
  {
    icon: <FaCog />,
    title: "Settings",
    path: "/customer/settings",
  },
  {
    icon: <FaPlusCircle />,
    title: "Create Order",
    path: "/customer/create-order",
  }
];

export default function CustomerSidebar() {
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
    <aside style={{ width: "260px", minWidth: "260px", background: "#0f172a", color: "#fff", display: "flex", flexDirection: "column", minHeight: "100vh" }}>

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          AI Dispatch
        </h1>

        <p className="text-slate-400 text-sm">
          Customer Portal
        </p>
      </div>

      {/* Menu */}
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
            <span className="text-lg">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button onClick={handleLogout} className="flex items-center gap-4 w-full px-4 py-3 rounded-xl hover:bg-red-600 transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </aside>
  );
}