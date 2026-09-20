"use client";

import { useState } from "react";
import { FiEye, FiEyeOff, FiLoader, FiLock } from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";

export default function PasswordChangeForm() {
  const { lang } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2)
      return {
        score: 33,
        label: lang === "bn" ? "দুর্বল" : "Weak",
        color: "#EF4444",
      };
    if (score === 3 || score === 4)
      return {
        score: 66,
        label: lang === "bn" ? "মাঝারি" : "Medium",
        color: "#D4A574",
      };
    return {
      score: 100,
      label: lang === "bn" ? "শক্তিশালী" : "Strong",
      color: "#3ECF8E",
    };
  };

  const strength = newPassword ? getStrength(newPassword) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword.length < 8) {
      setError(
        lang === "bn"
          ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
          : "Password must be at least 8 characters",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        lang === "bn"
          ? "নতুন ও কনফার্ম পাসওয়ার্ড মিলছে না"
          : "Passwords do not match",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError(lang === "bn" ? "সার্ভারে সমস্যা" : "Server error");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 pr-10 rounded-lg bg-[#0A0A0B] border border-[#2A2A2E] text-sm text-[#F5F3F0] placeholder:text-[#4A4540] focus:outline-none focus:border-[#E8748A]/60 focus:ring-2 focus:ring-[#E8748A]/10 transition-all";

  const labelClass =
    "block text-[11px] font-semibold uppercase tracking-wider text-[#6B6660] mb-2";

  return (
    <div className="relative rounded-xl bg-gradient-to-br from-[#E8748A]/60 via-[#D4A574]/30 to-[#E8748A]/60 p-[1px]">
      <div className="rounded-[11px] bg-[#111114] p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#E8748A]/10 border border-[#E8748A]/20 flex items-center justify-center">
            <FiLock className="text-[#E8748A]" size={16} />
          </div>
          <div>
            <h2
              className="text-lg font-semibold text-[#F5F3F0] italic"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {lang === "bn" ? "পাসওয়ার্ড পরিবর্তন" : "Change Password"}
            </h2>
            <p className="text-[11px] text-[#6B6660]">
              {lang === "bn"
                ? "নিয়মিত পাসওয়ার্ড পরিবর্তন করুন"
                : "Update your password regularly"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>
              {lang === "bn" ? "বর্তমান পাসওয়ার্ড" : "Current Password"}
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6660] hover:text-[#E8748A] transition"
                tabIndex={-1}
              >
                {showCurrent ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                {lang === "bn" ? "নতুন পাসওয়ার্ড" : "New Password"}
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6660] hover:text-[#E8748A] transition"
                  tabIndex={-1}
                >
                  {showNew ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>

              {strength && (
                <div className="mt-2">
                  <div className="h-1 rounded-full bg-[#0A0A0B] overflow-hidden">
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${strength.score}%`,
                        backgroundColor: strength.color,
                      }}
                    />
                  </div>
                  <p
                    className="text-[10px] font-semibold mt-1"
                    style={{ color: strength.color }}
                  >
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className={labelClass}>
                {lang === "bn" ? "কনফার্ম পাসওয়ার্ড" : "Confirm Password"}
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6660] hover:text-[#E8748A] transition"
                  tabIndex={-1}
                >
                  {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <span className="font-semibold">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="font-semibold">✓</span>
              <span>
                {lang === "bn"
                  ? "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!"
                  : "Password changed successfully!"}
              </span>
            </div>
          )}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#E8748A] to-[#D4A574] text-white text-sm font-semibold shadow-lg shadow-[#E8748A]/20 hover:shadow-xl hover:shadow-[#E8748A]/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" size={14} />
                  {lang === "bn" ? "আপডেট হচ্ছে..." : "Updating..."}
                </>
              ) : (
                <>
                  <FiLock size={14} />
                  {lang === "bn" ? "পাসওয়ার্ড আপডেট করুন" : "Update Password"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}