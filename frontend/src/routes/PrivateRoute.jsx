import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}