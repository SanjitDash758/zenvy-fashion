"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";
import { WooOrder } from "@/lib/orders";

interface RecentOrdersProps {
  orders: WooOrder[];
}

const statusStyles: Record<
  string,
  { bg: string; text: string; labelBn: string; labelEn: string }
> = {
  pending: {
    bg: "bg-amber-100/70 border-amber-300/50",
    text: "text-amber-700",
    labelBn: "অপেক্ষমাণ",
    labelEn: "Pending",
  },
  processing: {
    bg: "bg-cyan-100/70 border-cyan-300/50",
    text: "text-cyan-700",
    labelBn: "প্রসেসিং",
    labelEn: "Processing",
  },
  "on-hold": {
    bg: "bg-violet-100/70 border-violet-300/50",
    text: "text-violet-700",
    labelBn: "স্থগিত",
    labelEn: "On Hold",
  },
  shipped: {
    bg: "bg-indigo-100/70 border-indigo-300/50",
    text: "text-indigo-700",
    labelBn: "শিপড",
    labelEn: "Shipped",
  },
  completed: {
    bg: "bg-emerald-100/70 border-emerald-300/50",
    text: "text-emerald-700",
    labelBn: "সম্পন্ন",
    labelEn: "Completed",
  },
  cancelled: {
    bg: "bg-red-100/70 border-red-300/50",
    text: "text-red-700",
    labelBn: "বাতিল",
    labelEn: "Cancelled",
  },
};

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const { t, lang } = useLanguage();

  if (orders.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/80 shadow-lg text-center">
        <p className="text-slate-500">{t.noOrders}</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/60 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{t.recentOrders}</h2>
          <p className="text-xs text-slate-500 mt-1">
            {lang === "bn"
              ? `সর্বশেষ ${orders.length}টি অর্ডার`
              : `Latest ${orders.length} orders`}
          </p>
        </div>
        <Link
          href="/admin/orders"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition"
        >
          {t.viewAll}
          <FiArrowUpRight size={14} />
        </Link>
      </div>

      {/* List */}
      <div className="divide-y divide-white/60">
        {orders.map((order) => {
          const style = statusStyles[order.status] || statusStyles.pending;
          const statusLabel = lang === "bn" ? style.labelBn : style.labelEn;

          // Format date with proper UTC → Dhaka conversion
          const utcString = order.date_created.endsWith("Z")
            ? order.date_created
            : `${order.date_created}Z`;
          const date = new Date(utcString).toLocaleDateString(
            lang === "bn" ? "bn-BD" : "en-US",
            {
              timeZone: "Asia/Dhaka",
              day: "numeric",
              month: "short",
            },
          );

          // Format amount with language-aware numeral
          const amount = parseFloat(order.total).toLocaleString(
            lang === "bn" ? "bn-BD" : "en-US",
          );

          return (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex items-center gap-4 p-4 hover:bg-white/40 transition group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {order.billing.first_name?.[0]?.toUpperCase() || "?"}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900 text-sm truncate">
                    {order.billing.first_name} {order.billing.last_name}
                  </p>
                  <span className="text-xs text-slate-400">
                    #{order.number}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {order.billing.phone} • {date}
                </p>
              </div>

              {/* Amount + Status */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-slate-900 text-sm">৳{amount}</p>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${style.bg} ${style.text}`}
                >
                  {statusLabel}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
