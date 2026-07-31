import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import RiderLayout from "../layouts/RiderLayout";
import AdminLayout from "../layouts/AdminLayout";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerOrders from "../pages/customer/CustomerOrders";
import CustomerAIDispatch from "../pages/customer/CustomerAIDispatch";
import CustomerProfile from "../pages/customer/CustomerProfile";
import CustomerSettings from "../pages/customer/CustomerSettings";
import OrderDetails from "../pages/customer/OrderDetails";
import CreateOrder from "../pages/customer/CreateOrder";

import RiderDashboard from "../pages/rider/RiderDashboard";
import RiderProfile from "../pages/rider/RiderProfile";
import RiderOrders from "../pages/rider/RiderOrders";
import RiderMap from "../pages/rider/RiderMap";
import RiderEarnings from "../pages/rider/RiderEarnings";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageRiders from "../pages/admin/ManageRiders";
import ManageCustomers from "../pages/admin/ManageCustomers";
import Analytics from "../pages/admin/Analytics";
import AIMonitor from "../pages/admin/AIMonitor";
import AdminSettings from "../pages/admin/AdminSettings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>
          <Route
            path="/admin/test"
            element={<h1 className="text-5xl">ADMIN TEST</h1>}
          />
          <Route element={<PrivateRoute allowedRoles={["customer"]} />}>
            <Route element={<CustomerLayout />}>
              <Route
                path="/customer/dashboard"
                element={<CustomerDashboard />}
              />
              <Route
                path="/customer/orders"
                element={<CustomerOrders />}
              />
              <Route
                path="/customer/ai-dispatch"
                element={<CustomerAIDispatch />}
              />
              <Route
                path="/customer/profile"
                element={<CustomerProfile />}
              />
              <Route
                path="/customer/settings"
                element={<CustomerSettings />}
              />
              <Route
                path="/customer/orders/:id"
                element={<OrderDetails />}
                />
              <Route
                path="/customer/create-order"
                element={<CreateOrder />}
              />
            </Route>
          </Route>
          <Route element={<PrivateRoute allowedRoles={["rider"]} />}>
            <Route element={<RiderLayout />}>
              <Route
                path="/rider/dashboard"
                element={<RiderDashboard />}
              />
              <Route path="/rider/orders" element={<RiderOrders />} />
              <Route path="/rider/earnings" element={<RiderEarnings />} />
              <Route path="/rider/map" element={<RiderMap />} />
              <Route path="/rider/profile" element={<RiderProfile />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout/>}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
              <Route
                path="/admin/orders"
                element={<ManageOrders />}
              />
              <Route
                path="/admin/riders"
                element={<ManageRiders />}
              />

              <Route
                path="/admin/customers"
                element={<ManageCustomers />}
              />

              <Route
                path="/admin/analytics"
                element={<Analytics />}
              />

              <Route
                path="/admin/ai-monitor"
                element={<AIMonitor />}
              />

              <Route
                path="/admin/settings"
                element={<AdminSettings />}
              />
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}