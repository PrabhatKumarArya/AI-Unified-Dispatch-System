import { FaWallet, FaArrowUp, FaMotorcycle, FaCheckCircle } from "react-icons/fa";
import EarningsCard from "../../components/rider/EarningsCard";

const weeklyData = [
  { day: "Mon", amount: 620 },
  { day: "Tue", amount: 840 },
  { day: "Wed", amount: 710 },
  { day: "Thu", amount: 950 },
  { day: "Fri", amount: 1100 },
  { day: "Sat", amount: 820 },
  { day: "Sun", amount: 0 },
];

const maxAmount = Math.max(...weeklyData.map((d) => d.amount));

const transactions = [
  { id: "#A0242", service: "Food", amount: "₹80", time: "Today, 2:30 PM", status: "Credited" },
  { id: "#A0239", service: "Grocery", amount: "₹90", time: "Today, 1:30 PM", status: "Credited" },
  { id: "#A0237", service: "Food", amount: "₹55", time: "Today, 12:45 PM", status: "Credited" },
  { id: "#A0234", service: "Pharmacy", amount: "₹65", time: "Yesterday, 6:20 PM", status: "Credited" },
];

export default function RiderEarnings() {
  return (
    <div className="space-y-8 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Earnings</h1>
        <p className="text-slate-500 mt-1">Track your income and transaction history.</p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <EarningsCard period="Today" amount="₹820" change={12} />
        <EarningsCard period="This Week" amount="₹5,040" change={15} />
        <EarningsCard period="This Month" amount="₹18,200" change={8} />
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-100 p-2.5 rounded-xl text-purple-600">
              <FaMotorcycle size={16} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Deliveries</p>
              <p className="text-sm font-semibold text-slate-700">This Month</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">180</h2>
          <div className="flex items-center gap-1.5 mt-1 text-sm">
            <FaArrowUp className="text-green-500" size={11} />
            <span className="text-green-600 font-semibold">+22</span>
            <span className="text-slate-400">vs last month</span>
          </div>
        </div>
      </div>

      {/* Weekly bar chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Weekly Earnings</h2>
        <p className="text-slate-500 text-sm mb-6">This week's daily breakdown</p>
        <div className="flex items-end gap-3 h-40">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">{d.amount > 0 ? `₹${(d.amount/100).toFixed(0)}k` : ""}</span>
              <div
                className={`w-full rounded-t-lg transition-all duration-700 ${d.amount > 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-slate-100"}`}
                style={{ height: `${d.amount > 0 ? (d.amount / maxAmount) * 120 : 4}px`, minHeight: "4px" }}
                title={`₹${d.amount}`}
              />
              <span className="text-xs text-slate-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
          <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-50">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <FaCheckCircle size={16} />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 text-sm">{t.id} — {t.service}</p>
                  <p className="text-xs text-slate-400">{t.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">{t.amount}</p>
                <p className="text-xs text-green-500">{t.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}