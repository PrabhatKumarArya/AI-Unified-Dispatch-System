const orders = [
  {
    id: "#1024",
    customer: "Prabhat",
    address: "IIIT Bhopal",
    status: "Out for Delivery",
    eta: "12 min",
  },
  {
    id: "#1025",
    customer: "Rahul",
    address: "Ashoka Garden",
    status: "Picked Up",
    eta: "18 min",
  },
  {
    id: "#1026",
    customer: "Anjali",
    address: "MP Nagar",
    status: "Assigned",
    eta: "25 min",
  },
];

export default function RiderOrders() {
  return (
    <div className="mt-8">

      <h1 className="text-3xl font-bold">
        Assigned Orders
      </h1>

      <p className="text-slate-500 mt-2">
        Manage today's delivery tasks.
      </p>

      <div className="bg-white rounded-2xl shadow mt-8 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">ETA</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (
              <tr key={order.id} className="border-t">

                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.address}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </td>
                <td className="p-4">{order.eta}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}