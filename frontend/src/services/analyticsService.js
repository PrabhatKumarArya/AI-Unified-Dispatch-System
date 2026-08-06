import api from "./api";

/**
 * Fetch all orders and compute analytics client-side
 */
export const getAnalyticsSummary = async () => {
  const response = await api.get("/orders");
  const orders = response.data.orders || [];

  const today = new Date().toDateString();
  const todaysOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today
  );
  const completed = todaysOrders.filter((o) => o.orderStatus === "Delivered");
  const pending = orders.filter((o) => o.orderStatus === "Pending");
  const active = orders.filter((o) =>
    ["Accepted", "Picked Up", "Out for Delivery"].includes(o.orderStatus)
  );

  const totalRevenue = orders
    .filter((o) => o.orderStatus === "Delivered")
    .reduce((sum, o) => sum + Number(o.deliveryFee || 0), 0);

  const avgTime =
    completed.length > 0
      ? (
          completed.reduce(
            (sum, o) => sum + Number(o.estimatedTime || 0),
            0
          ) / completed.length
        ).toFixed(1)
      : 0;

  return {
    totalOrders: orders.length,
    completedToday: completed.length,
    pendingOrders: pending.length,
    activeOrders: active.length,
    totalRevenue,
    avgDeliveryTime: avgTime,
    efficiency:
      todaysOrders.length > 0
        ? Math.round((completed.length / todaysOrders.length) * 100)
        : 0,
  };
};

/**
 * Get weekly order counts grouped by service type
 */
export const getServiceBreakdown = async () => {
  const response = await api.get("/orders");
  const orders = response.data.orders || [];

  const breakdown = { Food: 0, Grocery: 0, Pharmacy: 0, Parcel: 0 };
  orders.forEach((o) => {
    if (breakdown[o.serviceType] !== undefined) {
      breakdown[o.serviceType]++;
    }
  });
  return breakdown;
};