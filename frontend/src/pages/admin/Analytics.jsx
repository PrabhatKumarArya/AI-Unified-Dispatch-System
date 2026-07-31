import RevenueChart from "../../components/admin/RevenueChart";
import SystemAnalytics from "../../components/admin/SystemAnalytics";

export default function Analytics() {
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Analytics
      </h1>

      <RevenueChart />

      <SystemAnalytics />

    </div>
  );
}