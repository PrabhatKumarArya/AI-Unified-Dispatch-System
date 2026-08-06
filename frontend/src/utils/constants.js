export const API_BASE_URL = "http://localhost:5000/api";

export const ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  RIDER: "rider",
};

export const ORDER_STATUS = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  PICKED_UP: "Picked Up",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const SERVICE_TYPES = ["Food", "Grocery", "Pharmacy", "Parcel"];

export const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-blue-100 text-blue-700",
  "Picked Up": "bg-indigo-100 text-indigo-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export const NAV_ITEMS = {
  admin: [
    { title: "Dashboard", path: "/admin/dashboard" },
    { title: "Orders", path: "/admin/orders" },
    { title: "Riders", path: "/admin/riders" },
    { title: "Customers", path: "/admin/customers" },
    { title: "Analytics", path: "/admin/analytics" },
    { title: "AI Monitor", path: "/admin/ai-monitor" },
    { title: "Settings", path: "/admin/settings" },
  ],
  customer: [
    { title: "Dashboard", path: "/customer/dashboard" },
    { title: "My Orders", path: "/customer/orders" },
    { title: "AI Dispatch", path: "/customer/ai-dispatch" },
    { title: "Profile", path: "/customer/profile" },
    { title: "Settings", path: "/customer/settings" },
  ],
  rider: [
    { title: "Dashboard", path: "/rider/dashboard" },
    { title: "Orders", path: "/rider/orders" },
    { title: "Route Map", path: "/rider/map" },
    { title: "Earnings", path: "/rider/earnings" },
    { title: "Profile", path: "/rider/profile" },
  ],
};
