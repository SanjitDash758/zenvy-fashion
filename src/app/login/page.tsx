"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call — UI only for now
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

        {/* Overlay */}
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

        {/* Content */}
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
            ✦ Welcome Back
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
            আপনার ভালোবাসায়
            <br />
            <span style={{ fontStyle: "italic", color: "#FFD1DC" }}>
              অনুপ্রাণিত
            </span>{" "}
            আমরা
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
            আপনার ছোট্ট সোনামনির জন্য সেরা শাড়িগুলো এক্সপ্লোর করতে লগইন
            করুন।
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
          padding: "48px 40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "380px",
          }}
        >
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
              marginBottom: "24px",
              boxShadow: "0 12px 32px rgba(255, 107, 138, 0.35)",
            }}
          >
            <FiLock size={24} strokeWidth={2} />
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "36px",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: 0,
              marginBottom: "8px",
              lineHeight: 1.15,
              letterSpacing: "0.3px",
            }}
          >
            স্বাগতম!
          </h1>

          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "14px",
              color: "#777777",
              margin: 0,
              marginBottom: "36px",
              lineHeight: 1.6,
            }}
          >
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  marginBottom: "8px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                ইমেইল
              </label>
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
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  marginBottom: "8px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                পাসওয়ার্ড
              </label>
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
                  aria-label="Toggle password visibility"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#999999",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  color: "#555555",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{
                    accentColor: "#FF6B8A",
                    cursor: "pointer",
                    width: "14px",
                    height: "14px",
                  }}
                />
                মনে রাখুন
              </label>
              <Link
                href="/forgot-password"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#FF6B8A",
                  textDecoration: "none",
                }}
              >
                ভুলে গেছেন?
              </Link>
            </div>

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
                  লগইন হচ্ছে...
                </>
              ) : (
                <>
                  লগইন করুন
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
              margin: "28px 0 20px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                color: "#999999",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              অথবা
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              }}
            />
          </div>

          {/* Sign Up Link */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              color: "#555555",
              textAlign: "center",
              margin: 0,
            }}
          >
            নতুন অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/register"
              style={{
                color: "#FF6B8A",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              রেজিস্ট্রেশন করুন
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
  padding: "16px 0",
  background: "transparent",
  border: "none",
  outline: "none",
  fontFamily: "var(--font-inter), sans-serif",
  fontSize: "14px",
  color: "#1A1A1A",
  letterSpacing: "0.2px",
};