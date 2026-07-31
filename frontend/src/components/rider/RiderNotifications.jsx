import {
  FaBell,
  FaTrafficLight,
  FaRobot,
  FaClipboardCheck,
} from "react-icons/fa";

const notifications = [
  {
    icon: <FaClipboardCheck className="text-green-600" />,
    title: "New Order Assigned",
    message: "Order #1028 has been assigned to you.",
  },
  {
    icon: <FaTrafficLight className="text-orange-500" />,
    title: "Traffic Alert",
    message: "Heavy traffic detected near MP Nagar.",
  },
  {
    icon: <FaBell className="text-blue-600" />,
    title: "Customer Update",
    message: "Customer changed delivery instructions.",
  },
  {
    icon: <FaRobot className="text-purple-600" />,
    title: "AI Suggestion",
    message: "Take Route B to save approximately 6 minutes.",
  },
];

export default function RiderNotifications() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Notifications
      </h2>

      <div className="space-y-4">

        {notifications.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 border rounded-xl hover:bg-slate-50 transition"
          >
            <div className="text-2xl">
              {item.icon}
            </div>

            <div>
              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-slate-500 text-sm">
                {item.message}
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}