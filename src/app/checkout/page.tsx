"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { useCartStore } from "@/store/cartStore";

const WHATSAPP_NUMBER = "8801974164273"; // Bangladesh format

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [deliveryArea, setDeliveryArea] = useState<"dhaka" | "outside">(
    "dhaka",
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryCharge = deliveryArea === "dhaka" ? 60 : 120;
  const total = subtotal + deliveryCharge;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "নাম প্রয়োজন";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "ফোন নম্বর প্রয়োজন";
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = "সঠিক ফোন নম্বর দিন (যেমন: 01712345678)";
    }
    if (!formData.address.trim()) {
      newErrors.address = "ঠিকানা প্রয়োজন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("আপনার কার্ট খালি");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Build WhatsApp message
    const orderNumber = `ZF-${Date.now().toString().slice(-8)}`;
    const deliveryText =
      deliveryArea === "dhaka" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে";

    let message = `🛍️ *নতুন অর্ডার - ZenvyFashion*\n\n`;
    message += `📋 *অর্ডার নম্বর:* ${orderNumber}\n\n`;
    message += `👤 *ক্রেতার তথ্য:*\n`;
    message += `নাম: ${formData.name}\n`;
    message += `ফোন: ${formData.phone}\n`;
    if (formData.email) {
      message += `ইমেইল: ${formData.email}\n`;
    }
    message += `ঠিকানা: ${formData.address}\n`;
    message += `ডেলিভারি এলাকা: ${deliveryText}\n\n`;

    message += `🛒 *প্রোডাক্ট তালিকা:*\n`;
    items.forEach((item, index) => {
      message += `\n${index + 1}. ${item.name}\n`;
      if (item.selectedAttributes) {
        Object.entries(item.selectedAttributes).forEach(([key, value]) => {
          message += `   • ${key}: ${value}\n`;
        });
      }
      message += `   • পরিমাণ: ${item.quantity}\n`;
      message += `   • দাম: ৳${item.price.toLocaleString("bn-BD")} × ${item.quantity} = ৳${(item.price * item.quantity).toLocaleString("bn-BD")}\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *হিসাব:*\n`;
    message += `সাবটোটাল: ৳${subtotal.toLocaleString("bn-BD")}\n`;
    message += `ডেলিভারি চার্জ: ৳${deliveryCharge.toLocaleString("bn-BD")}\n`;
    message += `*সর্বমোট: ৳${total.toLocaleString("bn-BD")}*\n\n`;
    message += `💳 *পেমেন্ট:* ক্যাশ অন ডেলিভারি\n\n`;
    message += `🙏 ধন্যবাদ!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Clear cart and redirect
    setTimeout(() => {
      clearCart();
      router.push("/order-confirmation");
    }, 1000);
  };

  if (!mounted) {
    return (
      <main
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "14px",
            color: "#999999",
          }}
        >
          লোড হচ্ছে...
        </div>
      </main>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6B8A 0%, #FF4081 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            marginBottom: "24px",
          }}
        >
          <FiAlertCircle size={32} />
        </div>
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "#1A1A1A",
            margin: 0,
            marginBottom: "12px",
          }}
        >
          আপনার কার্ট খালি
        </h1>
        <Link
          href="/#product-filter"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 32px",
            backgroundColor: "#FF6B8A",
            color: "#FFFFFF",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            borderRadius: "999px",
            boxShadow: "0 10px 30px rgba(255, 107, 138, 0.35)",
            marginTop: "20px",
          }}
        >
          শপিং শুরু করুন
          <FiArrowRight size={15} />
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        paddingBottom: "80px",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "48px 24px 24px",
        }}
      >
        <Link
          href="/cart"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#999999",
            textDecoration: "none",
            marginBottom: "20px",
          }}
        >
          <FiArrowLeft size={14} />
          কার্টে ফিরে যান
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 700,
            color: "#1A1A1A",
            margin: 0,
            marginBottom: "8px",
            letterSpacing: "0.3px",
          }}
        >
          চেকআউট
        </h1>

        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "14px",
            color: "#777777",
            margin: 0,
          }}
        >
          আপনার তথ্য দিয়ে অর্ডার সম্পন্ন করুন
        </p>
      </div>

      {/* Main Content */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          className="checkout-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Left: Form */}
          <div
            style={{
              backgroundColor: "#FFF8F9",
              borderRadius: "24px",
              padding: "32px 28px",
              border: "1px solid rgba(255, 107, 138, 0.08)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#1A1A1A",
                margin: 0,
                marginBottom: "24px",
                letterSpacing: "0.3px",
              }}
            >
              আপনার তথ্য
            </h2>

            {/* Name */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <FiUser size={14} />
                নাম *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="আপনার পূর্ণ নাম"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  color: "#1A1A1A",
                  backgroundColor: "#FFFFFF",
                  border: errors.name
                    ? "1.5px solid #E53935"
                    : "1.5px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "12px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6B8A";
                }}
                onBlur={(e) => {
                  if (!errors.name) {
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                  }
                }}
              />
              {errors.name && (
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "12px",
                    color: "#E53935",
                    margin: 0,
                    marginTop: "6px",
                  }}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <FiPhone size={14} />
                ফোন নম্বর *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="01XXXXXXXXX"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  color: "#1A1A1A",
                  backgroundColor: "#FFFFFF",
                  border: errors.phone
                    ? "1.5px solid #E53935"
                    : "1.5px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "12px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6B8A";
                }}
                onBlur={(e) => {
                  if (!errors.phone) {
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                  }
                }}
              />
              {errors.phone && (
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "12px",
                    color: "#E53935",
                    margin: 0,
                    marginTop: "6px",
                  }}
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <FiMail size={14} />
                ইমেইল (ঐচ্ছিক)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  color: "#1A1A1A",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "12px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6B8A";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                }}
              />
            </div>

            {/* Address */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <FiMapPin size={14} />
                ঠিকানা *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                placeholder="বাসা/রোড, এলাকা, থানা, জেলা"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  color: "#1A1A1A",
                  backgroundColor: "#FFFFFF",
                  border: errors.address
                    ? "1.5px solid #E53935"
                    : "1.5px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "12px",
                  outline: "none",
                  boxSizing: "border-box",
                  resize: "vertical",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6B8A";
                }}
                onBlur={(e) => {
                  if (!errors.address) {
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                  }
                }}
              />
              {errors.address && (
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "12px",
                    color: "#E53935",
                    margin: 0,
                    marginTop: "6px",
                  }}
                >
                  {errors.address}
                </p>
              )}
            </div>

            {/* Delivery Area */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                ডেলিভারি এলাকা *
              </label>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 16px",
                    backgroundColor:
                      deliveryArea === "dhaka" ? "#FFE5EC" : "#FFFFFF",
                    border:
                      deliveryArea === "dhaka"
                        ? "1.5px solid #FF6B8A"
                        : "1.5px solid rgba(0, 0, 0, 0.08)",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <input
                    type="radio"
                    name="deliveryArea"
                    value="dhaka"
                    checked={deliveryArea === "dhaka"}
                    onChange={() => setDeliveryArea("dhaka")}
                    style={{
                      accentColor: "#FF6B8A",
                      cursor: "pointer",
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1A1A1A",
                    }}
                  >
                    ঢাকার ভিতরে
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#FF6B8A",
                    }}
                  >
                    ৳৬০
                  </span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 16px",
                    backgroundColor:
                      deliveryArea === "outside" ? "#FFE5EC" : "#FFFFFF",
                    border:
                      deliveryArea === "outside"
                        ? "1.5px solid #FF6B8A"
                        : "1.5px solid rgba(0, 0, 0, 0.08)",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <input
                    type="radio"
                    name="deliveryArea"
                    value="outside"
                    checked={deliveryArea === "outside"}
                    onChange={() => setDeliveryArea("outside")}
                    style={{
                      accentColor: "#FF6B8A",
                      cursor: "pointer",
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1A1A1A",
                    }}
                  >
                    ঢাকার বাইরে (৬৪ জেলা)
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#FF6B8A",
                    }}
                  >
                    ৳১২০
                  </span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                পেমেন্ট পদ্ধতি
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  backgroundColor: "#FFE5EC",
                  border: "1.5px solid #FF6B8A",
                  borderRadius: "12px",
                }}
              >
                <input
                  type="radio"
                  checked
                  readOnly
                  style={{
                    accentColor: "#FF6B8A",
                    width: "16px",
                    height: "16px",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#1A1A1A",
                  }}
                >
                  ক্যাশ অন ডেলিভারি (COD)
                </span>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div
            style={{
              position: "sticky",
              top: "100px",
              backgroundColor: "#FFF8F9",
              borderRadius: "24px",
              padding: "28px 24px",
              border: "1px solid rgba(255, 107, 138, 0.08)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#1A1A1A",
                margin: 0,
                marginBottom: "20px",
                letterSpacing: "0.3px",
              }}
            >
              অর্ডার সামারি
            </h2>

            {/* Items */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginBottom: "20px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "56px",
                      height: "56px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      backgroundColor: "#F5EFE6",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#1A1A1A",
                        margin: 0,
                        marginBottom: "2px",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.name}
                    </h4>
                    {item.selectedAttributes && (
                      <p
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "11px",
                          color: "#777777",
                          margin: 0,
                          marginBottom: "2px",
                        }}
                      >
                        {Object.entries(item.selectedAttributes)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(", ")}
                      </p>
                    )}
                    <p
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "12px",
                        color: "#FF6B8A",
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      ৳{item.price.toLocaleString("bn-BD")} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                marginBottom: "20px",
              }}
            />

            {/* Subtotal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                color: "#555555",
              }}
            >
              <span>সাবটোটাল</span>
              <span style={{ fontWeight: 600 }}>
                ৳{subtotal.toLocaleString("bn-BD")}
              </span>
            </div>

            {/* Delivery */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                color: "#555555",
              }}
            >
              <span>ডেলিভারি চার্জ</span>
              <span style={{ fontWeight: 600 }}>
                ৳{deliveryCharge.toLocaleString("bn-BD")}
              </span>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                marginBottom: "20px",
              }}
            />

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                }}
              >
                সর্বমোট
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#FF6B8A",
                }}
              >
                ৳{total.toLocaleString("bn-BD")}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px 24px",
                backgroundColor: isSubmitting ? "#CCCCCC" : "#25D366",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                borderRadius: "12px",
                cursor: isSubmitting ? "wait" : "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
                boxShadow: "0 10px 30px rgba(37, 211, 102, 0.35)",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#1DA851";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#25D366";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp-এ অর্ডার করুন
            </button>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                color: "#999999",
                textAlign: "center",
                margin: 0,
                marginTop: "16px",
                lineHeight: 1.5,
              }}
            >
              অর্ডার কনফার্ম করতে WhatsApp-এ পাঠানো হবে
            </p>
          </div>
        </div>
      </form>

      <style jsx>{`
        @media (max-width: 1024px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
