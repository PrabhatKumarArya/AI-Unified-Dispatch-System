const riders = [
  {
    name: "Rahul",
    deliveries: 42,
    rating: "4.9⭐",
    status: "Online",
  },
  {
    name: "Priya",
    deliveries: 38,
    rating: "4.8⭐",
    status: "Offline",
  },
  {
    name: "Aman",
    deliveries: 51,
    rating: "5.0⭐",
    status: "Online",
  },
];

export default function ManageRiders() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Manage Riders
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {riders.map((rider) => (
          <div
            key={rider.name}
            className="bg-white rounded-2xl shadow p-6"
          >

            <h2 className="text-xl font-bold">
              {rider.name}
            </h2>

            <p className="mt-3">
              Deliveries : {rider.deliveries}
            </p>

            <p>
              Rating : {rider.rating}
            </p>

            <p>
              Status : {rider.status}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}