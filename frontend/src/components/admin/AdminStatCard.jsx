export default function AdminStatCard({
  title,
  value,
  color = "text-blue-600",
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">

      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

    </div>
  );
}