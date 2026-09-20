"use client";

import Image from "next/image";
import {
  FiPackage,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";
import OrderStatusTimeline from "./OrderStatusTimeline";

interface OrderTrackingResultProps {
  order: any;
}

export default function OrderTrackingResult({
  order,
}: OrderTrackingResultProps) {
  const formatCurrency = (val: string | number) =>
    `৳${parseFloat(String(val)).toLocaleString("bn-BD")}`;

  const formatDate = (iso: string) => {
    try {
      const normalized =
        iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`;
      return new Date(normalized).toLocaleDateString("bn-BD", {
        timeZone: "Asia/Dhaka",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const statusLabels: Record<string, string> = {
    pending: "অপেক্ষমাণ",
    processing: "প্রসেসিং",
    "on-hold": "স্থগিত",
    shipped: "শিপড",
    completed: "সম্পন্ন",
    cancelled: "বাতিল",
    refunded: "ফেরত",
    failed: "ব্যর্থ",
  };

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-300",
    processing: "bg-blue-100 text-blue-700 border-blue-300",
    shipped: "bg-indigo-100 text-indigo-700 border-indigo-300",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-300",
    cancelled: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
              অর্ডার নম্বর
            </p>
            <h2
              className="text-4xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              #{order.number}
            </h2>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
              <FiCalendar size={12} />
              {formatDate(order.date_created)}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full border-2 font-bold text-sm ${
              statusStyles[order.status] || statusStyles.pending
            }`}
          >
            {statusLabels[order.status] || order.status}
          </span>
        </div>

        {/* Estimated delivery */}
        {order.meta?.estimated_delivery && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                🚚
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-rose-600 font-bold">
                  সম্ভাব্য ডেলিভারি
                </p>
                <p className="text-base font-bold text-gray-900">
                  {order.meta.estimated_delivery}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline */}
      <OrderStatusTimeline
        currentStatus={order.status}
        dateCreated={order.date_created}
        dateModified={order.date_modified}
      />

      {/* Items */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg overflow-hidden">
        <div className="px-8 py-6 border-b border-rose-100">
          <h3
            className="text-xl font-bold text-gray-900 flex items-center gap-2"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            <FiPackage className="text-rose-500" size={20} />
            অর্ডারকৃত পণ্য
          </h3>
        </div>

        <div className="divide-y divide-rose-100">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center gap-4 p-6">
              {item.image ? (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-rose-50 flex items-center justify-center text-rose-300 flex-shrink-0">
                  <FiPackage size={20} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm line-clamp-2">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatCurrency(item.price)} × {item.quantity}
                </p>
              </div>
              <p className="font-bold text-gray-900 text-sm flex-shrink-0">
                {formatCurrency(item.total)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="px-6 py-5 bg-rose-50/50 border-t border-rose-100">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-700">মোট</span>
            <span className="text-2xl font-bold text-rose-600">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Delivery */}
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-6">
          <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3 flex items-center gap-2">
            <FiMapPin size={12} className="text-rose-500" />
            ডেলিভারি তথ্য
          </h4>
          <p className="font-semibold text-gray-900">
            {order.customer.first_name} {order.customer.last_name}
          </p>
          <p className="text-sm text-gray-600 mt-1">{order.customer.city}</p>
        </div>

        {/* Payment */}
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-6">
          <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3 flex items-center gap-2">
            <FiCreditCard size={12} className="text-rose-500" />
            পেমেন্ট পদ্ধতি
          </h4>
          <p className="font-semibold text-gray-900">
            {order.payment_method_title}
          </p>
        </div>
      </div>

      {/* Support */}
      <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-6 text-center">
        <p className="text-sm text-gray-600 mb-3">কোনো সমস্যা বা প্রশ্ন আছে?</p>
        <a
          href="tel:+8801974164273"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          <FiPhone size={16} />
          01974-164273
        </a>
      </div>
    </div>
  );
}
