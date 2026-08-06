import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/customer/CustomerSidebar";
import CustomerNavbar from "../components/customer/CustomerNavbar";

export default function CustomerLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%", background: "#f1f5f9" }}>
      <CustomerSidebar />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto", minWidth: 0 }}>
        <CustomerNavbar />
        <Outlet />
      </main>
    </div>
  );
}