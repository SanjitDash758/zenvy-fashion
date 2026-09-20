"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  // Hydration fix — ensure cart data is loaded from localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-rose-50/30 py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            আপনার কার্ট খালি
          </h1>
          <p className="text-gray-600 mb-8">
            অর্ডার করতে প্রথমে কার্টে পণ্য যোগ করুন
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-rose-600 transition"
          >
            <FiArrowLeft />
            শপে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-rose-50/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-500 transition mb-4"
          >
            <FiArrowLeft />
            কার্টে ফিরে যান
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            চেকআউট
          </h1>
          <p className="text-gray-600 mt-2">
            অর্ডার কনফার্ম করতে নিচের তথ্যগুলো পূরণ করুন
          </p>
        </div>

        {/* Two column layout: form + order summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form — 2 columns wide */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Order Summary — 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                অর্ডার সারাংশ
              </h2>

              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variationId}`}
                    className="flex gap-3 pb-3 border-b border-gray-100 last:border-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {item.name}
                      </p>
                      {item.selectedAttributes && (
                        <p className="text-xs text-gray-500 mt-1">
                          {Object.entries(item.selectedAttributes)
                            .map(([key, val]) => `${key}: ${val}`)
                            .join(", ")}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-600">
                          ৳{item.price.toLocaleString("bn-BD")} ×{" "}
                          {item.quantity}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          ৳
                          {(item.price * item.quantity).toLocaleString("bn-BD")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">মোট</span>
                  <span className="text-2xl font-bold text-rose-600">
                    ৳{" "}
                    {items
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0,
                      )
                      .toLocaleString("bn-BD")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
