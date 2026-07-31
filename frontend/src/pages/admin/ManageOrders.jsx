const orders = [
  {
    id: "#1024",
    customer: "Prabhat",
    service: "Food",
    rider: "Rahul",
    status: "Delivered",
  },
  {
    id: "#1025",
    customer: "Aman",
    service: "Parcel",
    rider: "Rohit",
    status: "On Route",
  },
  {
    id: "#1026",
    customer: "Anjali",
    service: "Medicine",
    rider: "Priya",
    status: "Pending",
  },
];

export default function ManageOrders() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Manage Orders
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Rider</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.service}</td>
                <td className="p-4">{order.rider}</td>
                <td className="p-4">{order.status}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}