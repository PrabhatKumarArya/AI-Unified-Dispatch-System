import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <AdminNavbar />
        <Outlet />
      </main>

    </div>
  );
}