import { FaMapMarkerAlt, FaRoute, FaClock, FaMotorcycle, FaGasPump } from "react-icons/fa";

const todayRoute = [
  { label: "Start — Zone A HQ", type: "start", time: "9:00 AM", done: true },
  { label: "Pickup — Spice Garden (Order #A0242)", type: "pickup", time: "9:18 AM", done: true },
  { label: "Deliver — Green Park Colony", type: "delivery", time: "9:32 AM", done: true },
  { label: "Pickup — MedPlus Pharmacy (Order #A0241)", type: "pickup", time: "9:45 AM", done: false },
  { label: "Deliver — Arera Colony", type: "delivery", time: "10:03 AM", done: false },
];

const stats = [
  { icon: <FaRoute />, label: "Total Distance", value: "8.4 km", color: "text-blue-600 bg-blue-50" },
  { icon: <FaClock />, label: "Est. Time", value: "~32 min", color: "text-orange-600 bg-orange-50" },
  { icon: <FaMotorcycle />, label: "Deliveries Left", value: "2", color: "text-purple-600 bg-purple-50" },
  { icon: <FaGasPump />, label: "Fuel Saved", value: "0.8L", color: "text-green-600 bg-green-50" },
];

export default function RiderMap() {
  return (
    <div className="space-y-6 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-600" /> Route Map
        </h1>
        <p className="text-slate-500 mt-1">AI-optimized delivery route for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-xs text-slate-400">{s.label}</p>
            <p className="text-xl font-bold text-slate-800 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 h-72 flex items-center justify-center border-b border-slate-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt size={36} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Live Route Map</h3>
            <p className="text-slate-400 text-sm mt-1">AI-optimized path · Updated in real-time</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 bg-blue-500 rounded inline-block" /> Your route
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-orange-400 rounded-full inline-block" /> Pickup
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Route timeline */}
        <div className="p-6">
          <h3 className="font-bold text-slate-800 mb-5">Today's Route</h3>
          <div className="relative">
            {todayRoute.map((point, i) => (
              <div key={i} className="flex gap-4 pb-5 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    point.done
                      ? "bg-blue-600 text-white"
                      : point.type === "start"
                      ? "bg-slate-200 text-slate-600"
                      : point.type === "pickup"
                      ? "bg-orange-100 text-orange-600 border-2 border-orange-200"
                      : "bg-green-100 text-green-600 border-2 border-green-200"
                  }`}>
                    {point.done ? "✓" : point.type === "start" ? "📍" : point.type === "pickup" ? "P" : "D"}
                  </div>
                  {i < todayRoute.length - 1 && (
                    <div className={`w-0.5 flex-1 mt-1 ${point.done ? "bg-blue-300" : "bg-slate-200"}`} />
                  )}
                </div>
                <div className="pt-1 pb-2">
                  <p className={`text-sm font-semibold ${point.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                    {point.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${point.done ? "text-slate-300" : "text-slate-400"}`}>{point.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}