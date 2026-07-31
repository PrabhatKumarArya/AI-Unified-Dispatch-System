import RiderStatCard from "../../components/rider/RiderStatCard";
import AssignedOrders from "../../components/rider/AssignedOrders";
import RoutePreview from "../../components/rider/RoutePreview";
import TodayEarnings from "../../components/rider/TodayEarnings";
import LiveDeliveryStatus from "../../components/rider/LiveDeliveryStatus";
import RiderNotifications from "../../components/rider/RiderNotifications";
import RiderPerformance from "../../components/rider/RiderPerformance";
export default function RiderDashboard() {
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <RiderStatCard title="Completed" value="18" />
        <RiderStatCard title="Active Orders" value="3" color="text-orange-500" />
        <RiderStatCard title="Rating" value="4.9⭐" color="text-yellow-500" />
        <RiderStatCard title="Today's Earnings" value="₹820" color="text-green-600" />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
        <div className="xl:col-span-2">
          <AssignedOrders />
        </div>

        <TodayEarnings />
      </section>

      <section className="mt-10">
        <RoutePreview />
      </section>

      <section className="mt-10">
        <LiveDeliveryStatus />
      </section>

      <section className="mt-10">
        <RiderNotifications />
      </section>

      <section className="mt-10">
        <RiderPerformance />
      </section>
    </>
  );
}