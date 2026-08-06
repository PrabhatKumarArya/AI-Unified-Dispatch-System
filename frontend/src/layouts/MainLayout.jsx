import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
}