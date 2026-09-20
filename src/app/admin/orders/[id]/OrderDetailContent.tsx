"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FiArrowLeft,
  FiPhone,
  FiMapPin,
  FiMail,
  FiCopy,
  FiCheck,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";
import { useLanguage } from "@/components/admin/LanguageProvider";
import OrderStatusActions from "@/components/admin/OrderStatusActions";
import OrderTimeline from "@/components/admin/OrderTimeline";
import { WooOrder, OrderNote } from "@/lib/orders";

interface OrderDetailContentProps {
  order: WooOrder;
  notes: OrderNote[];
}

const statusStyles: Record<
  string,
  { bg: string; text: string; border: string; labelBn: string; labelEn: string }
> = {
  pending: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-300",
    labelBn: "অপেক্ষমাণ",
    labelEn: "Pending",
  },
  processing: {
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    border: "border-cyan-300",
    labelBn: "প্রসেসিং",
    labelEn: "Processing",
  },
  "on-hold": {
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-300",
    labelBn: "স্থগিত",
    labelEn: "On Hold",
  },
  shipped: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-300",
    labelBn: "শিপড",
    labelEn: "Shipped",
  },
  completed: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-300",
    labelBn: "সম্পন্ন",
    labelEn: "Completed",
  },
  cancelled: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
    labelBn: "বাতিল",
    labelEn: "Cancelled",
  },
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 w-6 h-6 rounded-md hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
      title={label}
      aria-label={label}
    >
      {copied ? (
        <FiCheck size={12} className="text-emerald-500" />
      ) : (
        <FiCopy size={12} />
      )}
    </button>
  );
}

export default function OrderDetailContent({
  order,
  notes,
}: OrderDetailContentProps) {
  const { lang, t } = useLanguage();
  const style = statusStyles[order.status] || statusStyles.pending;
  const statusLabel = lang === "bn" ? style.labelBn : style.labelEn;

  const formatDate = (iso: string) => {
    const utcString = iso.endsWith("Z") ? iso : `${iso}Z`;
    const date = new Date(utcString);

    return date.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
      timeZone: "Asia/Dhaka",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (n: string | number) =>
    `৳${parseFloat(String(n)).toLocaleString(
      lang === "bn" ? "bn-BD" : "en-US",
    )}`;

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition mb-4"
        >
          <FiArrowLeft size={16} />
          {lang === "bn" ? "সব অর্ডার" : "All Orders"}
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">
              #{order.number}
            </h1>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
              <FiCalendar size={14} />
              {formatDate(order.date_created)}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-2xl text-sm font-bold border-2 ${style.bg} ${style.text} ${style.border}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Customer + Items — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Card */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-5">
              {t.customerInfo}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  {lang === "bn" ? "নাম" : "Name"}
                </p>
                <p className="font-semibold text-slate-900">
                  {order.billing.first_name} {order.billing.last_name}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center">
                  <FiPhone size={10} className="mr-1" />
                  {lang === "bn" ? "ফোন" : "Phone"}
                </p>
                <div className="flex items-center">
                  <p className="font-semibold text-slate-900">
                    {order.billing.phone}
                  </p>
                  <CopyButton text={order.billing.phone} label={t.copy} />
                </div>
              </div>

              {order.billing.email && (
                <div className="md:col-span-2">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center">
                    <FiMail size={10} className="mr-1" />
                    {lang === "bn" ? "ইমেইল" : "Email"}
                  </p>
                  <div className="flex items-center">
                    <p className="font-semibold text-slate-900">
                      {order.billing.email}
                    </p>
                    <CopyButton text={order.billing.email} label={t.copy} />
                  </div>
                </div>
              )}

              <div className="md:col-span-2">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center">
                  <FiMapPin size={10} className="mr-1" />
                  {lang === "bn" ? "ঠিকানা" : "Address"}
                </p>
                <div className="flex items-start">
                  <p className="font-semibold text-slate-900">
                    {order.billing.address_1}
                    {order.billing.address_2 && `, ${order.billing.address_2}`}
                    <br />
                    {order.billing.city}
                    {order.billing.postcode && ` — ${order.billing.postcode}`}
                  </p>
                  <CopyButton
                    text={`${order.billing.address_1}, ${order.billing.city} ${order.billing.postcode || ""}`}
                    label={t.copy}
                  />
                </div>
              </div>

              {order.customer_note && (
                <div className="md:col-span-2">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                    {t.note}
                  </p>
                  <p className="text-sm text-slate-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    {order.customer_note}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Items Card */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-200/60">
              <h2 className="text-lg font-bold text-slate-900">
                {t.orderItems}
              </h2>
            </div>

            <div className="divide-y divide-slate-200/60">
              {order.line_items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4">
                  {item.image?.src ? (
                    <Image
                      src={item.image.src}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-xl bg-slate-100"
                      unoptimized
                    />
                  ) : (
                    <div className="w-15 h-15 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 text-xs">
                      —
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">
                    {formatCurrency(item.total)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="p-6 bg-slate-50/60 space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>{lang === "bn" ? "সাবটোটাল" : "Subtotal"}</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {parseFloat(order.discount_total) > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>{lang === "bn" ? "ছাড়" : "Discount"}</span>
                  <span>-{formatCurrency(order.discount_total)}</span>
                </div>
              )}
              {parseFloat(order.shipping_total) > 0 && (
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{lang === "bn" ? "শিপিং" : "Shipping"}</span>
                  <span>{formatCurrency(order.shipping_total)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-3">
                <span className="font-bold text-slate-900">{t.total}</span>
                <span className="text-2xl font-black text-indigo-600">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FiCreditCard className="text-indigo-500" />
              {t.paymentMethod}
            </h2>
            <p className="font-semibold text-slate-900">
              {order.payment_method_title || order.payment_method}
            </p>
          </div>
        </div>

        {/* Right: Actions + Timeline */}
        <div className="space-y-6">
          <OrderStatusActions orderId={order.id} currentStatus={order.status} />

          <OrderTimeline
            currentStatus={order.status}
            dateCreated={order.date_created}
            dateModified={order.date_modified}
            notes={notes}
          />
        </div>
      </div>
    </div>
  );
}
