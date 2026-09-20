"use client";

import Link from "next/link";
import { FiArrowRight, FiPhone, FiMapPin, FiCalendar } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";
import { WooOrder } from "@/lib/orders";

interface OrderCardProps {
  order: WooOrder;
}

const statusStyles: Record<
  string,
  { bg: string; text: string; border: string; labelBn: string; labelEn: string }
> = {
  pending: {
    bg: "bg-amber-100/70",
    text: "text-amber-700",
    border: "border-amber-300/50",
    labelBn: "অপেক্ষমাণ",
    labelEn: "Pending",
  },
  processing: {
    bg: "bg-cyan-100/70",
    text: "text-cyan-700",
    border: "border-cyan-300/50",
    labelBn: "প্রসেসিং",
    labelEn: "Processing",
  },
  "on-hold": {
    bg: "bg-violet-100/70",
    text: "text-violet-700",
    border: "border-violet-300/50",
    labelBn: "স্থগিত",
    labelEn: "On Hold",
  },
  shipped: {
    bg: "bg-indigo-100/70",
    text: "text-indigo-700",
    border: "border-indigo-300/50",
    labelBn: "শিপড",
    labelEn: "Shipped",
  },
  completed: {
    bg: "bg-emerald-100/70",
    text: "text-emerald-700",
    border: "border-emerald-300/50",
    labelBn: "সম্পন্ন",
    labelEn: "Completed",
  },
  cancelled: {
    bg: "bg-red-100/70",
    text: "text-red-700",
    border: "border-red-300/50",
    labelBn: "বাতিল",
    labelEn: "Cancelled",
  },
};

export default function OrderCard({ order }: OrderCardProps) {
  const { lang } = useLanguage();
  const style = statusStyles[order.status] || statusStyles.pending;

  const statusLabel = lang === "bn" ? style.labelBn : style.labelEn;

  const date = (() => {
    const utcString = order.date_created.endsWith("Z")
      ? order.date_created
      : `${order.date_created}Z`;
    return new Date(utcString).toLocaleDateString(
      lang === "bn" ? "bn-BD" : "en-US",
      {
        timeZone: "Asia/Dhaka",
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    );
  })();

  const itemCount = order.line_items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <Link
      href={`/admin/orders/${order.id}`}
      className="group block backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Top bar with gradient */}
      <div className="relative h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />

      <div className="p-6">
        {/* Header: Order number + Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
              {order.billing.first_name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base leading-tight">
                #{order.number}
              </p>
              <p className="text-xs text-slate-500">
                {order.billing.first_name} {order.billing.last_name}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold border ${style.bg} ${style.text} ${style.border}`}
          >
            {statusLabel}
          </span>
        </div>

        {/* Info rows */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FiPhone className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-medium">{order.billing.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FiMapPin className="w-3.5 h-3.5 text-indigo-500" />
            <span className="truncate">
              {order.billing.city}
              {order.billing.address_1
                ? `, ${order.billing.address_1.slice(0, 30)}`
                : ""}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FiCalendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>{date}</span>
          </div>
        </div>

        {/* Footer: Amount + Arrow */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              {lang === "bn" ? "মোট" : "Total"}
            </p>
            <p className="text-lg font-black text-slate-900">
              ৳
              {parseFloat(order.total).toLocaleString(
                lang === "bn" ? "bn-BD" : "en-US",
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              {itemCount} {lang === "bn" ? "আইটেম" : "items"}
            </span>
            <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <FiArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
