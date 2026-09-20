import { WooOrder } from "./orders";

export interface Customer {
  id: string; // phone number (unique identifier)
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  totalOrders: number;
  totalSpent: number;
  completedOrders: number;
  cancelledOrders: number;
  lastOrderDate: string;
  firstOrderDate: string;
  orderIds: number[];
}

/**
 * Build a unique list of customers from orders.
 * Uses phone number as the unique identifier.
 */
export function buildCustomersFromOrders(orders: WooOrder[]): Customer[] {
  const customerMap = new Map<string, Customer>();

  for (const order of orders) {
    const phone = (order.billing.phone || "").trim();
    const email = (order.billing.email || "").trim().toLowerCase();
    const firstName = (order.billing.first_name || "").trim();
    const lastName = (order.billing.last_name || "").trim();

    // Unique key: prefer phone, fallback to email, fallback to name
    const key =
      phone ||
      email ||
      `${firstName}-${lastName}`.toLowerCase() ||
      `order-${order.id}`;

    const orderTotal = parseFloat(order.total) || 0;
    const isCompleted = order.status === "completed";
    const isCancelled = ["cancelled", "refunded", "failed"].includes(
      order.status,
    );

    if (customerMap.has(key)) {
      const existing = customerMap.get(key)!;
      existing.totalOrders += 1;
      if (!isCancelled) existing.totalSpent += orderTotal;
      if (isCompleted) existing.completedOrders += 1;
      if (isCancelled) existing.cancelledOrders += 1;
      existing.orderIds.push(order.id);

      // Update last order date if newer
      if (
        new Date(order.date_created).getTime() >
        new Date(existing.lastOrderDate).getTime()
      ) {
        existing.lastOrderDate = order.date_created;
      }

      // Update first order date if older
      if (
        new Date(order.date_created).getTime() <
        new Date(existing.firstOrderDate).getTime()
      ) {
        existing.firstOrderDate = order.date_created;
      }

      // Fill in missing info
      if (!existing.email && email) existing.email = email;
      if (!existing.address && order.billing.address_1)
        existing.address = order.billing.address_1;
      if (!existing.city && order.billing.city)
        existing.city = order.billing.city;
      if (!existing.postcode && order.billing.postcode)
        existing.postcode = order.billing.postcode;
    } else {
      customerMap.set(key, {
        id: key,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim() || "Unknown",
        phone,
        email,
        address: order.billing.address_1 || "",
        city: order.billing.city || "",
        postcode: order.billing.postcode || "",
        totalOrders: 1,
        totalSpent: isCancelled ? 0 : orderTotal,
        completedOrders: isCompleted ? 1 : 0,
        cancelledOrders: isCancelled ? 1 : 0,
        lastOrderDate: order.date_created,
        firstOrderDate: order.date_created,
        orderIds: [order.id],
      });
    }
  }

  return Array.from(customerMap.values());
}