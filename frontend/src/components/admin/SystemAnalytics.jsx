import {
  FaClipboardList,
  FaMotorcycle,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const analytics = [
  {
    icon: <FaClipboardList />,
    title: "Total Orders",
    value: "1,248",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: <FaMotorcycle />,
    title: "Active Riders",
    value: "86",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: <FaUsers />,
    title: "Customers",
    value: "5,472",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: <FaCheckCircle />,
    title: "Completed Today",
    value: "312",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

export default function SystemAnalytics() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          System Analytics
        </h2>

        <span className="text-sm text-slate-500">
          Live Overview
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {analytics.map((item) => (
          <div
            key={item.title}
            className="border rounded-2xl p-5 hover:shadow-lg transition"
          >

            <div
              className={`${item.bg} w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${item.color}`}
            >
              {item.icon}
            </div>

            <h3 className="mt-5 text-slate-500">
              {item.title}
            </h3>

            <h1 className={`text-4xl font-bold mt-2 ${item.color}`}>
              {item.value}
            </h1>

          </div>
        ))}

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-slate-100 rounded-xl p-5">
          <p className="text-slate-500">Average Delivery Time</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            16 min
          </h2>
        </div>

        <div className="bg-slate-100 rounded-xl p-5">
          <p className="text-slate-500">Success Rate</p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            98.4%
          </h2>
        </div>

        <div className="bg-slate-100 rounded-xl p-5">
          <p className="text-slate-500">AI Accuracy</p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            96%
          </h2>
        </div>

      </div>

    </div>
  );
}