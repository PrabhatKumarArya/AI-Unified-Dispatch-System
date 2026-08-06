import { FaWallet, FaArrowUp } from "react-icons/fa";

export default function TodayEarnings() {
  const breakdown = [
    { label: "Base Pay", amount: "₹500" },
    { label: "Delivery Bonus (8 orders)", amount: "₹240" },
    { label: "Tips", amount: "₹80" },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-2 mb-1">
        <FaWallet size={16} className="opacity-80" />
        <p className="text-blue-100 text-sm">Today's Earnings</p>
      </div>
      <h2 className="text-4xl font-bold">₹820</h2>
      <div className="flex items-center gap-1.5 mt-1 text-blue-100 text-sm">
        <FaArrowUp size={11} className="text-green-300" />
        <span className="text-green-300 font-semibold">+12%</span> vs yesterday
      </div>

      {/* Breakdown */}
      <div className="mt-6 space-y-2">
        {breakdown.map((b) => (
          <div key={b.label} className="flex justify-between text-sm">
            <span className="text-blue-200">{b.label}</span>
            <span className="font-semibold">{b.amount}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-white/20 mt-4 pt-4 flex justify-between font-bold">
        <span>Total</span>
        <span>₹820</span>
      </div>

      <button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white py-2.5 rounded-xl text-sm font-semibold transition">
        View Full Earnings
      </button>
    </div>
  );
}