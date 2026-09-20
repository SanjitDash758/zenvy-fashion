"use client";

import { useState, useEffect } from "react";
import { FiSend, FiLoader } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";

export default function NotificationTest() {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const [message, setMessage] = useState("");
  const [lastSent, setLastSent] = useState<number | null>(null);

  // Update relative time every 30 seconds
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/test-telegram", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        setResult("success");
        setMessage(
          lang === "bn" ? "টেস্ট মেসেজ পাঠানো হয়েছে!" : "Test message sent!",
        );
        setLastSent(Date.now());
      } else {
        setResult("error");
        setMessage(
          data.error ||
            (lang === "bn" ? "মেসেজ পাঠানো ব্যর্থ" : "Failed to send"),
        );
      }
    } catch {
      setResult("error");
      setMessage(lang === "bn" ? "সার্ভারে সমস্যা" : "Server error");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setResult(null);
        setMessage("");
      }, 5000);
    }
  };

  const getRelativeTime = () => {
    if (!lastSent) return null;
    const diff = Math.floor((now - lastSent) / 1000);
    if (diff < 60) return lang === "bn" ? "এইমাত্র" : "Just now";
    const mins = Math.floor(diff / 60);
    if (mins < 60) return lang === "bn" ? `${mins} মিনিট আগে` : `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    return lang === "bn" ? `${hours} ঘণ্টা আগে` : `${hours}h ago`;
  };

  const relativeTime = getRelativeTime();

  return (
    <div className="relative rounded-xl bg-gradient-to-br from-[#D4A574]/60 via-[#E8748A]/30 to-[#D4A574]/60 p-[1px]">
      <div className="rounded-[11px] bg-[#111114] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-[#D4A574]/10 border border-[#D4A574]/20 flex items-center justify-center">
              <span className="text-[#D4A574] text-lg">📱</span>
              {/* Pulsing status dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3ECF8E] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3ECF8E]" />
              </span>
            </div>
            <div>
              <h2
                className="text-lg font-semibold text-[#F5F3F0] italic"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {lang === "bn"
                  ? "টেলিগ্রাম নোটিফিকেশন"
                  : "Telegram Notification"}
              </h2>
              <p className="text-[11px] text-[#6B6660]">
                {relativeTime
                  ? lang === "bn"
                    ? `শেষ মেসেজ ${relativeTime}`
                    : `Last sent ${relativeTime}`
                  : lang === "bn"
                    ? "স্ট্যাটাস: সক্রিয়"
                    : "Status: Active"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-4 p-3.5 rounded-lg bg-[#0A0A0B] border border-[#2A2A2E]">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#F5F3F0]">
              {lang === "bn"
                ? "নোটিফিকেশন সিস্টেম পরীক্ষা করুন"
                : "Test the notification system"}
            </p>
            <p className="text-[10px] text-[#6B6660] mt-0.5">
              {lang === "bn"
                ? "আপনার টেলিগ্রামে একটি টেস্ট মেসেজ পাঠানো হবে"
                : "A test message will be sent to your Telegram"}
            </p>
          </div>
          <button
            onClick={handleTest}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4A574] to-[#E8748A] text-white text-xs font-semibold shadow-lg shadow-[#D4A574]/20 hover:shadow-xl hover:shadow-[#D4A574]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" size={12} />
                {lang === "bn" ? "পাঠানো..." : "Sending..."}
              </>
            ) : (
              <>
                <FiSend size={12} />
                {lang === "bn" ? "টেস্ট পাঠান" : "Send Test"}
              </>
            )}
          </button>
        </div>

        {/* Success Message */}
        {result === "success" && (
          <div className="mt-3 flex items-start gap-2 px-3.5 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            <span className="font-semibold">✓</span>
            <span>{message}</span>
          </div>
        )}

        {/* Error Message */}
        {result === "error" && (
          <div className="mt-3 flex items-start gap-2 px-3.5 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            <span className="font-semibold">⚠</span>
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
