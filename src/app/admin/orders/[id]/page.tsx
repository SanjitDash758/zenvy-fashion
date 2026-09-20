import { notFound } from "next/navigation";
import { getOrder, getOrderNotes } from "@/lib/orders";
import OrderDetailContent from "./OrderDetailContent";

export const revalidate = 30;

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const orderId = parseInt(id);

  if (isNaN(orderId)) {
    notFound();
  }

  // Fetch order + notes in parallel
  const [order, notes] = await Promise.all([
    getOrder(orderId),
    getOrderNotes(orderId),
  ]);

  if (!order) {
    notFound();
  }

  return <OrderDetailContent order={order} notes={notes} />;
}
