export default function RiderStatCard({ title, value, color = "text-blue-600", sub }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 card-hover">
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}