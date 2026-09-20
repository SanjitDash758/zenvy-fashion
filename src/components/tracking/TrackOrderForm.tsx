"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch, FiLoader, FiAlertCircle } from "react-icons/fi";

interface TrackOrderFormProps {
  onResult: (order: any) => void;
  onError: (message: string) => void;
}

export default function TrackOrderForm({
  onResult,
  onError,
}: TrackOrderFormProps) {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill from URL params
  useEffect(() => {
    const orderParam = searchParams.get("order");
    const phoneParam = searchParams.get("phone");
    if (orderParam) setOrderNumber(orderParam);
    if (phoneParam) setPhone(phoneParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    onError("");

    if (!orderNumber.trim()) {
      setError("অর্ডার নম্বর দিন");
      return;
    }

    if (!phone.trim() || phone.length < 10) {
      setError("সঠিক ফোন নম্বর দিন (কমপক্ষে ১১ ডিজিট)");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, phone }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errMsg = data.error || "অর্ডার খুঁজে পাওয়া যায়নি";
        setError(errMsg);
        onError(errMsg);
        setLoading(false);
        return;
      }

      onResult(data.order);
      setLoading(false);
    } catch (err) {
      console.error(err);
      const errMsg = "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন";
      setError(errMsg);
      onError(errMsg);
      setLoading(false);
    }
  };

  return (
    <div
      className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-8"
      style={{
        boxShadow:
          "0 20px 60px rgba(232, 116, 138, 0.1), 0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-6">
        <h2
          className="text-3xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          আপনার অর্ডার ট্র্যাক করুন
        </h2>
        <p className="text-sm text-gray-500">
          অর্ডার নম্বর এবং ফোন নম্বর দিয়ে অর্ডারের অবস্থা জানুন
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Order Number */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
            অর্ডার নম্বর
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
              #
            </span>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="যেমন: 279"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border-2 border-rose-100 focus:border-rose-400 focus:outline-none text-gray-900 font-medium transition"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
            ফোন নম্বর
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              📞
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border-2 border-rose-100 focus:border-rose-400 focus:outline-none text-gray-900 font-medium transition"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            <FiAlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={18} />
              খোঁজা হচ্ছে...
            </>
          ) : (
            <>
              <FiSearch size={18} />
              অর্ডার খুঁজুন
            </>
          )}
        </button>
      </form>

      {/* Help Text */}
      <div className="mt-6 pt-5 border-t border-rose-100 text-center">
        <p className="text-xs text-gray-500">
          অর্ডার নম্বর জানা নেই?{" "}
          <a
            href="tel:+8801974164273"
            className="font-semibold text-rose-600 hover:text-rose-700"
          >
            01974-164273
          </a>{" "}
          নম্বরে কল করুন
        </p>
      </div>
    </div>
  );
}
