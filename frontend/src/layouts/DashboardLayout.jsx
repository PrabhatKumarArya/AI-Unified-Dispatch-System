import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}