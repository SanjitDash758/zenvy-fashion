"use client";

import {
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiXCircle,
} from "react-icons/fi";
import { useLanguage } from "./LanguageProvider";
import { OrderNote } from "@/lib/orders";

interface OrderTimelineProps {
  currentStatus: string;
  dateCreated: string;
  dateModified: string;
  notes: OrderNote[];
}

export default function OrderTimeline({
  currentStatus,
  dateCreated,
  dateModified,
  notes,
}: OrderTimelineProps) {
  const { lang } = useLanguage();

  const steps = [
    {
      key: "pending",
      labelBn: "অর্ডার গ্রহণ",
      labelEn: "Order Placed",
      icon: FiClock,
    },
    {
      key: "processing",
      labelBn: "কনফার্মড",
      labelEn: "Confirmed",
      icon: FiCheckCircle,
    },
    {
      key: "shipped",
      labelBn: "শিপড",
      labelEn: "Shipped",
      icon: FiTruck,
    },
    {
      key: "completed",
      labelBn: "সম্পন্ন",
      labelEn: "Delivered",
      icon: FiPackage,
    },
  ];

  const currentIndex = steps.findIndex((s) => s.key === currentStatus);
  const isCancelled = currentStatus === "cancelled";

  const formatDate = (iso: string) => {
    // WooCommerce returns time in UTC but without the "Z" suffix.
    // We add "Z" to tell JavaScript it's UTC, then convert to Dhaka time.
    const utcString = iso.endsWith("Z") ? iso : `${iso}Z`;
    const date = new Date(utcString);

    return date.toLocaleString(lang === "bn" ? "bn-BD" : "en-US", {
      timeZone: "Asia/Dhaka",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  /**
   * Find the timestamp when the order transitioned to a specific status.
   * WooCommerce adds an order note each time status changes.
   * We look for notes that mention the status change.
   */
  const getStatusDate = (statusKey: string): string | null => {
    // Pending is always the initial state — use date_created
    if (statusKey === "pending") {
      return dateCreated;
    }

    // Map status keys to WooCommerce status strings
    const statusMap: Record<string, string[]> = {
      processing: ["processing", "প্রসেসিং"],
      shipped: ["shipped"],
      completed: ["completed"],
    };

    const keywords = statusMap[statusKey] || [statusKey];

    // Find the earliest matching note
    const matchingNotes = notes.filter((note) => {
      const lower = note.note.toLowerCase();
      return keywords.some((kw) => lower.includes(kw.toLowerCase()));
    });

    if (matchingNotes.length > 0) {
      // Sort by date ascending and take the earliest match
      const sorted = [...matchingNotes].sort(
        (a, b) =>
          new Date(a.date_created).getTime() -
          new Date(b.date_created).getTime(),
      );
      return sorted[0].date_created;
    }

    // Fallback: if no note found but status is current, use date_modified
    if (statusKey === currentStatus) {
      return dateModified;
    }

    return null;
  };

  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">
        {lang === "bn" ? "অর্ডার ইতিহাস" : "Order Timeline"}
      </h2>

      {isCancelled ? (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50 border border-red-200">
          <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
            <FiXCircle size={20} />
          </div>
          <div>
            <p className="font-semibold text-red-700">
              {lang === "bn" ? "বাতিল হয়েছে" : "Cancelled"}
            </p>
            <p className="text-xs text-red-500 mt-1">
              {formatDate(dateModified)}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-slate-200" />

          <div className="space-y-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx <= currentIndex;
              const isCurrent = idx === currentIndex;

              const stepDate = isCompleted ? getStatusDate(step.key) : null;

              return (
                <div key={step.key} className="relative flex items-start gap-4">
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isCompleted
                        ? isCurrent
                          ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30"
                          : "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Icon size={18} />
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-30" />
                    )}
                  </div>
                  <div className="pt-2">
                    <p
                      className={`font-semibold text-sm ${
                        isCompleted ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {lang === "bn" ? step.labelBn : step.labelEn}
                    </p>
                    {stepDate && (
                      <p
                        className={`text-xs mt-1 ${
                          isCurrent
                            ? "text-indigo-600 font-medium"
                            : "text-slate-500"
                        }`}
                      >
                        {isCurrent && (
                          <>
                            {lang === "bn" ? "সর্বশেষ আপডেট" : "Last updated"}{" "}
                            ·{" "}
                          </>
                        )}
                        {formatDate(stepDate)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
