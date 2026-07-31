const deliveries = [
  {
    id: "#1024",
    customer: "Prabhat",
    location: "Near DB Mall",
    destination: "IIIT Bhopal",
    eta: "12 min",
    progress: 70,
  },
  {
    id: "#1025",
    customer: "Rahul",
    location: "MP Nagar",
    destination: "Ashoka Garden",
    eta: "18 min",
    progress: 45,
  },
];

export default function LiveDeliveryStatus() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Live Delivery Status
      </h2>

      {deliveries.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl p-5 mb-5"
        >
          <h3 className="font-bold text-lg">
            {item.id}
          </h3>

          <p><strong>Customer:</strong> {item.customer}</p>
          <p><strong>Current Location:</strong> {item.location}</p>
          <p><strong>Destination:</strong> {item.destination}</p>
          <p><strong>ETA:</strong> {item.eta}</p>

          <div className="w-full bg-slate-200 rounded-full h-3 mt-4">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${item.progress}%` }}
            />
          </div>

          <p className="text-sm text-slate-500 mt-2">
            {item.progress}% Completed
          </p>
        </div>
      ))}
    </div>
  );
}