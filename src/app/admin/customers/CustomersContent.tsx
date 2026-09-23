"use client";

import { useState, useMemo } from "react";
import { FiUsers } from "react-icons/fi";
import { useLanguage } from "@/components/admin/LanguageProvider";
import CustomerCard from "@/components/admin/CustomerCard";
import CustomersFilter, {
  CustomerSortBy,
} from "@/components/admin/CustomersFilter";
import { Customer } from "@/lib/customers";

interface CustomersContentProps {
  customers: Customer[];
}

export default function CustomersContent({
  customers,
}: CustomersContentProps) {
  const { t, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<CustomerSortBy>("recent");

  // Filter + Sort
  const filtered = useMemo(() => {
    let list = [...customers];

    // Search
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((c) => {
        return (
          c.fullName.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q)
        );
      });
    }

    // Sort
    switch (sortBy) {
      case "name":
        list.sort((a, b) => a.fullName.localeCompare(b.fullName));
        break;
      case "orders":
        list.sort((a, b) => b.totalOrders - a.totalOrders);
        break;
      case "spent":
        list.sort((a, b) => b.totalSpent - a.totalSpent);
        break;
      case "recent":
      default:
        list.sort(
          (a, b) =>
            new Date(b.lastOrderDate).getTime() -
            new Date(a.lastOrderDate).getTime(),
        );
        break;
    }

    return list;
  }, [customers, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
          {t.customers}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          {lang === "bn"
            ? `মোট ${customers.length} জন কাস্টমার`
            : `${customers.length} total customers`}
        </p>
      </div>

      {/* Filters */}
      <CustomersFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={filtered.length}
      />

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-16 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <FiUsers className="w-10 h-10 text-slate-400" />
          </div>
          <p className="text-slate-600 font-semibold">
            {lang === "bn" ? "কোনো কাস্টমার নেই" : "No customers found"}
          </p>
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
          {filtered.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}
    </div>
  );
}
