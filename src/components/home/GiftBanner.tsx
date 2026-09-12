"use client";

import { FiPhone } from "react-icons/fi";

export default function GiftBanner() {
  return (
    <section
      style={{
        width: "100%",
        padding: "80px 0",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          width: "100%",
          background:
            "linear-gradient(135deg, #FF6B8A 0%, #FF4081 50%, #E91E63 100%)",
          padding: "72px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ===== Background Decorative Gift Icons ===== */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "5%",
            fontSize: "80px",
            opacity: 0.08,
            transform: "rotate(-15deg)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          🎁
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "8%",
            fontSize: "120px",
            opacity: 0.08,
            transform: "rotate(20deg)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          🎀
        </div>
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "25%",
            fontSize: "60px",
            opacity: 0.06,
            transform: "rotate(-25deg)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          🎁
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "20%",
            fontSize: "70px",
            opacity: 0.06,
            transform: "rotate(15deg)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          🎀
        </div>

        {/* ===== Dot Pattern ===== */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            pointerEvents: "none",
            opacity: 0.5,
          }}
        />

        {/* ===== Content ===== */}
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            🎁
          </div>

          {/* Label */}
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            ✦ Special Gift Offer ✦
          </span>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: "0.5px",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            উপহার হিসেবে দিন,{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 600,
                color: "#FFE5EC",
              }}
            >
              সুন্দর প্যাকেটে
            </span>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(14px, 1.2vw, 17px)",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.95)",
              margin: 0,
              maxWidth: "560px",
              lineHeight: 1.6,
              letterSpacing: "0.2px",
            }}
          >
            বিশেষ অনুষ্ঠানের জন্য{" "}
            <span style={{ fontWeight: 700, color: "#FFE5EC" }}>
              গিফট র্যাপিং সম্পূর্ণ ফ্রি!
            </span>
          </p>

          {/* CTA Button */}
          <a
            href="tel:+8801974164273"
            className="gift-banner-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "18px 42px",
              backgroundColor: "#FFFFFF",
              color: "#FF4081",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              borderRadius: "999px",
              marginTop: "12px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
              transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-3px) scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 20px 60px rgba(0, 0, 0, 0.3)";
              e.currentTarget.style.backgroundColor = "#FFF8F9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(0, 0, 0, 0.2)";
              e.currentTarget.style.backgroundColor = "#FFFFFF";
            }}
          >
            <FiPhone size={18} strokeWidth={2.5} />
            অর্ডার করুন
          </a>
        </div>

        {/* ===== Floating Animation ===== */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        `}</style>
      </div>
    </section>
  );
}