"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiXCircle,
  FiLoader,
} from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";

interface OrderStatusActionsProps {
  orderId: number;
  currentStatus: string;
}

interface StatusAction {
  status: string;
  labelBn: string;
  labelEn: string;
  icon: typeof FiCheckCircle;
  gradient: string;
  shadow: string;
}

const ACTIONS: StatusAction[] = [
  {
    status: "processing",
    labelBn: "কনফার্ম করুন",
    labelEn: "Confirm",
    icon: FiCheckCircle,
    gradient: "from-indigo-500 to-violet-600",
    shadow: "shadow-indigo-500/30",
  },
  {
    status: "shipped",
    labelBn: "কুরিয়ারে পাঠান",
    labelEn: "Ship",
    icon: FiTruck,
    gradient: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/30",
  },
  {
    status: "completed",
    labelBn: "ডেলিভারড",
    labelEn: "Delivered",
    icon: FiPackage,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/30",
  },
];

export default function OrderStatusActions({
  orderId,
  currentStatus,
}: OrderStatusActionsProps) {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleUpdate = async (newStatus: string) => {
    setError("");
    setLoading(newStatus);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to update");
        setLoading(null);
        return;
      }

      router.refresh();
      setLoading(null);
    } catch (err) {
      console.error(err);
      setError(lang === "bn" ? "সার্ভারে সমস্যা" : "Server error");
      setLoading(null);
    }
  };

  const handleCancel = async () => {
    const confirmed = window.confirm(
      lang === "bn"
        ? "আপনি কি সত্যিই এই অর্ডারটি বাতিল করতে চান?"
        : "Are you sure you want to cancel this order?",
    );
    if (!confirmed) return;
    await handleUpdate("cancelled");
  };

  // Show only the "next" action + optional cancel
  const currentIndex = ACTIONS.findIndex((a) => a.status === currentStatus);

  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        {lang === "bn" ? "অ্যাকশন" : "Actions"}
      </h2>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {ACTIONS.map((action, idx) => {
          const Icon = action.icon;
          const isCurrent = currentStatus === action.status;
          const isCompleted = currentIndex > idx;
          const isNext =
            currentIndex === idx - 1 && !isCompleted && currentIndex !== -1;

          // Hide completed steps
          if (isCompleted) return null;

          return (
            <button
              key={action.status}
              onClick={() => handleUpdate(action.status)}
              disabled={!!loading || isCurrent}
              className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl font-semibold transition-all ${
                isCurrent
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-dashed border-slate-300"
                  : `bg-gradient-to-r ${action.gradient} text-white shadow-lg ${action.shadow} hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`
              } disabled:opacity-60`}
            >
              <div className="flex items-center gap-3">
                {loading === action.status ? (
                  <FiLoader className="animate-spin" size={20} />
                ) : (
                  <Icon size={20} />
                )}
                <span>
                  {lang === "bn" ? action.labelBn : action.labelEn}
                </span>
              </div>
              {isCurrent && (
                <span className="text-xs font-bold uppercase">
                  {lang === "bn" ? "বর্তমান" : "Current"}
                </span>
              )}
            </button>
          );
        })}

        {/* Cancel */}
        {currentStatus !== "cancelled" && currentStatus !== "completed" && (
          <button
            onClick={handleCancel}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl font-semibold bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 transition disabled:opacity-60"
          >
            {loading === "cancelled" ? (
              <FiLoader className="animate-spin" size={18} />
            ) : (
              <FiXCircle size={18} />
            )}
            {lang === "bn" ? "অর্ডার বাতিল" : "Cancel Order"}
          </button>
        )}
      </div>
    </div>
  );
}