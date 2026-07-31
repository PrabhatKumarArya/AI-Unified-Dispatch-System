import { Outlet } from "react-router-dom";
import RiderSidebar from "../components/rider/RiderSidebar";
import RiderNavbar from "../components/rider/RiderNavbar";

export default function RiderLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <RiderSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <RiderNavbar />
        <Outlet />
      </main>
    </div>
  );
}