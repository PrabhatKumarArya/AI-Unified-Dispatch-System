const orders = [
  {
    id: "#1024",
    customer: "Prabhat",
    service: "Food",
    status: "Delivered",
  },
  {
    id: "#1025",
    customer: "Rahul",
    service: "Grocery",
    status: "On Route",
  },
  {
    id: "#1026",
    customer: "Anjali",
    service: "Medicine",
    status: "Pending",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Orders
      </h2>

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Order</th>
            <th className="text-left py-3">Customer</th>
            <th className="text-left py-3">Service</th>
            <th className="text-left py-3">Status</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="py-4">{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.service}</td>
              <td>{order.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}