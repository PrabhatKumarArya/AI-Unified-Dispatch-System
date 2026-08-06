export default function AdminStatCard({ title, value, color = "text-blue-600", icon, change }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 card-hover border border-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
          {change !== undefined && (
            <p className={`text-xs mt-1 font-medium ${change >= 0 ? "text-green-600" : "text-red-500"}`}>
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% vs yesterday
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-xl ${color.replace("text-", "bg-").replace("600", "100")}`}>
            <span className={`text-xl ${color}`}>{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
}