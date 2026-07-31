const riders = [
  {
    name: "Rahul",
    completed: 42,
    rating: "4.9⭐",
  },
  {
    name: "Aman",
    completed: 37,
    rating: "4.8⭐",
  },
  {
    name: "Priya",
    completed: 45,
    rating: "5.0⭐",
  },
];

export default function RiderPerformance() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Rider Performance
      </h2>

      {riders.map((rider) => (
        <div
          key={rider.name}
          className="flex justify-between border-b py-4"
        >
          <div>
            <h3 className="font-semibold">
              {rider.name}
            </h3>

            <p className="text-slate-500">
              {rider.completed} Deliveries
            </p>
          </div>

          <span className="font-bold text-yellow-500">
            {rider.rating}
          </span>

        </div>
      ))}

    </div>
  );
}