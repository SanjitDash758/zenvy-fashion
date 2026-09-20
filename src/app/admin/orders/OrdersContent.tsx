"use client";

import { useState, useMemo } from "react";
import { FiInbox } from "react-icons/fi";
import { useLanguage } from "@/components/admin/LanguageProvider";
import OrderCard from "@/components/admin/OrderCard";
import OrdersFilter, {
  OrderStatusFilter,
} from "@/components/admin/OrdersFilter";
import { WooOrder } from "@/lib/orders";

interface OrdersContentProps {
  orders: WooOrder[];
}

export default function OrdersContent({ orders }: OrdersContentProps) {
  const { t, lang } = useLanguage();
  const [activeStatus, setActiveStatus] = useState<OrderStatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Counts for each status
  const counts = useMemo(() => {
    const c: Record<OrderStatusFilter, number> = {
      all: orders.length,
      pending: 0,
      processing: 0,
      shipped: 0,
      completed: 0,
      cancelled: 0,
    };
    for (const o of orders) {
      const s = o.status;
      if (s === "pending") c.pending++;
      else if (s === "processing" || s === "on-hold") c.processing++;
      else if (s === "shipped") c.shipped++;
      else if (s === "completed") c.completed++;
      else if (s === "cancelled" || s === "refunded" || s === "failed")
        c.cancelled++;
    }
    return c;
  }, [orders]);

  // Filtered orders
  const filtered = useMemo(() => {
    let list = orders;

    // Status filter
    if (activeStatus !== "all") {
      list = list.filter((o) => {
        if (activeStatus === "processing")
          return o.status === "processing" || o.status === "on-hold";
        if (activeStatus === "cancelled")
          return ["cancelled", "refunded", "failed"].includes(o.status);
        return o.status === activeStatus;
      });
    }

    // Search filter
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((o) => {
        const name =
          `${o.billing.first_name} ${o.billing.last_name}`.toLowerCase();
        const phone = o.billing.phone?.toLowerCase() || "";
        const number = o.number?.toLowerCase() || "";
        const city = o.billing.city?.toLowerCase() || "";
        return (
          name.includes(q) ||
          phone.includes(q) ||
          number.includes(q) ||
          city.includes(q)
        );
      });
    }

    return list;
  }, [orders, activeStatus, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
          {t.orders}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          {lang === "bn"
            ? `মোট ${orders.length}টি অর্ডার`
            : `${orders.length} total orders`}
        </p>
      </div>

      {/* Filters */}
      <OrdersFilter
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={counts}
      />

      {/* Orders Grid */}
      {filtered.length === 0 ? (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-16 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <FiInbox className="w-10 h-10 text-slate-400" />
          </div>
          <p className="text-slate-600 font-semibold">{t.noOrders}</p>
          {searchQuery && (
            <p className="text-slate-400 text-sm mt-2">
              {lang === "bn"
                ? `"${searchQuery}" এর জন্য কোনো ফলাফল নেই`
                : `No results for "${searchQuery}"`}
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
