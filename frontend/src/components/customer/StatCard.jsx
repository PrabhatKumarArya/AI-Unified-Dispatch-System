export default function StatCard({ title, value, color = "text-blue-600", icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 card-hover">
      {icon && (
        <div className={`text-2xl mb-3 ${color}`}>{icon}</div>
      )}
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h2 className={`text-3xl font-bold mt-1.5 ${color}`}>{value}</h2>
    </div>
  );
}