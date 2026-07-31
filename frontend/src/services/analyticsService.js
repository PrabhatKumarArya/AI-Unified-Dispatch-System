import { getOrders } from "./orderService";

export async function getDeliveryAnalytics() {
  const data = await getOrders();

  if (!data.success) return null;

  // calculate analytics here

  return analytics;
}