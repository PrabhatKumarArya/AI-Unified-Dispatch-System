import {
  FaChartBar,
  FaTruckMoving,
  FaMotorcycle,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const serviceData = [
  { label: "Food", value: 42, color: "bg-orange-500", pct: 42 },
  { label: "Grocery", value: 28, color: "bg-green-500", pct: 28 },
  { label: "Pharmacy", value: 18, color: "bg-blue-500", pct: 18 },
  { label: "Parcel", value: 12, color: "bg-purple-500", pct: 12 },
];

const zoneData = [
  { zone: "Zone A — North", orders: 214, efficiency: 97 },
  { zone: "Zone B — East", orders: 178, efficiency: 91 },
  { zone: "Zone C — West", orders: 203, efficiency: 94 },
  { zone: "Zone D — South", orders: 165, efficiency: 88 },
];

const kpis = [
  { icon: <FaTruckMoving />, label: "Total Orders", value: "1,248", sub: "+12% vs last week", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: <FaCheckCircle />, label: "Delivered", value: "1,184", sub: "94.8% success rate", color: "text-green-600", bg: "bg-green-50" },
  { icon: <FaClock />, label: "Avg Delivery Time", value: "16.4 min", sub: "2.3 min faster", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: <FaMoneyBillWave />, label: "Total Revenue", value: "₹1.82L", sub: "+8% growth", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: <FaMotorcycle />, label: "Active Riders", value: "86", sub: "92% utilization", color: "text-indigo-600", bg: "bg-indigo-50" },
];

export default function Analytics() {
  return (
    <div className="space-y-8 page-enter">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
        <p className="text-slate-500 mt-1">Platform-wide performance insights and metrics.</p>
      </div>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100 card-hover">
            <div className={`w-11 h-11 ${k.bg} rounded-xl flex items-center justify-center ${k.color} text-lg mb-4`}>
              {k.icon}
            </div>
            <p className="text-slate-500 text-sm">{k.label}</p>
            <h3 className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Service Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Order Distribution by Service</h2>
          <div className="space-y-4">
            {serviceData.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-slate-700">{s.label}</span>
                  <span className="text-slate-500 font-semibold">{s.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className={`${s.color} h-3 rounded-full transition-all duration-700 progress-bar`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Donut legend */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {serviceData.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${s.color} flex-shrink-0`} />
                <span className="text-sm text-slate-600">{s.label} — {s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Performance */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Zone-wise Performance</h2>
          <div className="space-y-5">
            {zoneData.map((z) => (
              <div key={z.zone} className="border border-slate-100 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-slate-700 text-sm">{z.zone}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    z.efficiency >= 95 ? "bg-green-100 text-green-700" :
                    z.efficiency >= 90 ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {z.efficiency}% efficient
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-2">{z.orders}</p>
                <p className="text-xs text-slate-400">orders this week</p>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${z.efficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Performance */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 text-white">
        <h2 className="text-xl font-bold mb-6">AI Engine Performance</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Dispatch Accuracy", value: "96%", sub: "AI correct assignments" },
            { label: "Route Optimization", value: "93%", sub: "vs manual routing" },
            { label: "ETA Accuracy", value: "89%", sub: "within 2 min window" },
            { label: "Cost Reduction", value: "31%", sub: "vs non-AI baseline" },
          ].map((m) => (
            <div key={m.label} className="bg-white/10 rounded-xl p-5">
              <p className="text-slate-400 text-sm">{m.label}</p>
              <p className="text-3xl font-bold text-white mt-2">{m.value}</p>
              <p className="text-slate-400 text-xs mt-1">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}