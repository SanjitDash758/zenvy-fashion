"use client";

import Link from "next/link";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiShoppingBag,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";
import { Customer } from "@/lib/customers";

interface CustomerCardProps {
  customer: Customer;
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  const { lang } = useLanguage();

  const formatCurrency = (n: number) =>
    `৳${n.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}`;

  const formatNumber = (n: number) =>
    n.toLocaleString(lang === "bn" ? "bn-BD" : "en-US");

  // Avatar: use first letter of name
  const initial = customer.firstName?.[0]?.toUpperCase() || "?";

  // Avatar color based on name (consistent per customer)
  const colorIndex =
    (customer.id.charCodeAt(0) + (customer.id.charCodeAt(1) || 0)) % 6;
  const avatarColors = [
    "from-indigo-400 to-violet-600",
    "from-cyan-400 to-blue-600",
    "from-emerald-400 to-teal-600",
    "from-amber-400 to-orange-600",
    "from-rose-400 to-pink-600",
    "from-violet-400 to-purple-600",
  ];
  const avatarGradient = avatarColors[colorIndex];

  const totalOrdersLabel = lang === "bn" ? "মোট অর্ডার" : "Total Orders";
  const totalSpentLabel = lang === "bn" ? "মোট খরচ" : "Total Spent";

  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-base truncate">
              {customer.fullName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {customer.totalOrders > 1
                ? lang === "bn"
                  ? `পুনরাবৃত্তি ক্রেতা`
                  : `Repeat Customer`
                : lang === "bn"
                  ? `নতুন ক্রেতা`
                  : `New Customer`}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-5">
          {customer.phone && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FiPhone className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span className="font-medium truncate">{customer.phone}</span>
            </div>
          )}
          {customer.email && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FiMail className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span className="truncate">{customer.email}</span>
            </div>
          )}
          {customer.city && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FiMapPin className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span className="truncate">{customer.city}</span>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100">
            <div className="flex items-center gap-1.5 mb-1">
              <FiShoppingBag className="w-3 h-3 text-indigo-600" />
              <p className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold">
                {totalOrdersLabel}
              </p>
            </div>
            <p className="text-lg font-black text-indigo-700">
              {formatNumber(customer.totalOrders)}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div className="flex items-center gap-1.5 mb-1">
              <FiTrendingUp className="w-3 h-3 text-emerald-600" />
              <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">
                {totalSpentLabel}
              </p>
            </div>
            <p className="text-lg font-black text-emerald-700">
              {formatCurrency(customer.totalSpent)}
            </p>
          </div>
        </div>

        {/* View Orders Button */}
        <Link
          href={`/admin/orders?search=${encodeURIComponent(customer.phone || customer.fullName)}`}
          className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>{lang === "bn" ? "অর্ডার দেখুন" : "View Orders"}</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
