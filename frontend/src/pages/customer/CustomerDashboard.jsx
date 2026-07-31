import StatCard from "../../components/customer/StatCard";
import RecentOrders from "../../components/customer/RecentOrders";
import AIRecommendation from "../../components/customer/AIRecommendation";
import LiveOrderStatus from "../../components/customer/LiveOrderStatus";
import DeliveryAnalytics from "../../components/customer/DeliveryAnalytics";

export default function CustomerDashboard() {
  return (
    <>
      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <StatCard title="Total Orders" value="24" color="text-blue-600" />
        <StatCard title="Active Orders" value="5" color="text-green-600" />
        <StatCard title="Average ETA" value="18 min" color="text-orange-500" />
        <StatCard title="Money Saved" value="₹240" color="text-purple-600" />
      </section>

      {/* Orders + AI */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>

        <div>
          <AIRecommendation />
        </div>
      </section>

      {/* Live Order Status */}
      <section className="mt-10">
        <LiveOrderStatus />
      </section>

      {/* Analytics */}
      <section className="mt-10">
        <DeliveryAnalytics />
      </section>
    </>
  );
}