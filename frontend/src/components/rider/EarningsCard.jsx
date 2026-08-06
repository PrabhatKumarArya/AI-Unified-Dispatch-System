import { FaWallet, FaArrowUp, FaCalendarAlt } from "react-icons/fa";

export default function EarningsCard({ period = "This Week", amount = "₹4,820", change = 15 }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2.5 rounded-xl text-green-600">
            <FaWallet size={16} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Earnings</p>
            <p className="text-sm font-semibold text-slate-700">{period}</p>
          </div>
        </div>
        <FaCalendarAlt className="text-slate-300" size={18} />
      </div>

      <h2 className="text-3xl font-bold text-slate-800">{amount}</h2>

      <div className="flex items-center gap-1.5 mt-1 text-sm">
        <FaArrowUp className="text-green-500" size={11} />
        <span className="text-green-600 font-semibold">+{change}%</span>
        <span className="text-slate-400">vs last period</span>
      </div>

      <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-700"
          style={{ width: `${Math.min(change + 60, 100)}%` }}
        />
      </div>
    </div>
  );
}
