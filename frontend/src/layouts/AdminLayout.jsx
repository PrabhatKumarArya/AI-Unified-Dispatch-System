import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%", background: "#f1f5f9" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto", minWidth: 0 }}>
        <AdminNavbar />
        <Outlet />
      </main>
    </div>
  );
}