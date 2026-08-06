import { FaRobot, FaLightbulb, FaArrowRight } from "react-icons/fa";

const insights = [
  {
    color: "bg-blue-500",
    text: "Rider utilization is at 92% — consider adding 3 more riders in Zone B during peak hours.",
  },
  {
    color: "bg-purple-500",
    text: "AI detected 14% faster delivery times with batch routing enabled on Fridays.",
  },
  {
    color: "bg-emerald-500",
    text: "Pharmacy orders have 18 min avg ETA — highest priority zone is Sector 7.",
  },
  {
    color: "bg-orange-400",
    text: "Fuel savings of ₹2,400 achieved this week through optimized route clustering.",
  },
];

export default function AIInsights() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2.5 rounded-xl">
          <FaRobot size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold">AI Dispatch Insights</h2>
          <p className="text-slate-400 text-xs">Powered by the AI Decision Engine</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full pulse-dot inline-block" />
          Active
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {insights.map((item, i) => (
          <div
            key={i}
            className="bg-white/5 hover:bg-white/10 rounded-xl p-4 flex gap-3 transition cursor-pointer group"
          >
            <div className={`w-2 rounded-full flex-shrink-0 ${item.color} mt-1`} style={{ minHeight: "1rem" }} />
            <div className="flex-1">
              <div className="flex items-start gap-1">
                <FaLightbulb className="text-yellow-400 mt-0.5 flex-shrink-0" size={12} />
                <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
            <FaArrowRight className="text-slate-600 group-hover:text-slate-400 transition flex-shrink-0 mt-1" size={12} />
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/10">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">96%</p>
          <p className="text-slate-400 text-xs mt-1">AI Accuracy</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-400">248km</p>
          <p className="text-slate-400 text-xs mt-1">Distance Saved</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-400">17min</p>
          <p className="text-slate-400 text-xs mt-1">Avg ETA</p>
        </div>
      </div>
    </div>
  );
}