"use client";

import { FiSearch, FiX } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";

export type OrderStatusFilter =
  | "all"
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

interface OrdersFilterProps {
  activeStatus: OrderStatusFilter;
  onStatusChange: (status: OrderStatusFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: Record<OrderStatusFilter, number>;
}

export default function OrdersFilter({
  activeStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
  counts,
}: OrdersFilterProps) {
  const { t } = useLanguage();

  const tabs: Array<{ key: OrderStatusFilter; label: string }> = [
    { key: "all", label: t.all },
    { key: "pending", label: t.pending },
    { key: "processing", label: t.processing },
    { key: "shipped", label: t.shippedStatus },
    { key: "completed", label: t.completed },
    { key: "cancelled", label: t.cancelled },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchOrders}
          className="w-full pl-12 pr-12 py-4 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition"
            aria-label="Clear search"
          >
            <FiX className="w-3.5 h-3.5 text-slate-600" />
          </button>
        )}
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active = activeStatus === tab.key;
          const count = counts[tab.key] || 0;
          return (
            <button
              key={tab.key}
              onClick={() => onStatusChange(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30"
                  : "backdrop-blur-xl bg-white/60 border border-white/80 text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
