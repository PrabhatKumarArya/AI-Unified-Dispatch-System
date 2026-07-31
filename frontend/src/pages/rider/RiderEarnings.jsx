export default function RiderEarnings() {

  const earnings = [
    { day: "Monday", amount: "₹820" },
    { day: "Tuesday", amount: "₹760" },
    { day: "Wednesday", amount: "₹910" },
    { day: "Thursday", amount: "₹840" },
    { day: "Friday", amount: "₹960" },
  ];

  return (
    <div className="mt-8">

      <h1 className="text-3xl font-bold">
        Earnings
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-slate-500">
            This Week
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            ₹4,290
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-slate-500">
            Deliveries
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            42
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-slate-500">
            Rating
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            ⭐4.9
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6 mt-8">

        <h2 className="text-xl font-bold mb-4">
          Weekly Earnings
        </h2>

        {earnings.map((item) => (
          <div
            key={item.day}
            className="flex justify-between py-3 border-b"
          >
            <span>{item.day}</span>
            <span className="font-bold">{item.amount}</span>
          </div>
        ))}

      </div>

    </div>
  );
}