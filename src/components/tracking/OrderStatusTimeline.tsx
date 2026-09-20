"use client";

import {
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiXCircle,
} from "react-icons/fi";

interface OrderStatusTimelineProps {
  currentStatus: string;
  dateCreated: string;
  dateModified: string;
}

const STEPS = [
  {
    key: "pending",
    labelBn: "অর্ডার গ্রহণ",
    labelEn: "Order Placed",
    description: "আপনার অর্ডার আমরা পেয়েছি",
    icon: FiClock,
  },
  {
    key: "processing",
    labelBn: "কনফার্মড",
    labelEn: "Confirmed",
    description: "আমাদের টিম অর্ডারটি কনফার্ম করেছে",
    icon: FiCheckCircle,
  },
  {
    key: "shipped",
    labelBn: "শিপড",
    labelEn: "Shipped",
    description: "কুরিয়ারে পাঠানো হয়েছে",
    icon: FiTruck,
  },
  {
    key: "completed",
    labelBn: "ডেলিভারড",
    labelEn: "Delivered",
    description: "আপনার হাতে পৌঁছে দেওয়া হয়েছে",
    icon: FiPackage,
  },
];

export default function OrderStatusTimeline({
  currentStatus,
  dateCreated,
  dateModified,
}: OrderStatusTimelineProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStatus);
  const isCancelled = ["cancelled", "refunded", "failed"].includes(
    currentStatus,
  );

  const formatDate = (iso: string) => {
    try {
      const normalized =
        iso.endsWith("Z") || iso.includes("+") ? iso : `${iso}Z`;
      return new Date(normalized).toLocaleString("bn-BD", {
        timeZone: "Asia/Dhaka",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  if (isCancelled) {
    return (
      <div className="backdrop-blur-xl bg-red-50/80 rounded-3xl border border-red-200 shadow-lg p-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
            <FiXCircle size={28} />
          </div>
          <div>
            <h3
              className="text-2xl font-bold text-red-700"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              অর্ডার বাতিল হয়েছে
            </h3>
            <p className="text-sm text-red-600 mt-1">
              {formatDate(dateModified)} তারিখে বাতিল করা হয়েছে
            </p>
            <p className="text-xs text-red-500 mt-2">
              বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন: 01974-164273
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 shadow-lg p-8">
      <h3
        className="text-2xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        অর্ডারের অবস্থা
      </h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-rose-100" />

        <div className="space-y-8">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div key={step.key} className="relative flex items-start gap-5">
                {/* Icon */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isCompleted
                      ? isCurrent
                        ? "bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30"
                        : "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon size={20} />
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-30" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1.5 flex-1">
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <h4
                      className={`font-bold text-base ${
                        isCompleted ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.labelBn}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        চলমান
                      </span>
                    )}
                    {isCompleted && !isCurrent && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        সম্পন্ন
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-0.5 ${
                      isCompleted ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>
                  {idx === 0 && isCompleted && (
                    <p className="text-xs text-rose-600 mt-1.5 font-medium">
                      📅 {formatDate(dateCreated)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
