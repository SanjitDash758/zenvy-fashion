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
    if (typeof window !== "undefined" && order) {
      track({
        eventName: "Purchase",
        data: {
          content_ids: order.line_items.map((item) =>
            item.product_id.toString(),
          ),
          content_type: "product",
          value: parseFloat(order.total),
          currency: "BDT",
          num_items: order.line_items.length,
          order_id: order.id.toString(),
          contents: order.line_items.map((item) => ({
            id: item.product_id.toString(),
            quantity: item.quantity,
            item_price: item.price,
          })),
        },
      });
    }
  }, [order, track]);

  return null; // কিছুই রেন্ডার করে না — শুধু Pixel ট্র্যাক করে
}