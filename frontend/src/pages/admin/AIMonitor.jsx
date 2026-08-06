import { useState } from "react";
import {
  FaRobot,
  FaBrain,
  FaRoute,
  FaMotorcycle,
  FaCheckCircle,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

const liveDecisions = [
  { id: 1, order: "#A0241", rider: "Rider Rahul (1.1km)", reason: "Closest + Low traffic", eta: "13 min", confidence: 97, time: "Just now" },
  { id: 2, order: "#A0240", rider: "Rider Priya (2.4km)", reason: "Best rating in zone", eta: "18 min", confidence: 94, time: "2 min ago" },
  { id: 3, order: "#A0239", rider: "Rider Aman (0.8km)", reason: "Already near pickup", eta: "11 min", confidence: 99, time: "4 min ago" },
  { id: 4, order: "#A0238", rider: "Rider Rohit (3.0km)", reason: "Batched with #A0237", eta: "22 min", confidence: 88, time: "7 min ago" },
];

const metrics = [
  { label: "Decisions Today", value: "328", icon: <FaBrain />, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Avg Confidence", value: "94.5%", icon: <FaRobot />, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Route Saves", value: "248 km", icon: <FaRoute />, color: "text-green-600", bg: "bg-green-50" },
  { label: "Time Saved", value: "~3.2 hr", icon: <FaClock />, color: "text-orange-600", bg: "bg-orange-50" },
];

export default function AIMonitor() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-8 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <FaRobot className="text-blue-600" /> AI Monitor
          </h1>
          <p className="text-slate-500 mt-1">Real-time AI dispatch decisions and engine status.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full pulse-dot inline-block" />
          AI Engine Active
        </div>
      </div>

      {/* Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100 card-hover">
            <div className={`w-11 h-11 ${m.bg} rounded-xl flex items-center justify-center ${m.color} text-lg mb-4`}>
              {m.icon}
            </div>
            <p className="text-slate-500 text-sm">{m.label}</p>
            <h3 className={`text-2xl font-bold mt-1 ${m.color}`}>{m.value}</h3>
          </div>
        ))}
      </section>

      {/* Live Decisions Feed */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Live Decision Feed</h2>
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full pulse-dot inline-block" />
            Real-time
          </span>
        </div>

        <div className="space-y-4">
          {liveDecisions.map((d) => (
            <div
              key={d.id}
              className="border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                    <FaBrain size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-blue-700 text-sm">{d.order}</span>
                      <FaArrowRight className="text-slate-400" size={10} />
                      <span className="font-semibold text-slate-700 text-sm">{d.rider}</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-1">{d.reason}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <FaClock size={10} /> ETA: {d.eta}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMotorcycle size={10} /> {d.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg font-bold ${
                    d.confidence >= 95 ? "text-green-600" :
                    d.confidence >= 90 ? "text-blue-600" : "text-orange-600"
                  }`}>
                    {d.confidence}%
                  </div>
                  <p className="text-xs text-slate-400">confidence</p>
                  <div className="w-16 bg-slate-100 rounded-full h-1.5 mt-1.5 ml-auto">
                    <div
                      className={`h-1.5 rounded-full ${
                        d.confidence >= 95 ? "bg-green-500" :
                        d.confidence >= 90 ? "bg-blue-500" : "bg-orange-400"
                      }`}
                      style={{ width: `${d.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Model Status */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold mb-5">Model Health</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Rider Assignment Model", status: "Healthy", uptime: "99.8%" },
            { label: "Route Optimization Engine", status: "Healthy", uptime: "99.5%" },
            { label: "ETA Prediction Model", status: "Optimal", uptime: "100%" },
          ].map((m) => (
            <div key={m.label} className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-400" size={14} />
                <span className="text-green-400 text-xs font-semibold">{m.status}</span>
              </div>
              <p className="text-white font-medium text-sm">{m.label}</p>
              <p className="text-slate-400 text-xs mt-1">Uptime: {m.uptime}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}