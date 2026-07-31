const orders = [
  {
    id: "#1024",
    customer: "Prabhat",
    eta: "12 min",
  },
  {
    id: "#1025",
    customer: "Rahul",
    eta: "18 min",
  },
];

export default function AssignedOrders() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Assigned Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-xl p-4 mb-4"
        >
          <h3 className="font-semibold">
            {order.id}
          </h3>

          <p>{order.customer}</p>

          <p className="text-blue-600">
            ETA : {order.eta}
          </p>
        </div>
      ))}

    </div>
  );
}