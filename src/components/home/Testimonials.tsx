"use client";

import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiArrowRight } from "react-icons/fi";

// Row 1 — moving right
const row1Images = [
  "https://placehold.co/300x450/FFE5EC/FF4081?text=Chat+1",
  "https://placehold.co/300x450/FFF8F9/FF6B8A?text=Chat+2",
  "https://placehold.co/300x450/FFE5EC/E91E63?text=Chat+3",
  "https://placehold.co/300x450/FFF8F9/FF4081?text=Chat+4",
];

// Row 2 — moving left
const row2Images = [
  "https://placehold.co/300x450/FFE5EC/FF6B8A?text=Chat+5",
  "https://placehold.co/300x450/FFF8F9/E91E63?text=Chat+6",
  "https://placehold.co/300x450/FFE5EC/FF4081?text=Chat+7",
  "https://placehold.co/300x450/FFF8F9/FF6B8A?text=Chat+8",
];

export default function Testimonials() {
  return (
    <section
      style={{
        width: "100%",
        padding: "80px 24px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          height: "500px",
          borderRadius: "32px",
          overflow: "hidden",
          backgroundColor: "#FFF8F9",
        }}
      >
        {/* ============================================================
            SVG DEFINITIONS: Clip paths for parabola shapes
        ============================================================ */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <defs>
            {/* Left panel clip — larger (65% width) with mirror curve on right edge */}
            <clipPath id="testiLeftClip" clipPathUnits="objectBoundingBox">
              {/* 
                Mirror of Hero: curve bulges toward left (concave)
                - Start top-left (0,0)
                - Line to 68% at top
                - Curve down to 68% at bottom (curve bulge to right)
                - Line to bottom-left (0,1)
              */}
              <path
                d="M 0 0 
                   L 0.62 0 
                   C 0.72 0.35, 0.72 0.65, 0.62 1 
                   L 0 1 
                   Z"
              />
            </clipPath>

            {/* Right panel clip — smaller (35% width) with mirror curve on left edge */}
            <clipPath id="testiRightClip" clipPathUnits="objectBoundingBox">
              {/* 
                Mirror curve: starts from right side
                - Start top-right (1,0)
                - Line to 35% at top
                - Curve down to 35% at bottom (curve bulge to left)
                - Line to bottom-right (1,1)
              */}
              <path
                d="M 1 0 
                   L 0.38 0 
                   C 0.28 0.35, 0.28 0.65, 0.38 1 
                   L 1 1 
                   Z"
              />
            </clipPath>
          </defs>
        </svg>

        {/* ============================================================
            LEFT PANEL: Chat screenshots with 2-row scrolling animation
            (65% width, larger, curve bulges right)
        ============================================================ */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "70%",
            height: "100%",
            clipPath: "url(#testiLeftClip)",
            overflow: "hidden",
            backgroundColor: "#FFF8F9",
            zIndex: 2,
          }}
        >
          {/* Decorative gradient background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 20% 30%, rgba(255, 107, 138, 0.12), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255, 64, 129, 0.08), transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* ===== Scrolling Rows Container ===== */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
              padding: "20px 0",
            }}
          >
            {/* ===== Row 1 — Moving Right (Left → Right) ===== */}
            <div
              className="scroll-row-right"
              style={{
                display: "flex",
                gap: "16px",
                width: "fit-content",
                animation: "scrollRight 60s linear infinite",
              }}
            >
              {/* Duplicate set for seamless loop */}
              {[...row1Images, ...row1Images, ...row1Images].map(
                (img, index) => (
                  <div
                    key={`r1-${index}`}
                    style={{
                      flexShrink: 0,
                      width: "180px",
                      height: "260px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Chat ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="180px"
                      unoptimized
                    />
                  </div>
                )
              )}
            </div>

            {/* ===== Row 2 — Moving Left (Right → Left) ===== */}
            <div
              className="scroll-row-left"
              style={{
                display: "flex",
                gap: "16px",
                width: "fit-content",
                animation: "scrollLeft 60s linear infinite",
                marginLeft: "-180px",
              }}
            >
              {/* Duplicate set for seamless loop */}
              {[...row2Images, ...row2Images, ...row2Images].map(
                (img, index) => (
                  <div
                    key={`r2-${index}`}
                    style={{
                      flexShrink: 0,
                      width: "180px",
                      height: "260px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Chat ${index + 5}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="180px"
                      unoptimized
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Subtle gradient overlay at edges for smooth fade */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "80px",
              height: "100%",
              background:
                "linear-gradient(90deg, #FFF8F9 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "80px",
              height: "100%",
              background:
                "linear-gradient(270deg, #FFF8F9 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />
        </div>

        {/* ============================================================
            RIGHT PANEL: Gratefulness Statement
            (35% width, smaller, curve bulges left)
        ============================================================ */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60%",
            height: "100%",
            clipPath: "url(#testiRightClip)",
            overflow: "hidden",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 48px 48px 60px",
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Decorative background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 80% 20%, rgba(255, 107, 138, 0.08), transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Content Wrapper */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "380px",
              marginLeft: "auto",
            }}
          >
            {/* Heart Icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #FF6B8A 0%, #FF4081 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                boxShadow: "0 12px 32px rgba(255, 107, 138, 0.35)",
              }}
            >
              <FiHeart size={24} fill="#FFFFFF" strokeWidth={0} />
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(24px, 2.2vw, 34px)",
                fontWeight: 600,
                color: "#1A1A1A",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "0.3px",
              }}
            >
              আপনার ভালোবাসায়
              <br />
              <span
                style={{
                  color: "#FF6B8A",
                  fontStyle: "italic",
                }}
              >
                অনুপ্রাণিত
              </span>{" "}
              আমরা
            </h2>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#555555",
                margin: 0,
              }}
            >
              প্রতিটি মেসেজ, প্রতিটি প্রশংসা আমাদের আরও ভালো করার
              অনুপ্রেরণা দেয়। আপনার বিশ্বাসই আমাদের সবচেয়ে বড় শক্তি।
            </p>

            {/* CTA Button */}
            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                backgroundColor: "#FF6B8A",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "999px",
                alignSelf: "flex-start",
                marginTop: "8px",
                boxShadow: "0 10px 28px rgba(255, 107, 138, 0.35)",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FF4081";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(255, 107, 138, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FF6B8A";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 28px rgba(255, 107, 138, 0.35)";
              }}
            >
              আমাদের সম্পর্কে জানতে
              <FiArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Scrolling Animation Keyframes ===== */}
      <style jsx>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @media (max-width: 1024px) {
          .scroll-row-right,
          .scroll-row-left {
            animation-duration: 45s !important;
          }
        }

        @media (max-width: 640px) {
          .scroll-row-right,
          .scroll-row-left {
            animation-duration: 35s !important;
          }
        }
      `}</style>
    </section>
  );
}