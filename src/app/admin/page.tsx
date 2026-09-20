import {
  fetchAllOrdersForStats,
  computeStats,
  computeDailyOrders,
} from "@/lib/dashboard";
import DashboardContent from "@/app/admin/DashboardContent";

export const revalidate = 60;

export default async function AdminDashboardPage() {
  const orders = await fetchAllOrdersForStats();
  const stats = computeStats(orders);
  const daily = computeDailyOrders(orders, 7);
  const recent = orders.slice(0, 10);

  return <DashboardContent stats={stats} daily={daily} recent={recent} />;
}
