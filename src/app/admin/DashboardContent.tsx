"use client";

import { FiTrendingUp } from "react-icons/fi";
import { useLanguage } from "@/components/admin/LanguageProvider";
import StatCard from "@/components/admin/StatCard";
import RecentOrders from "@/components/admin/RecentOrders";
import { DashboardStats, DailyOrderCount } from "@/lib/dashboard";
import { WooOrder } from "@/lib/orders";

interface DashboardContentProps {
  stats: DashboardStats;
  daily: DailyOrderCount[];
  recent: WooOrder[];
}

export default function DashboardContent({
  stats,
  daily,
  recent,
}: DashboardContentProps) {
  const { t, lang } = useLanguage();

  const maxCount = Math.max(...daily.map((d) => d.count), 1);

  // Format currency with language-aware numeral
  const formatCurrency = (n: number) =>
    `৳${n.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}`;

  const formatNumber = (n: number) =>
    n.toLocaleString(lang === "bn" ? "bn-BD" : "en-US");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
          {t.dashboard}
        </h1>
        <p className="text-slate-500 mt-1 text-sm">{t.dashboardSubtitle}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label={t.totalOrders}
          value={stats.totalOrders}
          iconName="shoppingBag"
          accentColor="indigo"
          subtitle={`${t.today} ${formatNumber(stats.todayOrders)}`}
        />
        <StatCard
          label={t.pendingOrders}
          value={stats.pendingOrders}
          iconName="clock"
          accentColor="amber"
          subtitle={t.awaitingConfirmation}
        />
        <StatCard
          label={t.confirmedOrders}
          value={stats.processingOrders + stats.shippedOrders}
          iconName="checkCircle"
          accentColor="violet"
          subtitle={`${t.shipped}: ${formatNumber(stats.shippedOrders)}`}
        />
        <StatCard
          label={t.totalRevenue}
          value={stats.totalRevenue}
          iconName="dollarSign"
          accentColor="emerald"
          format="currency"
          subtitle={`${t.todayRevenue} ${formatCurrency(stats.todayRevenue)}`}
        />
      </div>

      {/* Chart + Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FiTrendingUp className="text-indigo-500" />
                {t.weeklyOrders}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t.weeklyOrdersSubtitle}
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-48">
            {daily.map((d, i) => {
              const heightPct = (d.count / maxCount) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  <div className="relative w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-indigo-500 to-indigo-300 transition-all duration-500 group-hover:from-indigo-600 group-hover:to-indigo-400 relative"
                      style={{
                        height: `${Math.max(heightPct, 4)}%`,
                        minHeight: "8px",
                      }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition">
                        {formatNumber(d.count)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium text-center">
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">
            {t.quickStats}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/60">
              <span className="text-sm text-slate-600">
                {t.avgOrderValue}
              </span>
              <span className="font-bold text-slate-900">
                {formatCurrency(stats.avgOrderValue)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/60">
              <span className="text-sm text-slate-600">
                {t.completedOrders}
              </span>
              <span className="font-bold text-emerald-600">
                {formatNumber(stats.completedOrders)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/60">
              <span className="text-sm text-slate-600">{t.shipped}</span>
              <span className="font-bold text-indigo-600">
                {formatNumber(stats.shippedOrders)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/60">
              <span className="text-sm text-slate-600">
                {t.cancelledOrders}
              </span>
              <span className="font-bold text-red-600">
                {formatNumber(stats.cancelledOrders)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={recent} />
    </div>
  );
}