import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/customer/CustomerSidebar";
import CustomerNavbar from "../components/customer/CustomerNavbar";

export default function CustomerLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <CustomerSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <CustomerNavbar />
        <Outlet />
      </main>
    </div>
  );
}