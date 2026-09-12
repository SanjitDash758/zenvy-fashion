"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("পাসওয়ার্ড মিলছে না!");
      return;
    }
    if (!agreed) {
      alert("শর্তাবলী মেনে নিন!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1200);
  };

  return (
    <div
      className="auth-container"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "calc(100vh - 200px)",
        margin: "24px",
        borderRadius: "32px",
        overflow: "hidden",
        backgroundColor: "#FFF8F9",
      }}
    >
      {/* ============ LEFT: Image Side ============ */}
      <div
        className="auth-image-side"
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#F5EFE6",
        }}
      >
        <Image
          src="/images/little_girl.jpg"
          alt="Little girl in traditional saree"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center top",
          }}
          priority
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "48px",
            right: "48px",
            zIndex: 2,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "6px 14px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "999px",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            ✦ Join Our Family
          </span>

          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: 0,
              marginBottom: "12px",
              lineHeight: 1.2,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            শুরু হোক নতুন
            <br />
            <span style={{ fontStyle: "italic", color: "#FFD1DC" }}>
              যাত্রা
            </span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.85)",
              margin: 0,
              maxWidth: "360px",
              textShadow: "0 1px 10px rgba(0,0,0,0.3)",
            }}
          >
            রেজিস্ট্রেশন করে পান বিশেষ ছাড়, নতুন কালেকশন আপডেট এবং
            এক্সক্লুসিভ অফার।
          </p>
        </div>
      </div>

      {/* ============ RIGHT: Form Side ============ */}
      <div
        className="auth-form-side"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 40px",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: "380px" }}>
          {/* Header Icon */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, #FF6B8A 0%, #FF4081 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              marginBottom: "20px",
              boxShadow: "0 12px 32px rgba(255, 107, 138, 0.35)",
            }}
          >
            <FiUser size={24} strokeWidth={2} />
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "34px",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: 0,
              marginBottom: "6px",
              lineHeight: 1.15,
            }}
          >
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              color: "#777777",
              margin: 0,
              marginBottom: "28px",
              lineHeight: 1.6,
            }}
          >
            মাত্র কয়েক সেকেন্ডে শুরু করুন
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>নাম</label>
              <div className="input-wrapper" style={inputWrapperStyle}>
                <FiUser size={16} style={inputIconStyle} />
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>ইমেইল</label>
              <div className="input-wrapper" style={inputWrapperStyle}>
                <FiMail size={16} style={inputIconStyle} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>পাসওয়ার্ড</label>
              <div className="input-wrapper" style={inputWrapperStyle}>
                <FiLock size={16} style={inputIconStyle} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                  style={eyeButtonStyle}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>পাসওয়ার্ড নিশ্চিত করুন</label>
              <div className="input-wrapper" style={inputWrapperStyle}>
                <FiLock size={16} style={inputIconStyle} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password"
                  style={eyeButtonStyle}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                marginBottom: "20px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "12px",
                color: "#555555",
                cursor: "pointer",
                lineHeight: 1.5,
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  accentColor: "#FF6B8A",
                  cursor: "pointer",
                  width: "14px",
                  height: "14px",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              />
              <span>
                আমি{" "}
                <Link
                  href="/terms"
                  style={{ color: "#FF6B8A", fontWeight: 600 }}
                >
                  শর্তাবলী
                </Link>{" "}
                ও{" "}
                <Link
                  href="/privacy"
                  style={{ color: "#FF6B8A", fontWeight: 600 }}
                >
                  প্রাইভেসি পলিসি
                </Link>{" "}
                মেনে নিচ্ছি
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px 24px",
                backgroundColor: "#FF6B8A",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                borderRadius: "14px",
                cursor: isLoading ? "default" : "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.5px",
                boxShadow: "0 10px 30px rgba(255, 107, 138, 0.35)",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#FF4081";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#FF6B8A";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {isLoading ? (
                <>
                  <span className="spinner" />
                  তৈরি হচ্ছে...
                </>
              ) : (
                <>
                  রেজিস্ট্রেশন করুন
                  <FiArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              margin: "24px 0 18px",
            }}
          >
            <div style={dividerLineStyle} />
            <span style={dividerTextStyle}>অথবা</span>
            <div style={dividerLineStyle} />
          </div>

          {/* Login Link */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              color: "#555555",
              textAlign: "center",
              margin: 0,
            }}
          >
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/login"
              style={{
                color: "#FF6B8A",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>

      {/* ===== CSS ===== */}
      <style jsx>{`
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        :global(.input-wrapper:focus-within) {
          border-color: rgba(255, 107, 138, 0.6) !important;
          background-color: #fff !important;
          box-shadow: 0 0 0 4px rgba(255, 107, 138, 0.1);
        }

        @media (max-width: 900px) {
          .auth-container {
            grid-template-columns: 1fr !important;
            margin: 16px !important;
          }
          .auth-image-side {
            display: none !important;
          }
          .auth-form-side {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ===== Shared Styles ===== */
const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  color: "#1A1A1A",
  marginBottom: "8px",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
};

const inputWrapperStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "0 14px",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid rgba(0, 0, 0, 0.08)",
  borderRadius: "14px",
  transition: "all 0.3s ease",
};

const inputIconStyle: React.CSSProperties = {
  color: "#999999",
  flexShrink: 0,
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "15px 0",
  background: "transparent",
  border: "none",
  outline: "none",
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "14px",
  color: "#1A1A1A",
  letterSpacing: "0.2px",
};

const eyeButtonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#999999",
  padding: "4px",
  display: "flex",
  alignItems: "center",
};

const dividerLineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  backgroundColor: "rgba(0, 0, 0, 0.08)",
};

const dividerTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "11px",
  color: "#999999",
  letterSpacing: "1px",
  textTransform: "uppercase",
};