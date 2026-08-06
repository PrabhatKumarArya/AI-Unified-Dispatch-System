import { Outlet } from "react-router-dom";
import RiderSidebar from "../components/rider/RiderSidebar";
import RiderNavbar from "../components/rider/RiderNavbar";

export default function RiderLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%", background: "#f1f5f9" }}>
      <RiderSidebar />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto", minWidth: 0 }}>
        <RiderNavbar />
        <Outlet />
      </main>
    </div>
  );
}