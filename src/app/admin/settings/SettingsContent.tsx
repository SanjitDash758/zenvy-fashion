"use client";

import {
  FiExternalLink,
  FiGlobe,
  FiShoppingBag,
  FiLogOut,
  FiCommand,
  FiZap,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/admin/LanguageProvider";
import AccountInfo from "@/components/admin/AccountInfo";
import PasswordChangeForm from "@/components/admin/PasswordChangeForm";
import NotificationTest from "@/components/admin/NotificationTest";

export default function SettingsContent() {
  const router = useRouter();
  const { t, lang } = useLanguage();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const wpAdminUrl = process.env.NEXT_PUBLIC_WP_URL
    ? `${process.env.NEXT_PUBLIC_WP_URL}/wp-admin`
    : "http://localhost:8080/wp-admin";

  const storeUrl = process.env.NEXT_PUBLIC_WP_URL || "http://localhost:8080";

  return (
    <div className="min-h-screen bg-[#0A0A0B] relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8748A]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Page Header */}
        {/* <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold italic text-[#F5F3F0] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {t.settings}
          </h1>
          {/* <p className="text-sm text-[#8B8580] mt-2">
            {lang === "bn"
              ? "আপনার অ্যাকাউন্ট ও সিস্টেম সেটিংস"
              : "Your account & system settings"}
          </p> 
        </div>  */}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5">
            <AccountInfo />

            {/* Quick Links — New border style */}
            <div className="relative rounded-xl bg-gradient-to-br from-[#E8748A]/60 via-[#D4A574]/30 to-[#E8748A]/60 p-[1px]">
              <div className="rounded-[11px] bg-[#111114] p-5">
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#D4A574] mb-4 flex items-center gap-2">
                  <FiZap size={12} />
                  {lang === "bn" ? "দ্রুত লিংক" : "Quick Links"}
                </h2>

                <div className="space-y-2">
                  <a
                    href={wpAdminUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-lg bg-[#0A0A0B] border border-[#2A2A2E] hover:border-[#E8748A]/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E8748A]/10 flex items-center justify-center group-hover:bg-[#E8748A]/20 transition">
                        <FiShoppingBag className="text-[#E8748A]" size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#F5F3F0]">
                          {lang === "bn"
                            ? "ওয়ার্ডপ্রেস অ্যাডমিন"
                            : "WordPress Admin"}
                        </p>
                        <p className="text-[10px] text-[#6B6660]">wp-admin</p>
                      </div>
                    </div>
                    <FiExternalLink
                      className="text-[#6B6660] group-hover:text-[#E8748A] transition"
                      size={14}
                    />
                  </a>

                  <a
                    href={storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-lg bg-[#0A0A0B] border border-[#2A2A2E] hover:border-[#D4A574]/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#D4A574]/10 flex items-center justify-center group-hover:bg-[#D4A574]/20 transition">
                        <FiGlobe className="text-[#D4A574]" size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#F5F3F0]">
                          {lang === "bn" ? "স্টোর ওয়েবসাইট" : "Store Website"}
                        </p>
                        <p className="text-[10px] text-[#6B6660]">
                          {storeUrl
                            .replace("http://", "")
                            .replace("https://", "")}
                        </p>
                      </div>
                    </div>
                    <FiExternalLink
                      className="text-[#6B6660] group-hover:text-[#D4A574] transition"
                      size={14}
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Keyboard Hint */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#111114]/60 border border-[#2A2A2E]">
              <FiCommand size={12} className="text-[#6B6660]" />
              <p className="text-[11px] text-[#6B6660]">
                {lang === "bn"
                  ? "দ্রুত যেকোনো সেটিংসে যেতে Ctrl+K চাপুন"
                  : "Press Ctrl+K to quickly access any setting"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 space-y-5">
            <PasswordChangeForm />
            <NotificationTest />

            {/* Danger Zone — New border style */}
            <div className="relative rounded-xl bg-gradient-to-br from-red-500/60 via-red-700/30 to-red-500/60 p-[1px]">
              <div className="rounded-[11px] bg-[#111114] p-5">
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-red-400 mb-4 flex items-center gap-2">
                  <FiLogOut size={12} />
                  {lang === "bn" ? "বিপদ অঞ্চল" : "Danger Zone"}
                </h2>

                <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#0A0A0B] border border-red-900/20">
                  <div>
                    <p className="text-sm font-semibold text-[#F5F3F0]">
                      {lang === "bn" ? "লগআউট" : "Logout"}
                    </p>
                    <p className="text-[11px] text-[#6B6660] mt-0.5">
                      {lang === "bn"
                        ? "আপনার সেশন থেকে বেরিয়ে যান"
                        : "Sign out from your session"}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500 hover:text-white transition-all"
                  >
                    <FiLogOut size={12} />
                    {lang === "bn" ? "লগআউট" : "Logout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
