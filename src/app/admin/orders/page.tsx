import { fetchAllOrdersForStats } from "@/lib/dashboard";
import OrdersContent from "./OrdersContent";

export const revalidate = 3600;

export default async function AdminOrdersPage() {
  const orders = await fetchAllOrdersForStats();

  return <OrdersContent orders={orders} />;
}
