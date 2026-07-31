export default function AIInsights() {

  const insights = [
    "🚀 Route optimization reduced travel time by 18%.",
    "📦 AI batched 27 orders today.",
    "🛵 92% rider utilization achieved.",
    "⏱ Average ETA improved to 14 minutes.",
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Insights
      </h2>

      <div className="space-y-4">

        {insights.map((item, index) => (
          <div
            key={index}
            className="bg-slate-100 rounded-xl p-4"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}