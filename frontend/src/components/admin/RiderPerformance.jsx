const riders = [
  { name: "Rahul Sharma", deliveries: 42, rating: 4.9, efficiency: 96, status: "Online", avatar: "RS" },
  { name: "Priya Patel", deliveries: 38, rating: 4.8, efficiency: 91, status: "Offline", avatar: "PP" },
  { name: "Aman Singh", deliveries: 51, rating: 5.0, efficiency: 99, status: "Online", avatar: "AS" },
  { name: "Rohit Kumar", deliveries: 29, rating: 4.6, efficiency: 84, status: "Online", avatar: "RK" },
];

export default function RiderPerformance() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 h-full">
      <h2 className="text-lg font-bold text-slate-800 mb-5">Top Riders</h2>

      <div className="space-y-4">
        {riders.map((rider) => (
          <div key={rider.name} className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {rider.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700 truncate">
                  {rider.name}
                </p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  rider.status === "Online"
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  {rider.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${rider.efficiency}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">
                  {rider.efficiency}%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {rider.deliveries} deliveries · ⭐ {rider.rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}