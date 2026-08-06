import { FaBell, FaMotorcycle, FaMapMarkerAlt, FaMoneyBillWave, FaRobot } from "react-icons/fa";

const notifications = [
  { icon: <FaMotorcycle />, color: "bg-blue-100 text-blue-600", message: "New order #A0242 assigned — Food delivery", time: "Just now", read: false },
  { icon: <FaMapMarkerAlt />, color: "bg-orange-100 text-orange-600", message: "Order #A0241 pickup location updated", time: "5 min ago", read: false },
  { icon: <FaMoneyBillWave />, color: "bg-green-100 text-green-600", message: "Payment of ₹80 credited for order #A0239", time: "1 hr ago", read: true },
  { icon: <FaRobot />, color: "bg-purple-100 text-purple-600", message: "AI selected you for 2 batch orders in Zone A", time: "2 hr ago", read: true },
  { icon: <FaBell />, color: "bg-slate-100 text-slate-600", message: "Weekend surge: 1.5x earnings bonus active!", time: "3 hr ago", read: true },
];

export default function RiderNotifications() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <FaBell className="text-blue-600" size={16} /> Notifications
        </h2>
        <button className="text-blue-600 text-xs font-semibold hover:underline">Mark all read</button>
      </div>

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3.5 rounded-xl transition ${
              !n.read ? "bg-blue-50 border border-blue-100" : "hover:bg-slate-50"
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${n.color}`}>
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug ${!n.read ? "font-semibold text-slate-800" : "text-slate-600"}`}>
                {n.message}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
            </div>
            {!n.read && (
              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}