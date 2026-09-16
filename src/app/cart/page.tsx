"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiShoppingBag,
  FiArrowLeft,
} from "react-icons/fi";
import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const [mounted, setMounted] = useState(false);

  // ✅ Correct: useEffect for setting mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Wait for client-side hydration
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
          backgroundColor: "#FFFFFF",
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
            boxShadow: "0 15px 40px rgba(255, 107, 138, 0.3)",
          }}
        >
          <FiShoppingBag size={32} strokeWidth={2} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            color: "#1A1A1A",
            margin: 0,
            marginBottom: "12px",
            letterSpacing: "0.3px",
          }}
        >
          আপনার কার্ট খালি
        </h1>

        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "15px",
            color: "#777777",
            margin: 0,
            marginBottom: "32px",
            maxWidth: "440px",
            lineHeight: 1.6,
          }}
        >
          আপনার ছোট্ট সোনামনির জন্য পছন্দের শাড়ি খুঁজে কার্টে যোগ করুন।
        </p>

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
            transition: "all 0.3s ease",
            letterSpacing: "0.3px",
            textTransform: "uppercase",
          }}
        >
          শপিং শুরু করুন
          <FiArrowRight size={15} strokeWidth={2.5} />
        </Link>
      </main>
    );
  }

  // Cart with items
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
          href="/#product-filter"
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
          আরও শপিং করুন
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
          আপনার কার্ট
        </h1>

        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "14px",
            color: "#777777",
            margin: 0,
          }}
        >
          {totalItems} টি আইটেম
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          className="cart-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Left: Cart Items */}
          <div>
            {/* Clear Cart */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "16px",
              }}
            >
              <button
                onClick={clearCart}
                style={{
                  background: "transparent",
                  border: "none",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#999999",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: 0,
                }}
              >
                সব মুছুন
              </button>
            </div>

            {/* Cart Items List */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr auto",
                    gap: "20px",
                    alignItems: "center",
                    padding: "20px",
                    backgroundColor: "#FFF8F9",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 107, 138, 0.08)",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "#F5EFE6",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="100px"
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#1A1A1A",
                        margin: 0,
                        marginBottom: "6px",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.name}
                    </h3>

                    {item.selectedAttributes && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "12px",
                          marginBottom: "10px",
                        }}
                      >
                        {Object.entries(item.selectedAttributes).map(
                          ([key, value]) => (
                            <span
                              key={key}
                              style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                fontSize: "12px",
                                color: "#777777",
                              }}
                            >
                              <strong style={{ color: "#555555" }}>
                                {key}:
                              </strong>{" "}
                              {value}
                            </span>
                          ),
                        )}
                      </div>
                    )}

                    <span
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#FF6B8A",
                      }}
                    >
                      ৳{item.price.toLocaleString("bn-BD")}
                    </span>
                  </div>

                  {/* Right: Quantity + Remove */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "12px",
                    }}
                  >
                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#999999",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#E53935";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#999999";
                      }}
                    >
                      <FiTrash2 size={18} />
                    </button>

                    {/* Quantity */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: "10px",
                        overflow: "hidden",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor:
                            item.quantity <= 1 ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: item.quantity <= 1 ? "#CCCCCC" : "#555555",
                        }}
                      >
                        <FiMinus size={12} />
                      </button>
                      <span
                        style={{
                          width: "36px",
                          textAlign: "center",
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#1A1A1A",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.maxStock}
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor:
                            item.quantity >= item.maxStock
                              ? "not-allowed"
                              : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color:
                            item.quantity >= item.maxStock
                              ? "#CCCCCC"
                              : "#555555",
                        }}
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#555555",
                      }}
                    >
                      ৳{(item.price * item.quantity).toLocaleString("bn-BD")}
                    </span>
                  </div>
                </div>
              ))}
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

            {/* Delivery Note */}
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
              <span
                style={{
                  fontSize: "12px",
                  color: "#999999",
                  fontStyle: "italic",
                }}
              >
                চেকআউটে যোগ হবে
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
                মোট
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#FF6B8A",
                }}
              >
                ৳{subtotal.toLocaleString("bn-BD")}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "16px 24px",
                backgroundColor: "#FF6B8A",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
                boxShadow: "0 10px 30px rgba(255, 107, 138, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FF4081";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FF6B8A";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              চেকআউট করুন
              <FiArrowRight size={16} strokeWidth={2.5} />
            </Link>

            {/* Security Note */}
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
              🔒 নিরাপদ ও দ্রুত চেকআউট
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
