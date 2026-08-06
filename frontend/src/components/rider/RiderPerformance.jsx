import { FaStar, FaCheckCircle, FaClock, FaRoute } from "react-icons/fa";

const metrics = [
  { label: "Acceptance Rate", value: 96, suffix: "%", color: "bg-blue-500" },
  { label: "On-Time Delivery", value: 91, suffix: "%", color: "bg-green-500" },
  { label: "Customer Rating", value: 98, suffix: "%", color: "bg-yellow-400" },
];

export default function RiderPerformance() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <h2 className="text-lg font-bold text-slate-800 mb-5">My Performance</h2>

      {/* Metric bars */}
      <div className="space-y-5 mb-6">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-slate-700">{m.label}</span>
              <span className="font-bold text-slate-800">{m.value}{m.suffix}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div
                className={`${m.color} h-2.5 rounded-full transition-all duration-700 progress-bar`}
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <FaCheckCircle className="text-green-500" />, label: "Completed", value: "180" },
          { icon: <FaStar className="text-yellow-400" />, label: "Rating", value: "4.9⭐" },
          { icon: <FaClock className="text-orange-400" />, label: "Avg Time", value: "16 min" },
          { icon: <FaRoute className="text-blue-500" />, label: "Distance", value: "1,240 km" },
        ].map((s) => (
          <div key={s.label} className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">{s.icon} <span className="text-xs text-slate-500">{s.label}</span></div>
            <p className="font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}