import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
import StatCard from "../../components/customer/StatCard";

export default function CustomerDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">

        <CustomerNavbar />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          <StatCard
            title="Total Orders"
            value="24"
            color="text-blue-600"
          />

          <StatCard
            title="Active Orders"
            value="5"
            color="text-green-600"
          />

          <StatCard
            title="Average ETA"
            value="18 min"
            color="text-orange-500"
          />

          <StatCard
            title="Money Saved"
            value="₹240"
            color="text-purple-600"
          />

        </div>

      </div>

    </div>
  );
}