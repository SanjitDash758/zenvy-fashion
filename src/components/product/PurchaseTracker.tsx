"use client";

import { useEffect } from "react";
import { usePixel } from "next-pixels";

export interface LineItem {
  id: number;
  name: string;
  quantity: number;
  price: number | string;
  total: string | number;
  sku?: string;
  image?: {
    src: string;
  };
}

export interface ShippingLine {
  method_title?: string;
  total?: string | number;
}

export interface BillingAddress {
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  address_2?: string;
  city: string;
  postcode?: string;
}

export interface Order {
  id: number;
  number: string | number;
  status: string;
  total: string | number;
  subtotal?: string | number;
  currency?: string;
  payment_method?: string;
  payment_method_title?: string;
  date_created: string;
  billing: BillingAddress;
  line_items: LineItem[];
  shipping_lines?: ShippingLine[];
}

interface PurchaseTrackerProps {
  order: Order;
}

export default function PurchaseTracker({ order }: PurchaseTrackerProps) {
  const { track } = usePixel();

  useEffect(() => {
    if (!order || !order.id) return;

    // ১. মেটা পিক্সেল ডুপ্লিকেট ট্র্যাকিং রোধ করতে localStorage চেক
    const storageKey = `meta_purchase_tracked_${order.id}`;
    if (typeof window !== "undefined" && localStorage.getItem(storageKey)) {
      return;
    }

    const lineItems = order.line_items ?? [];

    const contents = lineItems.map((item) => ({
      id: String(item.id || item.sku || ""),
      quantity: item.quantity ?? 1,
      item_price:
        typeof item.price === "string"
          ? parseFloat(item.price) || 0
          : item.price ?? 0,
    }));

    const numItems = lineItems.reduce(
      (sum, item) => sum + (item.quantity ?? 1),
      0
    );

    const numericTotal =
      typeof order.total === "string"
        ? parseFloat(order.total) || 0
        : order.total ?? 0;

    // ২. ফেসবুক পিক্সেল পারচেজ ইভেন্ট ট্রিগার
    track("Purchase", {
      value: numericTotal,
      currency: order.currency || "BDT",
      content_type: "product",
      contents,
      num_items: numItems,
      order_id: String(order.id || order.number),
    });

    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, "true");
    }
  }, [order?.id]); // track ফাংশন ডিপেন্ডেন্সিতে না রেখে শুধুমাত্র order.id ট্র্যাকিং করবে

  return null;
}
