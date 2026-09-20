"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import TrackOrderForm from "@/components/tracking/TrackOrderForm";
import OrderTrackingResult from "@/components/tracking/OrderTrackingResult";

export default function TrackOrderPage() {
  const [order, setOrder] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleResult = (result: any) => {
    setOrder(result);
    setError("");
  };

  const handleError = (message: string) => {
    setError(message);
    if (message) setOrder(null);
  };

  const handleReset = () => {
    setOrder(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50/40 via-amber-50/30 to-rose-50/40 py-16">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-rose-600 transition mb-8"
          >
            <FiArrowLeft size={16} />
            হোমে ফিরে যান
          </Link>

          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              অর্ডার <span className="text-rose-600 italic">ট্র্যাকিং</span>
            </h1>
            <p className="text-gray-600">আপনার অর্ডারের সর্বশেষ অবস্থা জানুন</p>
          </div>

          {/* Content */}
          {!order ? (
            <TrackOrderForm onResult={handleResult} onError={handleError} />
          ) : (
            <div className="space-y-6">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-rose-600 transition"
              >
                <FiArrowLeft size={14} />
                অন্য অর্ডার খুঁজুন
              </button>
              <OrderTrackingResult order={order} />
            </div>
          )}
        </div>
      </Suspense>
    </main>
  );
}
