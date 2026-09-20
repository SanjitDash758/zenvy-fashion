import { getAllOrders, WooOrder } from "./orders";

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  todayOrders: number;
  todayRevenue: number;
  avgOrderValue: number;
}

export interface DailyOrderCount {
  date: string;
  label: string;
  count: number;
  revenue: number;
}

/**
 * Fetch all orders and compute aggregate stats.
 * Note: WooCommerce API paginates. For a full count,
 * we loop through pages until fewer than per_page returned.
 */
export async function fetchAllOrdersForStats(): Promise<WooOrder[]> {
  const perPage = 100;
  let page = 1;
  const all: WooOrder[] = [];

  while (true) {
    const batch = await getAllOrders({ per_page: perPage, page });
    if (!batch || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < perPage) break;
    page++;
    if (page > 20) break; // safety cap (2000 orders)
  }

  return all;
}

export function computeStats(orders: WooOrder[]): DashboardStats {
  const total = orders.length;
  let pending = 0;
  let processing = 0;
  let shipped = 0;
  let completed = 0;
  let cancelled = 0;
  let revenue = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let todayOrders = 0;
  let todayRevenue = 0;

  for (const o of orders) {
    const amount = parseFloat(o.total) || 0;

    switch (o.status) {
      case "pending":
        pending++;
        break;
      case "processing":
      case "on-hold":
        processing++;
        break;
      case "shipped":
        shipped++;
        break;
      case "completed":
        completed++;
        revenue += amount;
        break;
      case "cancelled":
      case "refunded":
      case "failed":
        cancelled++;
        break;
    }

    const created = new Date(o.date_created);
    if (created >= today) {
      todayOrders++;
      if (o.status !== "cancelled" && o.status !== "failed") {
        todayRevenue += amount;
      }
    }
  }

  const avgOrderValue = completed > 0 ? Math.round(revenue / completed) : 0;

  return {
    totalOrders: total,
    pendingOrders: pending,
    processingOrders: processing,
    shippedOrders: shipped,
    completedOrders: completed,
    cancelledOrders: cancelled,
    totalRevenue: revenue,
    todayOrders,
    todayRevenue,
    avgOrderValue,
  };
}

export function computeDailyOrders(
  orders: WooOrder[],
  days: number = 7,
): DailyOrderCount[] {
  const result: DailyOrderCount[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const bnMonths = [
    "জানু",
    "ফেব",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্ট",
    "অক্টো",
    "নভে",
    "ডিসে",
  ];

  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(now);
    day.setDate(day.getDate() - i);
    const next = new Date(day);
    next.setDate(next.getDate() + 1);

    let count = 0;
    let revenue = 0;
    for (const o of orders) {
      const c = new Date(o.date_created);
      if (c >= day && c < next) {
        count++;
        revenue += parseFloat(o.total) || 0;
      }
    }

    result.push({
      date: day.toISOString().split("T")[0],
      label: `${day.getDate()} ${bnMonths[day.getMonth()]}`,
      count,
      revenue,
    });
  }

  return result;
}
