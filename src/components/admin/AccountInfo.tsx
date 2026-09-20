"use client";

import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";
import { AdminUser } from "@/lib/types";

export default function AccountInfo() {
  const { lang } = useLanguage();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((data) => {
        console.log("🔵 /api/admin/me response:", data);
        if (data.user) {
          console.log("🔵 last_login:", data.user.last_login);
          console.log("🔵 created_at:", data.user.created_at);
          setUser(data.user);
        }
      })
      .catch((err) => console.error("❌ me error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-[#E8748A]/60 via-[#D4A574]/30 to-[#E8748A]/60 p-[1px]">
        <div className="rounded-[11px] bg-[#111114] p-10 flex items-center justify-center h-64">
          <FiLoader className="animate-spin text-[#E8748A]" size={20} />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const roleLabels: Record<string, { bn: string; en: string }> = {
    admin: { bn: "অ্যাডমিন", en: "Admin" },
    manager: { bn: "ম্যানেজার", en: "Manager" },
    viewer: { bn: "ভিউয়ার", en: "Viewer" },
  };

  const roleStyles: Record<string, string> = {
    admin: "text-[#E8748A] bg-[#E8748A]/10 border-[#E8748A]/30",
    manager: "text-[#D4A574] bg-[#D4A574]/10 border-[#D4A574]/30",
    viewer: "text-[#8B8580] bg-[#8B8580]/10 border-[#8B8580]/30",
  };

  // ============================================
  // Safe date formatter — handles null, undefined,
  // and Supabase's various ISO 8601 formats
  // ============================================
  const formatSafeDate = (
    dateStr: string | null | undefined,
    options: Intl.DateTimeFormatOptions,
  ): string => {
    if (!dateStr) return "—";
    try {
      // Supabase may return dates like:
      //   "2026-09-20T07:40:59.847182+00:00" (with timezone)
      //   "2026-09-20T07:40:59.847182+00"    (with +00)
      //   "2026-09-20T07:40:59.847182"       (no timezone — assume UTC)
      //   "2026-09-20T07:40:59.847182Z"      (with Z)
      let normalized = dateStr;

      // Already has timezone info? Leave as-is.
      const hasTimezone =
        dateStr.endsWith("Z") ||
        /[+-]\d{2}:?\d{2}$/.test(dateStr) ||
        dateStr.includes("+");

      if (!hasTimezone) {
        // If it has microseconds (6 digits after .), truncate to 3 (milliseconds)
        normalized = dateStr.replace(/\.(\d{3})\d+/, ".$1");
        // Append Z to mark as UTC
        normalized = `${normalized}Z`;
      } else {
        // Also truncate microseconds if present
        normalized = dateStr.replace(/\.(\d{3})\d+/, ".$1");
      }

      const d = new Date(normalized);
      if (isNaN(d.getTime())) {
        console.warn("Invalid date after parsing:", dateStr, "→", normalized);
        return "—";
      }

      return d.toLocaleString(lang === "bn" ? "bn-BD" : "en-US", {
        timeZone: "Asia/Dhaka",
        ...options,
      });
    } catch (err) {
      console.error("Date format error:", err);
      return "—";
    }
  };

  const lastLogin = formatSafeDate(user.last_login, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const created = formatSafeDate(user.created_at, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Password age
  const daysSincePasswordChange = (() => {
    if (!user.created_at) return 0;
    try {
      let normalized = user.created_at;
      const hasTimezone =
        normalized.endsWith("Z") ||
        /[+-]\d{2}:?\d{2}$/.test(normalized) ||
        normalized.includes("+");
      if (!hasTimezone) {
        normalized = normalized.replace(/\.(\d{3})\d+/, ".$1");
        normalized = `${normalized}Z`;
      } else {
        normalized = normalized.replace(/\.(\d{3})\d+/, ".$1");
      }
      const d = new Date(normalized);
      if (isNaN(d.getTime())) return 0;
      return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
    } catch {
      return 0;
    }
  })();

  const passwordAgeText =
    lang === "bn"
      ? `${daysSincePasswordChange} দিন আগে পরিবর্তন`
      : `Changed ${daysSincePasswordChange} days ago`;

  const passwordAgePercent = Math.min(
    (daysSincePasswordChange / 90) * 100,
    100,
  );

  const isOld = daysSincePasswordChange > 60;

  const initial = user.display_name?.[0]?.toUpperCase() || "?";

  return (
    <div className="relative rounded-xl bg-gradient-to-br from-[#E8748A]/60 via-[#D4A574]/30 to-[#E8748A]/60 p-[1px]">
      <div className="rounded-[11px] bg-[#111114] relative overflow-hidden">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#E8748A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-6">
          {/* Avatar + Name */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E8748A] to-[#D4A574] flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-[#E8748A]/20">
                {initial}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#0A0A0B] flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#3ECF8E] shadow-lg shadow-[#3ECF8E]/50" />
              </div>
            </div>

            <h3
              className="text-2xl font-semibold text-[#F5F3F0] mt-4 italic"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {user.display_name}
            </h3>
            <p className="text-xs text-[#6B6660] mt-1">@{user.username}</p>

            <span
              className={`inline-flex items-center mt-3 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                roleStyles[user.role] || roleStyles.viewer
              }`}
            >
              {roleLabels[user.role]?.[lang] || user.role}
            </span>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#2A2A2E] to-transparent mb-5" />

          {/* Info Rows */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#6B6660] font-semibold">
                {lang === "bn" ? "শেষ লগইন" : "Last login"}
              </span>
              <span className="text-xs text-[#F5F3F0] font-medium">
                {lastLogin}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#6B6660] font-semibold">
                {lang === "bn" ? "অ্যাকাউন্ট তৈরি" : "Created"}
              </span>
              <span className="text-xs text-[#F5F3F0] font-medium">
                {created}
              </span>
            </div>
          </div>

          {/* Password Age Meter */}
          <div className="mt-5 pt-5 border-t border-[#2A2A2E]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-[#6B6660] font-semibold">
                {lang === "bn" ? "পাসওয়ার্ড বয়স" : "Password age"}
              </span>
              <span
                className={`text-[10px] font-bold ${
                  isOld ? "text-[#E8748A]" : "text-[#3ECF8E]"
                }`}
              >
                {passwordAgeText}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-[#0A0A0B] overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 rounded-full ${
                  isOld
                    ? "bg-gradient-to-r from-[#E8748A] to-red-500"
                    : "bg-gradient-to-r from-[#3ECF8E] to-[#D4A574]"
                }`}
                style={{ width: `${passwordAgePercent}%` }}
              />
            </div>
            {isOld && (
              <p className="text-[10px] text-[#E8748A] mt-2 font-medium">
                {lang === "bn"
                  ? "⚠️ পাসওয়ার্ড পরিবর্তনের সময় হয়ে গেছে"
                  : "⚠️ Time to update your password"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
