import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import DashboardLayout from "../layouts/DashboardLayout";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import RiderDashboard from "../pages/rider/RiderDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>
          <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
          />

          <Route
            path="/rider/dashboard"
            element={<RiderDashboard />}
          />

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}