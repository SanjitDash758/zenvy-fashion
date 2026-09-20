"use client";

import { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiTrendingUp,
  FiPackage,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

const ICON_MAP = {
  shoppingBag: FiShoppingBag,
  clock: FiClock,
  checkCircle: FiCheckCircle,
  dollarSign: FiDollarSign,
  trendingUp: FiTrendingUp,
  package: FiPackage,
  truck: FiTruck,
  xCircle: FiXCircle,
} as const;

export type StatIconName = keyof typeof ICON_MAP;

interface StatCardProps {
  label: string;
  value: number;
  iconName: StatIconName;
  accentColor: string;
  format?: "number" | "currency";
  subtitle?: string;
}

export default function StatCard({
  label,
  value,
  iconName,
  accentColor,
  format = "number",
  subtitle,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  const Icon = ICON_MAP[iconName];

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  // ===== Indigo Color Palette =====
  const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
    indigo: {
      bg: "from-indigo-400/30 to-indigo-200/20",
      text: "text-indigo-600",
      glow: "shadow-indigo-300/40",
    },
    violet: {
      bg: "from-violet-400/30 to-violet-200/20",
      text: "text-violet-600",
      glow: "shadow-violet-300/40",
    },
    cyan: {
      bg: "from-cyan-400/30 to-cyan-200/20",
      text: "text-cyan-600",
      glow: "shadow-cyan-300/40",
    },
    emerald: {
      bg: "from-emerald-400/30 to-emerald-200/20",
      text: "text-emerald-600",
      glow: "shadow-emerald-300/40",
    },
    amber: {
      bg: "from-amber-400/30 to-amber-200/20",
      text: "text-amber-600",
      glow: "shadow-amber-300/40",
    },
  };

  const colors = colorMap[accentColor] || colorMap.indigo;

  const formatted =
    format === "currency"
      ? `৳${displayValue.toLocaleString("bn-BD")}`
      : displayValue.toLocaleString("bn-BD");

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl bg-white/60 border border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${colors.glow}`}
    >
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${colors.bg} blur-2xl`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
            {label}
          </span>
          <div className="w-10 h-10 rounded-2xl bg-white/80 backdrop-blur flex items-center justify-center shadow-sm">
            <Icon className={`w-5 h-5 ${colors.text}`} />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className={`text-3xl md:text-4xl font-black ${colors.text}`}>
            {formatted}
          </span>
        </div>

        {subtitle && (
          <p className="text-xs text-slate-500 mt-2 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
