export default function RiderPerformance() {
  const stats = [
    { label: "On-Time Delivery", value: "98%" },
    { label: "Acceptance Rate", value: "96%" },
    { label: "Average Rating", value: "4.9⭐" },
    { label: "Completed Orders", value: "532" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Performance Summary
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-100 rounded-xl p-5 text-center"
          >
            <h3 className="text-3xl font-bold text-blue-600">
              {stat.value}
            </h3>

            <p className="text-slate-600 mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}