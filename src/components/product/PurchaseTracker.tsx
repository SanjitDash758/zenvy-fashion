"use client";

import { useEffect } from "react";
import { usePixel } from "next-pixels";

interface PurchaseTrackerProps {
  order: {
    id: number;
    total: string;
    line_items: Array<{
      product_id: number;
      quantity: number;
      price: number;
    }>;
  };
}

export default function PurchaseTracker({ order }: PurchaseTrackerProps) {
  const { track } = usePixel();

  useEffect(() => {
    if (!order) return;

    const storageKey = `meta_purchase_tracked_${order.id}`;

    if (localStorage.getItem(storageKey)) {
      return;
    }

    localStorage.setItem(storageKey, "true");

    track({
      eventName: "Purchase",
      data: {
        content_ids: order.line_items.map((item) =>
          item.product_id.toString(),
        ),
        content_type: "product",
        value: parseFloat(order.total),
        currency: "BDT",
        num_items: order.line_items.reduce(
        (total, item) => total + item.quantity,
        0,
        ),
        order_id: order.id.toString(),
        contents: order.line_items.map((item) => ({
          id: item.product_id.toString(),
          quantity: item.quantity,
          item_price: item.price,
        })),
      },
    });

    console.log(`[Meta] Purchase tracked for order ${order.id}`);
  }, [order, track]);

  return null;
}
