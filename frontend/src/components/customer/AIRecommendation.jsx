import { FaRobot, FaMotorcycle, FaRoute, FaMoneyBillWave, FaClock } from "react-icons/fa";

const recommendations = [
  { rider: "Rider-07 (Rahul)", reason: "Closest rider — 1.2 km away", eta: "14 min", savings: "₹35", confidence: 97 },
  { rider: "Rider-11 (Aman)", reason: "Already near pickup point", eta: "11 min", savings: "₹28", confidence: 94 },
];

export default function AIRecommendation() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="bg-blue-600 p-2 rounded-xl text-white">
          <FaRobot size={15} />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-800">AI Recommendations</h2>
          <p className="text-xs text-slate-400">Smart dispatch suggestions</p>
        </div>
      </div>

      {/* Confidence badge */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-700 font-medium">AI Confidence Score</span>
          <span className="text-xl font-bold text-blue-600">96%</span>
        </div>
        <div className="w-full bg-blue-100 rounded-full h-1.5 mt-2">
          <div className="bg-blue-600 h-1.5 rounded-full w-[96%] progress-bar" />
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {recommendations.map((item, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-4 hover:border-blue-200 transition">
            <div className="flex items-center gap-2 mb-3">
              <FaMotorcycle className="text-blue-600" size={14} />
              <p className="font-semibold text-slate-700 text-sm">{item.rider}</p>
              <span className="ml-auto text-xs font-bold text-green-600">{item.confidence}%</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <FaRoute className="text-green-500" size={10} /> {item.reason}
              </div>
              <div className="flex items-center gap-1.5">
                <FaClock className="text-orange-500" size={10} /> ETA: {item.eta}
              </div>
              <div className="flex items-center gap-1.5">
                <FaMoneyBillWave className="text-purple-500" size={10} /> Save {item.savings}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition">
        Apply AI Dispatch
      </button>
    </div>
  );
}