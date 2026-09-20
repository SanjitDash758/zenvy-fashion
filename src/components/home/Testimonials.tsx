"use client";

import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiArrowRight } from "react-icons/fi";

// ===== Chat Images =====
const row1Images = [
  "/images/feedback1.png",
  "/images/feedback2.png",
  "/images/feedback3.png",
  "/images/feedback4.png",
];

const row2Images = [
  "/images/feedback5.png",
  "/images/feedback6.png",
  "/images/feedback7.png",
  "/images/feedback8.png",
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
        className="testimonials-container"
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
            SVG DEFINITIONS (Desktop only)
        ============================================================ */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <defs>
            <clipPath id="testiLeftClip" clipPathUnits="objectBoundingBox">
              <path
                d="M 0 0 
                   L 0.62 0 
                   C 0.72 0.35, 0.72 0.65, 0.62 1 
                   L 0 1 
                   Z"
              />
            </clipPath>

            <clipPath id="testiRightClip" clipPathUnits="objectBoundingBox">
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
            DESKTOP LAYOUT (≥ 1024px)
            Left Panel: Chat Images (2 Rows Horizontal)
            Right Panel: Gratefulness (Curved)
        ============================================================ */}
        <div className="testi-desktop-layout">
          {/* ===== LEFT PANEL: Chat Images ===== */}
          <div
            className="testi-left-panel"
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
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 20% 30%, rgba(255, 107, 138, 0.12), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255, 64, 129, 0.08), transparent 60%)",
                pointerEvents: "none",
              }}
            />

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
              {/* Row 1 — Moving Right */}
              <div
                className="scroll-row-right"
                style={{
                  display: "flex",
                  gap: "16px",
                  width: "fit-content",
                  animation: "scrollRight 60s linear infinite",
                }}
              >
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
                  ),
                )}
              </div>

              {/* Row 2 — Moving Left */}
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
                  ),
                )}
              </div>
            </div>
          </div>

          {/* ===== RIGHT PANEL: Gratefulness ===== */}
          <div
            className="testi-right-panel"
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
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 80% 20%, rgba(255, 107, 138, 0.08), transparent 60%)",
                pointerEvents: "none",
              }}
            />

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
                <span style={{ color: "#FF6B8A", fontStyle: "italic" }}>
                  অনুপ্রাণিত
                </span>{" "}
                আমরা
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#555555",
                  margin: 0,
                }}
              >
                প্রতিটি মেসেজ, প্রতিটি প্রশংসা আমাদের আরও ভালো করার অনুপ্রেরণা
                দেয়। আপনার বিশ্বাসই আমাদের সবচেয়ে বড় শক্তি।
              </p>

              <Link
                href="/about"
                className="testi-cta-btn"
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
                আমাদের সম্পর্কে জানতে
                <FiArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================
            MOBILE LAYOUT (≤ 768px)
            Top: Text Card
            Bottom: 2-Column Chat Images
        ============================================================ */}
        <div className="testi-mobile-layout">
          {/* ===== Text Card ===== */}
          <div
            className="testi-text-card"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              padding: "40px 32px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              boxShadow: "0 8px 30px rgba(255, 107, 138, 0.08)",
              border: "1.5px solid rgba(255, 107, 138, 0.15)",
              position: "relative",
              zIndex: 5,
            }}
          >
            <div
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

            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(24px, 3vw, 34px)",
                fontWeight: 600,
                color: "#1A1A1A",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              আপনার ভালোবাসায়{" "}
              <span style={{ color: "#FF6B8A", fontStyle: "italic" }}>
                অনুপ্রাণিত
              </span>{" "}
              আমরা
            </h2>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#555555",
                margin: 0,
                maxWidth: "560px",
              }}
            >
              প্রতিটি মেসেজ, প্রতিটি প্রশংসা আমাদের আরও ভালো করার অনুপ্রেরণা
              দেয়। আপনার বিশ্বাসই আমাদের সবচেয়ে বড় শক্তি।
            </p>

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
                minHeight: "44px",
              }}
            >
              আমাদের সম্পর্কে জানতে
              <FiArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>

          {/* ===== CURVED SEPARATOR (Mobile only) ===== */}
          <div
            className="testi-curved-separator"
            style={{
              position: "relative",
              width: "100%",
              height: "50px",
              marginTop: "16px",
              marginBottom: "-12px",
              zIndex: 3,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            {/* 
              Curved shape via border-radius
              Creates a smooth upward arc between text card and image grid
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
                boxShadow: "0 -10px 30px rgba(255, 107, 138, 0.06)",
              }}
            />
          </div>

          {/* ===== 2-Column Chat Images ===== */}
          <div
            className="testi-images-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              position: "relative",
              height: "420px",
              overflow: "hidden",
              marginTop: "24px",
            }}
          >
            {/* LEFT COLUMN (Bottom → Top) */}
            <div
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
                  gap: "12px",
                  animation: "verticalScrollUp 30s linear infinite",
                }}
              >
                {[...row1Images, ...row1Images, ...row1Images].map(
                  (img, index) => (
                    <div
                      key={`left-${index}`}
                      style={{
                        flexShrink: 0,
                        width: "100%",
                        aspectRatio: "2 / 3",
                        borderRadius: "12px",
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
                        sizes="150px"
                        unoptimized
                      />
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* RIGHT COLUMN (Top → Bottom) */}
            <div
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
                  gap: "12px",
                  animation: "verticalScrollDown 30s linear infinite",
                }}
              >
                {[...row2Images, ...row2Images, ...row2Images].map(
                  (img, index) => (
                    <div
                      key={`right-${index}`}
                      style={{
                        flexShrink: 0,
                        width: "100%",
                        aspectRatio: "2 / 3",
                        borderRadius: "12px",
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
                        sizes="150px"
                        unoptimized
                      />
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Edge fades */}
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
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60px",
                background:
                  "linear-gradient(0deg, #FFF8F9 0%, transparent 100%)",
                pointerEvents: "none",
                zIndex: 5,
              }}
            />
          </div>
        </div>
      </div>

      {/* ===== CSS ===== */}
      <style jsx>{`
        /* ===== DESKTOP Animations ===== */
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

        /* ===== MOBILE Animations ===== */
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

        /* ===== DEFAULT: Desktop Layout Visible, Mobile Hidden ===== */
        .testi-desktop-layout {
          display: block;
        }

        .testi-mobile-layout {
          display: none;
        }
        /* Curved Separator — only visible on mobile */
        .testi-curved-separator {
          display: none;
        }

        /* ===== TABLET (max 1024px) ===== */
        @media (max-width: 1024px) {
          .testimonials-section {
            padding: 60px 20px !important;
          }

          .testimonials-container {
            height: 450px !important;
            border-radius: 24px !important;
          }

          .testi-right-panel {
            padding: 32px 32px 32px 40px !important;
          }

          .scroll-row-right,
          .scroll-row-left {
            animation-duration: 45s !important;
          }
        }

        /* ===== MOBILE (max 768px) ===== */
        @media (max-width: 768px) {
          .testimonials-section {
            padding: 48px 16px !important;
          }

          .testimonials-container {
            height: auto !important;
            min-height: auto !important;
            border-radius: 24px !important;
            padding: 24px 16px !important;
            overflow: visible !important;
          }

          /* Hide Desktop Layout */
          .testi-desktop-layout {
            display: none !important;
          }

          /* Show Mobile Layout */
          .testi-mobile-layout {
            display: block !important;
          }

          .testi-text-card {
            padding: 28px 20px !important;
            border-radius: 20px !important;
            gap: 16px !important;
          }

          /* Show curved separator on mobile */
          .testi-curved-separator {
            display: block !important;
          }

          .testi-images-grid {
            height: 400px !important;
            gap: 12px !important;
          }

          .vertical-scroll-up,
          .vertical-scroll-down {
            animation-duration: 20s !important;
          }
        }

        /* ===== SMALL MOBILE (max 480px) ===== */
        @media (max-width: 480px) {
          .testimonials-section {
            padding: 40px 12px !important;
          }

          .testimonials-container {
            padding: 20px 12px !important;
            border-radius: 20px !important;
          }

          .testi-text-card {
            padding: 24px 16px !important;
          }

          .testi-images-grid {
            height: 360px !important;
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
