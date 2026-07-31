export default function RiderStatCard({
  title,
  value,
  color = "text-blue-600",
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
      <h3 className="text-slate-500 text-sm">
        {title}
      </h3>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );
}