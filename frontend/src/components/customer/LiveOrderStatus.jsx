import { FaCheckCircle, FaBox, FaMotorcycle, FaMapMarkerAlt, FaStore } from "react-icons/fa";

const STEPS = [
  { icon: <FaBox />, label: "Order Placed", desc: "Your order is confirmed" },
  { icon: <FaStore />, label: "Picked Up", desc: "Rider picked up from vendor" },
  { icon: <FaMotorcycle />, label: "On the Way", desc: "Rider heading to you" },
  { icon: <FaMapMarkerAlt />, label: "Delivered", desc: "Order delivered!" },
];

// Mock active order
const activeOrder = {
  id: "#A0242",
  service: "Food",
  rider: "Rahul Sharma",
  eta: "12 min",
  currentStep: 2, // 0-indexed
};

export default function LiveOrderStatus() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Live Order Status</h2>
          <p className="text-sm text-slate-500">{activeOrder.id} · {activeOrder.service}</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 bg-orange-500 rounded-full pulse-dot inline-block" />
          ETA: {activeOrder.eta}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="relative">
        {/* Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-100" />
        <div
          className="absolute top-5 left-5 h-0.5 bg-blue-500 transition-all duration-700"
          style={{ width: `${(activeOrder.currentStep / (STEPS.length - 1)) * (100 - 10)}%` }}
        />

        <div className="relative flex justify-between">
          {STEPS.map((step, i) => {
            const done = i < activeOrder.currentStep;
            const active = i === activeOrder.currentStep;
            return (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 text-sm transition-all ${
                  done
                    ? "bg-blue-600 text-white"
                    : active
                    ? "bg-blue-600 text-white ring-4 ring-blue-100"
                    : "bg-white border-2 border-slate-200 text-slate-400"
                }`}>
                  {done ? <FaCheckCircle /> : step.icon}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-semibold ${active ? "text-blue-600" : done ? "text-slate-700" : "text-slate-400"}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-slate-400 hidden sm:block">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rider info */}
      <div className="mt-6 bg-slate-50 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
            RS
          </div>
          <div>
            <p className="font-semibold text-slate-700 text-sm">{activeOrder.rider}</p>
            <p className="text-xs text-slate-400">Your delivery rider</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700 transition">
          Track Live
        </button>
      </div>
    </div>
  );
}