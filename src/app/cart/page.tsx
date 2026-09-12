import Link from "next/link";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

export default function CartPage() {
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
        href="/shop"
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
