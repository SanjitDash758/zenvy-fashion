import { fetchAllOrdersForStats } from "@/lib/dashboard";
import { buildCustomersFromOrders } from "@/lib/customers";
import CustomersContent from "./CustomersContent";

export const revalidate = 60;

export default async function AdminCustomersPage() {
  const orders = await fetchAllOrdersForStats();
  const customers = buildCustomersFromOrders(orders);

  return <CustomersContent customers={customers} />;
}
