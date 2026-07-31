const customers = [
  "Prabhat",
  "Anjali",
  "Rahul",
  "Rohit",
  "Priya",
];

export default function ManageCustomers() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Customers
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {customers.map((customer) => (
          <div
            key={customer}
            className="bg-white rounded-xl shadow p-5"
          >
            {customer}
          </div>
        ))}

      </div>

    </div>
  );
}