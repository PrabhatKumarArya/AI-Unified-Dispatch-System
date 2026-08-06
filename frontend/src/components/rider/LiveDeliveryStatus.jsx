import { FaCheckCircle, FaMotorcycle, FaMapMarkerAlt } from "react-icons/fa";

const DELIVERY_STEPS = ["Order Accepted", "Picked Up", "On Route", "Delivered"];

const activeDelivery = {
  id: "#A0242",
  customer: "Prabhat Singh",
  address: "12 Green Park Colony",
  currentStep: 2,
  eta: "8 min",
};

export default function LiveDeliveryStatus() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-800">Live Delivery</h2>
        <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold">
          <span className="w-2 h-2 bg-orange-500 rounded-full pulse-dot inline-block" />
          ETA: {activeDelivery.eta}
        </span>
      </div>

      {/* Delivery info */}
      <div className="flex items-center gap-3 mb-5 p-3 bg-slate-50 rounded-xl">
        <FaMapMarkerAlt className="text-red-500" size={18} />
        <div>
          <p className="text-sm font-semibold text-slate-700">{activeDelivery.customer}</p>
          <p className="text-xs text-slate-400">{activeDelivery.address}</p>
        </div>
        <span className="ml-auto font-mono text-xs font-bold text-blue-700">{activeDelivery.id}</span>
      </div>

      {/* Steps */}
      <div className="flex items-start justify-between relative">
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-100" />
        <div
          className="absolute top-4 left-4 h-0.5 bg-blue-500 transition-all duration-700"
          style={{ width: `${(activeDelivery.currentStep / (DELIVERY_STEPS.length - 1)) * 88}%` }}
        />
        {DELIVERY_STEPS.map((step, i) => {
          const done = i < activeDelivery.currentStep;
          const active = i === activeDelivery.currentStep;
          return (
            <div key={step} className="flex flex-col items-center gap-2 flex-1 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                done ? "bg-blue-600 text-white" :
                active ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                "bg-white border-2 border-slate-200 text-slate-400"
              }`}>
                {done ? <FaCheckCircle size={12} /> : active ? <FaMotorcycle size={12} /> : i + 1}
              </div>
              <p className={`text-xs font-medium text-center leading-tight ${
                active ? "text-blue-600" : done ? "text-slate-700" : "text-slate-400"
              }`}>{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}