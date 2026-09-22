"use client";

import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheck,
  FiLoader,
  FiFacebook,
  FiInstagram,
  FiChevronDown,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.name.trim()) {
      setError("নাম আবশ্যক");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 11) {
      setError("সঠিক ফোন নম্বর দিন (১১ ডিজিট)");
      return;
    }
    if (!formData.message.trim()) {
      setError("বার্তা লিখুন");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "বার্তা পাঠানো ব্যর্থ হয়েছে");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
      setLoading(false);

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError("সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন");
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "কীভাবে অর্ডার করব?",
      a: "ওয়েবসাইটে পছন্দের শাড়ি সিলেক্ট করে কার্টে যোগ করুন, তারপর চেকআউটে গিয়ে আপনার তথ্য দিয়ে অর্ডার কনফার্ম করুন।",
    },
    {
      q: "ডেলিভারিতে কত সময় লাগে?",
      a: "ঢাকার ভিতরে ২-৩ দিন, ঢাকার বাইরে ৩-৫ দিন। কুরিয়ার সার্ভিসের উপর নির্ভর করে সময় পরিবর্তন হতে পারে।",
    },
    {
      q: "কীভাবে টাকা পরিশোধ করব?",
      a: "বর্তমানে ক্যাশ অন ডেলিভারি সিস্টেম চালু আছে। পণ্য হাতে পেয়ে টাকা পরিশোধ করবেন।",
    },
    {
      q: "পণ্য ফেরত দেওয়ার নিয়ম কী?",
      a: "পণ্যে কোনো সমস্যা থাকলে ৩ দিনের মধ্যে আমাদের সাথে যোগাযোগ করুন। শর্ত সাপেক্ষে পরিবর্তন বা ফেরত দেওয়া যাবে।",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50/40 via-amber-50/30 to-rose-50/40">
      {/* ===== Hero Section ===== */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] text-rose-500 uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Get in Touch
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            আমাদের সাথে <span className="text-rose-500 italic">যোগাযোগ</span>{" "}
            করুন
          </h1>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            যেকোনো প্রশ্ন, পরামর্শ বা অভিযোগের জন্য আমাদের সাথে যোগাযোগ করুন।
            আমরা ২৪ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি।
          </p>
        </div>
      </section>

      {/* ===== Contact Info Cards ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ContactCard
            icon={<FiPhone />}
            title="ফোন"
            value="01974-164273"
            href="tel:+8801974164273"
            color="rose"
          />
          <ContactCard
            icon={<FiMail />}
            title="ইমেইল"
            value="info@zenvyfashion.com"
            href="mailto:info@zenvyfashion.com"
            color="blue"
          />
          <ContactCard
            icon={<FiMapPin />}
            title="ঠিকানা"
            value="ঢাকা, বাংলাদেশ"
            color="amber"
          />
          <ContactCard
            icon={<FiClock />}
            title="সময়"
            value="সকাল ১০টা - রাত ৯টা"
            color="emerald"
          />
        </div>
      </section>

      {/* ===== Contact Form + Social ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form — 2 cols */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 shadow-lg p-8">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                বার্তা পাঠান
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="নাম"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার নাম"
                    required
                  />
                  <FormInput
                    label="ফোন নম্বর"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    type="tel"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="ইমেইল (ঐচ্ছিক)"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    type="email"
                  />
                  <FormInput
                    label="বিষয় (ঐচ্ছিক)"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="বিষয় লিখুন"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    বার্তা <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    placeholder="আপনার বার্তা লিখুন..."
                    className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-rose-100 focus:border-rose-400 focus:outline-none text-gray-900 placeholder:text-gray-400 transition resize-none"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  />
                </div>

                {error && (
                  <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    ⚠ {error}
                  </div>
                )}

                {success && (
                  <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-2">
                    <FiCheck size={16} />
                    আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" size={18} />
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      বার্তা পাঠান
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Social + Promise — 1 col */}
          <div className="space-y-6">
            {/* Social Links */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 shadow-lg p-6">
              <h3
                className="text-lg font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                সোশ্যাল মিডিয়া
              </h3>
              <div className="space-y-3">
                <SocialLink
                  icon={<FiFacebook />}
                  name="Facebook"
                  href="https://www.facebook.com/share/1FCevZBWbb/"
                  color="#1877F2"
                />
                <SocialLink
                  icon={<FaTiktok />}
                  name="TikTok"
                  href="https://tiktok.com/@zenvyfashionbd"
                  color="#000000"
                />
              </div>
            </div>

            {/* Promise Card */}
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-3">💬</div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                দ্রুত উত্তর
              </h3>
              <p
                className="text-sm text-white/90 leading-relaxed"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                যেকোনো প্রশ্নের জন্য আমাদের ২৪ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা
                করি। জরুরি প্রয়োজনে সরাসরি কল করুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.3em] text-rose-500 uppercase mb-3"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            FAQ
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            সাধারণ <span className="text-rose-500 italic">প্রশ্ন-উত্তর</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/80 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-rose-50/50 transition"
              >
                <span
                  className="font-semibold text-gray-900"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {faq.q}
                </span>
                <FiChevronDown
                  className={`flex-shrink-0 text-rose-500 transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                  size={18}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p
                  className="px-5 pb-5 text-sm text-gray-600 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ===== Contact Card =====
function ContactCard({
  icon,
  title,
  value,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  color: "rose" | "blue" | "amber" | "emerald";
}) {
  const colorMap = {
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-500",
      border: "border-rose-100",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-500",
      border: "border-blue-100",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-500",
      border: "border-amber-100",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-500",
      border: "border-emerald-100",
    },
  };

  const colors = colorMap[color];

  const content = (
    <div
      className={`bg-white/80 backdrop-blur-xl rounded-2xl border ${colors.border} shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition-all`}
    >
      <div
        className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-3`}
      >
        {icon}
      </div>
      <p
        className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {title}
      </p>
      <p
        className="font-semibold text-gray-900 text-sm"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {value}
      </p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

// ===== Form Input =====
function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-rose-100 focus:border-rose-400 focus:outline-none text-gray-900 placeholder:text-gray-400 transition"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      />
    </div>
  );
}

// ===== Social Link =====
function SocialLink({
  icon,
  name,
  href,
  color,
}: {
  icon: React.ReactNode;
  name: string;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 transition-all group"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition group-hover:scale-110"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <span className="font-semibold text-gray-700 text-sm">{name}</span>
    </a>
  );
}
