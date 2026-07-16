import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

export default function CustomerSidebar() {
  const menuItems = [
    {
      icon: <FaHome />,
      title: "Dashboard",
    },
    {
      icon: <FaClipboardList />,
      title: "Orders",
    },
    {
      icon: <FaHistory />,
      title: "History",
    },
    {
      icon: <FaUser />,
      title: "Profile",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        AI Dispatch
      </h1>

      <nav className="space-y-3">

        {menuItems.map((item) => (
          <button
            key={item.title}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-600 transition"
          >
            {item.icon}

            {item.title}
          </button>
        ))}

      </nav>

      <button className="mt-12 flex items-center gap-3 text-red-300 hover:text-red-400">
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
}