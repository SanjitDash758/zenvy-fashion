"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { FiShoppingBag, FiLoader } from "react-icons/fi";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  note: string;
  paymentMethod: "cod";
}

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    note: "",
    paymentMethod: "cod",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!formData.firstName.trim()) {
      setError("নাম আবশ্যক");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 11) {
      setError("সঠিক ফোন নম্বর দিন (১১ ডিজিট)");
      return;
    }
    if (!formData.address.trim()) {
      setError("ঠিকানা আবশ্যক");
      return;
    }
    if (!formData.city.trim()) {
      setError("শহর আবশ্যক");
      return;
    }
    if (items.length === 0) {
      setError("কার্ট খালি");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postcode: formData.postcode,
          note: formData.note,
        },
        paymentMethod: formData.paymentMethod,
        items: items.map((item) => ({
          productId: item.productId,
          variationId: item.variationId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "অর্ডার তৈরি ব্যর্থ হয়েছে");
        setLoading(false);
        return;
      }

      // Success — clear cart and redirect
      clearCart();
      router.push(`/order-confirmation?id=${data.orderId}`);
    } catch (err) {
      console.error(err);
      setError("সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন");
      setLoading(false);
    }
  };

  const total = getTotalPrice();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">কাস্টমার তথ্য</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              নাম <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none"
              placeholder="আপনার নাম"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              পদবি (ঐচ্ছিক)
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none"
              placeholder="পদবি"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              মোবাইল নম্বর <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none"
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ইমেইল (ঐচ্ছিক)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none"
              placeholder="email@example.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              সম্পূর্ণ ঠিকানা <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none"
              placeholder="বাসা/রোড/এলাকা"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              শহর <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none"
              placeholder="ঢাকা"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              পোস্ট কোড (ঐচ্ছিক)
            </label>
            <input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none"
              placeholder="1200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              অতিরিক্ত নোট (ঐচ্ছিক)
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none resize-none"
              placeholder="বিশেষ কোনো নির্দেশনা থাকলে লিখুন"
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">পেমেন্ট পদ্ধতি</h2>

        <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-rose-400 bg-rose-50">
          <div className="w-5 h-5 rounded-full border-4 border-rose-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">ক্যাশ অন ডেলিভারি</p>
            <p className="text-sm text-gray-600 mt-1">
              পণ্য হাতে পেয়ে টাকা পরিশোধ করুন
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Total & Submit */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 font-medium">মোট</span>
          <span className="text-2xl font-bold text-gray-900">
            ৳ {total.toLocaleString("bn-BD")}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading || items.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              অর্ডার প্রসেস হচ্ছে...
            </>
          ) : (
            <>
              <FiShoppingBag />
              অর্ডার কনফার্ম করুন
            </>
          )}
        </button>

        {items.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-3">
            অর্ডার করতে কার্টে পণ্য যোগ করুন
          </p>
        )}
      </div>
    </form>
  );
}
