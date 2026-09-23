"use client";

import { FiSearch, FiX, FiFilter } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";

export type CustomerSortBy =
  | "recent"
  | "name"
  | "orders"
  | "spent";

interface CustomersFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: CustomerSortBy;
  onSortChange: (s: CustomerSortBy) => void;
  totalCount: number;
}

export default function CustomersFilter({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount,
}: CustomersFilterProps) {
  const { lang } = useLanguage();

  const sortOptions: Array<{ key: CustomerSortBy; labelBn: string; labelEn: string }> = [
    { key: "recent", labelBn: "সাম্প্রতিক", labelEn: "Recent" },
    { key: "name", labelBn: "নাম", labelEn: "Name" },
    { key: "orders", labelBn: "অর্ডার", labelEn: "Orders" },
    { key: "spent", labelBn: "খরচ", labelEn: "Spent" },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={
            lang === "bn"
              ? "নাম, ফোন বা ইমেইল দিয়ে খুঁজুন..."
              : "Search by name, phone, or email..."
          }
          className="w-full pl-12 pr-12 py-4 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition"
            aria-label="Clear"
          >
            <FiX className="w-3.5 h-3.5 text-slate-600" />
          </button>
        )}
      </div>

      {/* Sort Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold">
          <FiFilter className="w-4 h-4" />
          <span>{lang === "bn" ? "সাজান:" : "Sort by:"}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => {
            const active = sortBy === option.key;
            return (
              <button
                key={option.key}
                onClick={() => onSortChange(option.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30"
                    : "backdrop-blur-xl bg-white/60 border border-white/80 text-slate-600 hover:text-slate-900 hover:bg-white/80"
                }`}
              >
                {lang === "bn" ? option.labelBn : option.labelEn}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <div className="ml-auto text-sm text-slate-500 font-medium">
          {lang === "bn"
            ? `${totalCount.toLocaleString("bn-BD")} জন কাস্টমার`
            : `${totalCount.toLocaleString("en-US")} customers`}
        </div>
      </div>
    </div>
  );
}
