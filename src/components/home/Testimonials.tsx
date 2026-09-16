"use client";

import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiArrowRight } from "react-icons/fi";

// Left Column — 4 images
const leftColumnImages = [
  "https://placehold.co/300x450/FFE5EC/FF4081?text=Chat+1",
  "https://placehold.co/300x450/FFF8F9/FF6B8A?text=Chat+2",
  "https://placehold.co/300x450/FFE5EC/E91E63?text=Chat+3",
  "https://placehold.co/300x450/FFF8F9/FF4081?text=Chat+4",
];

// Right Column — 4 images
const rightColumnImages = [
  "https://placehold.co/300x450/FFE5EC/FF6B8A?text=Chat+5",
  "https://placehold.co/300x450/FFF8F9/E91E63?text=Chat+6",
  "https://placehold.co/300x450/FFE5EC/FF4081?text=Chat+7",
  "https://placehold.co/300x450/FFF8F9/FF6B8A?text=Chat+8",
];

export default function Testimonials() {
  return (
    <section
      className="testimonials-section"
      style={{
        width: "100%",
        padding: "80px 24px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        className="testimonials-wrapper"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          borderRadius: "32px",
          overflow: "hidden",
          backgroundColor: "#FFF8F9",
          padding: "40px",
        }}
      >
        {/* ============================================================
            TOP: Gratefulness Text Card (Full Width)
        ============================================================ */}
        <div
          className="testi-text-card"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            padding: "40px 48px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            boxShadow: "0 8px 30px rgba(255, 107, 138, 0.08)",
            border: "1.5px solid rgba(255, 107, 138, 0.15)",
            position: "relative",
            zIndex: 5,
            marginBottom: "0",
          }}
        >
          {/* Heart Icon */}
          <div
            className="testi-heart-icon"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6B8A 0%, #FF4081 100%)",
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
            className="testi-heading"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 600,
              color: "#1A1A1A",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "0.3px",
            }}
          >
            আপনার ভালোবাসায়{" "}
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
            className="testi-subtext"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "14px",
              lineHeight: 1.7,
              color: "#555555",
              margin: 0,
              maxWidth: "560px",
            }}
          >
            প্রতিটি মেসেজ, প্রতিটি প্রশংসা আমাদের আরও ভালো করার অনুপ্রেরণা দেয়।
            আপনার বিশ্বাসই আমাদের সবচেয়ে বড় শক্তি।
          </p>

          {/* CTA Button */}
          <Link
            href="/about"
            className="testi-cta-btn"
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
              boxShadow: "0 10px 28px rgba(255, 107, 138, 0.35)",
              transition: "all 0.3s ease",
              letterSpacing: "0.3px",
              minHeight: "44px",
              marginTop: "8px",
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

        {/* ============================================================
            CURVED SEPARATOR — Border Radius (Subtle Curve)
        ============================================================ */}
        <div
          className="testi-curve-separator"
          style={{
            position: "relative",
            width: "100%",
            height: "60px",
            marginTop: "-30px",
            zIndex: 3,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* 
            Curved shape via border-radius — creates a smooth arc
            that bridges the text card and the image grid below
          */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-10%",
              right: "-10%",
              height: "200%",
              backgroundColor: "#FFF8F9",
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
              boxShadow: "0 -20px 40px rgba(255, 107, 138, 0.06)",
            }}
          />
        </div>
        {/* ============================================================
            BOTTOM: 2-Column Chat Images Grid
        ============================================================ */}
        <div
          className="testi-images-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            position: "relative",
            height: "480px",
            overflow: "hidden",
            marginTop: "40px",
          }}
        >
          {/* ===== LEFT COLUMN (Bottom → Top) ===== */}
          <div
            className="testi-column-left"
            style={{
              position: "relative",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <div
              className="vertical-scroll-up"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                animation: "verticalScrollUp 30s linear infinite",
              }}
            >
              {[
                ...leftColumnImages,
                ...leftColumnImages,
                ...leftColumnImages,
              ].map((img, index) => (
                <div
                  key={`left-${index}`}
                  className="testi-chat-item"
                  style={{
                    flexShrink: 0,
                    width: "100%",
                    aspectRatio: "2 / 3",
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
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT COLUMN (Top → Bottom) ===== */}
          <div
            className="testi-column-right"
            style={{
              position: "relative",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <div
              className="vertical-scroll-down"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                animation: "verticalScrollDown 30s linear infinite",
              }}
            >
              {[
                ...rightColumnImages,
                ...rightColumnImages,
                ...rightColumnImages,
              ].map((img, index) => (
                <div
                  key={`right-${index}`}
                  className="testi-chat-item"
                  style={{
                    flexShrink: 0,
                    width: "100%",
                    aspectRatio: "2 / 3",
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
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Edge fade — top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "60px",
              background:
                "linear-gradient(180deg, #FFF8F9 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />

          {/* Edge fade — bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: "linear-gradient(0deg, #FFF8F9 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        </div>
      </div>

      {/* ===== CSS ===== */}
      <style jsx>{`
        @keyframes verticalScrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.33%);
          }
        }

        @keyframes verticalScrollDown {
          0% {
            transform: translateY(-33.33%);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* ===== TABLET (max 1024px) ===== */
        @media (max-width: 1024px) {
          .testimonials-section {
            padding: 60px 20px !important;
          }

          .testimonials-wrapper {
            padding: 32px !important;
            border-radius: 24px !important;
          }

          .testi-text-card {
            padding: 32px 32px !important;
          }

          .testi-images-grid {
            height: 400px !important;
            gap: 20px !important;
          }

          .vertical-scroll-up,
          .vertical-scroll-down {
            animation-duration: 25s !important;
          }
        }

        /* ===== MOBILE (max 768px) ===== */
        @media (max-width: 768px) {
          .testimonials-section {
            padding: 48px 16px !important;
          }

          .testimonials-wrapper {
            padding: 24px 16px !important;
            border-radius: 24px !important;
          }

          .testi-text-card {
            padding: 28px 20px !important;
            border-radius: 20px !important;
            gap: 16px !important;
          }

          .testi-heart-icon {
            width: 48px !important;
            height: 48px !important;
          }

          .testi-heading {
            font-size: 24px !important;
          }

          .testi-subtext {
            font-size: 13px !important;
          }

          .testi-cta-btn {
            padding: 14px 28px !important;
            font-size: 13px !important;
            min-height: 48px !important;
          }

          .testi-curve-divider {
            height: 40px !important;
            margin-top: -20px !important;
            margin-bottom: -20px !important;
          }

          .testi-images-grid {
            height: 420px !important;
            gap: 12px !important;
            margin-top: 24px !important;
          }

          .testi-chat-item {
            border-radius: 12px !important;
          }

          .vertical-scroll-up,
          .vertical-scroll-down {
            animation-duration: 20s !important;
            gap: 12px !important;
          }

          .vertical-scroll-up > div,
          .vertical-scroll-down > div {
            gap: 12px !important;
          }
        }

        /* ===== SMALL MOBILE (max 480px) ===== */
        @media (max-width: 480px) {
          .testimonials-section {
            padding: 40px 12px !important;
          }

          .testimonials-wrapper {
            padding: 20px 12px !important;
            border-radius: 20px !important;
          }

          .testi-text-card {
            padding: 24px 16px !important;
          }

          .testi-heading {
            font-size: 22px !important;
          }

          .testi-images-grid {
            height: 380px !important;
            gap: 10px !important;
          }

          .vertical-scroll-up,
          .vertical-scroll-down {
            animation-duration: 18s !important;
          }
        }
      `}</style>
    </section>
  );
}
