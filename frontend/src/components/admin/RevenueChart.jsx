const weeklyData = [
  { day: "Mon", orders: 48, revenue: 5800 },
  { day: "Tue", orders: 62, revenue: 7400 },
  { day: "Wed", orders: 55, revenue: 6600 },
  { day: "Thu", orders: 78, revenue: 9100 },
  { day: "Fri", orders: 91, revenue: 10800 },
  { day: "Sat", orders: 104, revenue: 12400 },
  { day: "Sun", orders: 72, revenue: 8500 },
];

const maxOrders = Math.max(...weeklyData.map((d) => d.orders));

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Weekly Performance</h2>
          <p className="text-sm text-slate-500 mt-0.5">Orders & revenue overview</p>
        </div>
        <div className="flex gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
            Orders
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />
            Revenue
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end gap-3 h-44">
        {weeklyData.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex gap-1 items-end" style={{ height: "140px" }}>
              {/* Orders bar */}
              <div
                className="flex-1 bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all duration-500 cursor-pointer"
                style={{ height: `${(d.orders / maxOrders) * 100}%` }}
                title={`${d.orders} orders`}
              />
              {/* Revenue bar (scaled) */}
              <div
                className="flex-1 bg-emerald-400 rounded-t-lg hover:bg-emerald-500 transition-all duration-500 cursor-pointer"
                style={{ height: `${(d.revenue / 12400) * 100}%` }}
                title={`₹${d.revenue}`}
              />
            </div>
            <span className="text-xs text-slate-500 font-medium">{d.day}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-100">
        <div>
          <p className="text-xs text-slate-500">Total Orders</p>
          <p className="text-xl font-bold text-slate-800 mt-1">510</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Total Revenue</p>
          <p className="text-xl font-bold text-slate-800 mt-1">₹60.6K</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Best Day</p>
          <p className="text-xl font-bold text-blue-600 mt-1">Saturday</p>
        </div>
      </div>
    </div>
  );
}