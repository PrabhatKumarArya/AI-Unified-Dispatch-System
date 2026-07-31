import AdminStatCard from "../../components/admin/AdminStatCard";
import RecentOrders from "../../components/admin/RecentOrders";
import RiderPerformance from "../../components/admin/RiderPerformance";
import AIInsights from "../../components/admin/AIInsights";
import RevenueChart from "../../components/admin/RevenueChart";
import SystemAnalytics from "../../components/admin/SystemAnalytics";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      {/* Top Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <AdminStatCard
          title="Today's Orders"
          value="328"
          color="text-blue-600"
        />

        <AdminStatCard
          title="Active Riders"
          value="86"
          color="text-green-600"
        />

        <AdminStatCard
          title="Customers"
          value="5,472"
          color="text-purple-600"
        />

        <AdminStatCard
          title="Revenue"
          value="₹1.82L"
          color="text-orange-500"
        />

      </section>

      {/* Revenue Chart */}
      <section>
        <RevenueChart />
      </section>

      {/* Orders + Rider Performance */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2">
          <RecentOrders />
        </div>

        <div>
          <RiderPerformance />
        </div>

      </section>

      {/* AI Insights */}
      <section>
        <AIInsights />
      </section>

      {/* System Analytics */}
      <section>
        <SystemAnalytics />
      </section>

    </div>
  );
}