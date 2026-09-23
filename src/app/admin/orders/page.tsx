import { fetchAllOrdersForStats } from "@/lib/dashboard";
import OrdersContent from "./OrdersContent";

export const revalidate = 60;

export default async function AdminOrdersPage() {
  const orders = await fetchAllOrdersForStats();

  return <OrdersContent orders={orders} />;
}
