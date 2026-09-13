"use client";

import Link from "next/link";
import { FiCheckCircle, FiArrowRight, FiMessageCircle } from "react-icons/fi";

export default function OrderConfirmationPage() {
  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Success Icon */}
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366 0%, #1DA851 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          marginBottom: "28px",
          boxShadow: "0 20px 60px rgba(37, 211, 102, 0.35)",
          animation: "popIn 0.5s ease",
        }}
      >
        <FiCheckCircle size={50} strokeWidth={2.5} />
      </div>

      {/* Heading */}
      <h1
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(32px, 4.5vw, 52px)",
          fontWeight: 700,
          color: "#1A1A1A",
          margin: 0,
          marginBottom: "16px",
          letterSpacing: "0.3px",
          lineHeight: 1.15,
        }}
      >
        অর্ডার সফলভাবে পাঠানো হয়েছে!
      </h1>

      {/* Subtext */}
      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "15px",
          color: "#777777",
          margin: 0,
          marginBottom: "12px",
          maxWidth: "520px",
          lineHeight: 1.7,
        }}
      >
        আপনার অর্ডারটি WhatsApp-এ পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ
        করব।
      </p>

      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "13px",
          color: "#999999",
          margin: 0,
          marginBottom: "36px",
          maxWidth: "520px",
          lineHeight: 1.7,
        }}
      >
        WhatsApp-এ "Send" বাটনে ক্লিক করতে ভুলবেন না — তবেই অর্ডারটি আমাদের কাছে
        পৌঁছাবে।
      </p>

      {/* Info Box */}
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          padding: "20px 24px",
          backgroundColor: "#E8F5E9",
          borderRadius: "16px",
          border: "1px solid rgba(76, 175, 80, 0.15)",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          textAlign: "left",
        }}
      >
        <FiMessageCircle
          size={22}
          style={{ color: "#25D366", flexShrink: 0 }}
        />
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "13px",
            color: "#1A1A1A",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          WhatsApp উইন্ডো না খুললে, দয়া করে <strong>01974-164273</strong>{" "}
          নম্বরে মেসেজ পাঠান।
        </p>
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <Link
          href="/#product-filter"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
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
          আরও শপিং করুন
          <FiArrowRight size={15} strokeWidth={2.5} />
        </Link>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "14px 32px",
            backgroundColor: "transparent",
            color: "#1A1A1A",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
            borderRadius: "999px",
            border: "1.5px solid rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            letterSpacing: "0.3px",
            textTransform: "uppercase",
          }}
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>

      <style jsx>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          70% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}
