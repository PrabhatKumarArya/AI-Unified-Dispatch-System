import { FaMapMarkerAlt, FaRoute, FaClock } from "react-icons/fa";

const routePoints = [
  { label: "Your Location", address: "Zone A, Bhopal", type: "start" },
  { label: "Pickup — Spice Garden", address: "MP Nagar, Bhopal", type: "pickup" },
  { label: "Deliver — Order #A0242", address: "12 Green Park Colony", type: "delivery" },
  { label: "Pickup — MedPlus Pharmacy", address: "Arera Colony", type: "pickup" },
  { label: "Deliver — Order #A0241", address: "45 Arera Colony", type: "delivery" },
];

export default function RoutePreview() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <FaRoute className="text-blue-600" /> Optimized Route
        </h2>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><FaClock size={11} /> ~32 min total</span>
          <span>8.4 km</span>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-gradient-to-br from-slate-100 to-blue-50 rounded-xl h-40 flex items-center justify-center mb-5 border border-slate-200">
        <div className="text-center">
          <FaMapMarkerAlt size={32} className="text-blue-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-500">Live Route Map</p>
          <p className="text-xs text-slate-400">AI-optimized delivery path</p>
        </div>
      </div>

      {/* Route points */}
      <div className="relative">
        {routePoints.map((point, i) => (
          <div key={i} className="flex gap-3 pb-5 last:pb-0">
            {/* Connector line */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                point.type === "start"
                  ? "bg-blue-600 text-white"
                  : point.type === "pickup"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-green-100 text-green-600"
              }`}>
                {point.type === "start" ? "📍" : point.type === "pickup" ? "P" : "D"}
              </div>
              {i < routePoints.length - 1 && (
                <div className="w-0.5 flex-1 bg-slate-200 mt-1" />
              )}
            </div>
            <div className="pt-1.5 pb-2">
              <p className="text-sm font-semibold text-slate-700">{point.label}</p>
              <p className="text-xs text-slate-400">{point.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}