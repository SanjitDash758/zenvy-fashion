"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { WooProduct } from "@/lib/api";

interface HeroSectionProps {
  featuredProducts: WooProduct[];
}

// Typing effect hook
function useTypewriter(text: string, speed: number = 80, delay: number = 0) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeout: NodeJS.Timeout;

    const startTyping = () => {
      timeout = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timeout);
          setIsDone(true);
        }
      }, speed);
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearInterval(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay]);

  return { displayed, isDone };
}

export default function HeroSection({ featuredProducts }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Extract image URLs from featured products
  const sliderImages = featuredProducts
    .map((product) => product.images[0]?.src)
    .filter(Boolean) as string[];

  const imagesToShow = sliderImages.length > 0 ? sliderImages : [];

  // ===== DEBUG LOG =====
  console.log("🔵 HeroSection Render:", {
    featuredProductsCount: featuredProducts.length,
    sliderImagesCount: sliderImages.length,
    imagesToShowCount: imagesToShow.length,
    currentSlide: currentSlide,
  });
  // Typing effects
  const line1 = useTypewriter("ছোট্ট সোনামনির সাজে", 70, 300);
  const line2 = useTypewriter("বাংলালিয়ানার ছোঁয়া", 70, 1800);

  // Auto slide
  useEffect(() => {
    if (imagesToShow.length === 0) {
      console.log("⚠️ No images to slide");
      return;
    }

    console.log("🟢 Auto-slide started with", imagesToShow.length, "slides");
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imagesToShow.length);
    }, 4000);
    return () => {
      console.log("🔴 Auto-slide stopped");
      clearInterval(interval);
    };
  }, [imagesToShow.length]);

  return (
    <section
      className="hero-section"
      style={{
        width: "100%",
        padding: "24px 24px 0",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        className="hero-container"
        style={{
          position: "relative",
          maxWidth: "1400px",
          margin: "0 auto",
          height: "calc(100vh - 140px)",
          minHeight: "560px",
          maxHeight: "720px",
          borderRadius: "32px",
          overflow: "hidden",
          backgroundColor: "#F5EFE6",
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
            <clipPath id="leftPanelClip" clipPathUnits="objectBoundingBox">
              <path
                d="M 0 0 
                   L 0.68 0 
                   C 0.58 0.35, 0.58 0.65, 0.68 1 
                   L 0 1 
                   Z"
              />
            </clipPath>

            <clipPath id="rightPanelClip" clipPathUnits="objectBoundingBox">
              <path
                d="M 1 0 
                   L 0.32 0 
                   C 0.22 0.35, 0.22 0.65, 0.32 1 
                   L 1 1 
                   Z"
              />
            </clipPath>
          </defs>
        </svg>

        {/* ============================================================
            RIGHT PANEL: Slider (Desktop: curved, Mobile: full width)
        ============================================================ */}
        <div
          className="hero-slider"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "78%",
            height: "100%",
            clipPath: "url(#rightPanelClip)",
            overflow: "hidden",
            zIndex: 3,
            backgroundColor: "transparent",
          }}
        >
          {imagesToShow.length === 0 ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#F5EFE6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999999",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              কোনো Featured Product নেই
            </div>
          ) : (
            imagesToShow.map((img, index) => (
              <div
                key={img}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: index === currentSlide ? 1 : 0,
                  transition: "opacity 1.2s ease-in-out",
                }}
              >
                <Image
                  src={img}
                  alt={`Featured saree ${index + 1}`}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    transform:
                      index === currentSlide ? "scale(1)" : "scale(1.05)",
                    transition: "transform 4s ease-out",
                  }}
                  priority={index === 0}
                  unoptimized
                />
              </div>
            ))
          )}

          {/* Premium Saree Badge — top right */}
          <div
            className="hero-badge"
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              padding: "8px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: "999px",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "#FF6B8A",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              zIndex: 5,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            ✦ Premium Saree
          </div>

          {/* Gradient Overlay for mobile text readability */}
          <div
            className="hero-mobile-overlay"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.75) 100%)",
              pointerEvents: "none",
              zIndex: 2,
              display: "none",
            }}
          />

          {/* Slider Dots — bottom center */}
          {imagesToShow.length > 1 && (
            <div
              className="hero-dots"
              style={{
                position: "absolute",
                bottom: "32px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "8px",
                zIndex: 10,
              }}
            >
              {imagesToShow.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  style={{
                    width: index === currentSlide ? "32px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor:
                      index === currentSlide
                        ? "#FF6B8A"
                        : "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    transition: "all 0.4s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ============================================================
            LEFT PANEL: Image + Text + CTA
            Desktop: separate panel (left side, curved)
            Mobile: overlay on top of slider (bottom)
        ============================================================ */}
        <div
          className="hero-left-panel"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "70%",
            height: "100%",
            clipPath: "url(#leftPanelClip)",
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          {/* Left Image — first featured product image */}
          {imagesToShow[0] ? (
            <div className="hero-left-image-wrapper">
              <Image
                src={imagesToShow[0]}
                alt="Featured saree"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                priority
                unoptimized
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#F5EFE6",
              }}
            />
          )}

          {/* Gradient overlay (Desktop) */}
          <div
            className="hero-left-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Content */}
          <div
            className="hero-content"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "75%",
              height: "100%",
              padding: "48px 24px 48px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              boxSizing: "border-box",
              zIndex: 2,
            }}
          >
            <h1
              className="hero-heading"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(24px, 2.2vw, 38px)",
                fontWeight: 600,
                lineHeight: 1.25,
                color: "#FFFFFF",
                margin: 0,
                marginBottom: "16px",
                letterSpacing: "0.3px",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                minHeight: "2.5em",
              }}
            >
              <span>
                {line1.displayed}
                {!line1.isDone && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "2px",
                      height: "1em",
                      backgroundColor: "#FFFFFF",
                      marginLeft: "4px",
                      verticalAlign: "middle",
                      animation: "blink 0.8s infinite",
                    }}
                  />
                )}
              </span>
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "#FFD1DC",
                }}
              >
                {line2.displayed}
                {line2.displayed.length > 0 && !line2.isDone && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "2px",
                      height: "1em",
                      backgroundColor: "#FFD1DC",
                      marginLeft: "4px",
                      verticalAlign: "middle",
                      animation: "blink 0.8s infinite",
                    }}
                  />
                )}
              </span>
            </h1>

            <p
              className="hero-subtext"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(11px, 0.85vw, 13px)",
                lineHeight: 1.7,
                color: "rgba(255, 255, 255, 0.95)",
                margin: 0,
                marginBottom: "24px",
                maxWidth: "300px",
                textShadow: "0 1px 10px rgba(0,0,0,0.4)",
                opacity: line2.isDone ? 1 : 0,
                transform: line2.isDone ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.8s ease",
              }}
            >
              ঐতিহ্য, সৌন্দর্য আর ভালোবাসায় সাজুক আপনার ছোট্ট রাজকন্যা।
            </p>

            <Link
              href="/shop"
              className="hero-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 26px",
                backgroundColor: "#FF6B8A",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "999px",
                boxShadow: "0 10px 30px rgba(255, 107, 138, 0.45)",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
                alignSelf: "flex-start",
                opacity: line2.isDone ? 1 : 0,
                transform: line2.isDone ? "translateY(0)" : "translateY(10px)",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.color = "#FF6B8A";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FF6B8A";
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              কালেকশন দেখুন
              <span style={{ fontSize: "15px" }}>→</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        /* ===== MOBILE (max 768px) ===== */
        @media (max-width: 768px) {
          .hero-section {
            padding: 12px 12px 0 !important;
          }

          .hero-container {
            height: 70vh !important;
            min-height: 500px !important;
            max-height: 600px !important;
            border-radius: 24px !important;
          }

          /* Slider — full width */
          .hero-slider {
            width: 100% !important;
            clip-path: none !important;
            border-radius: 24px !important;
            z-index: 1 !important;
          }

          /* Show mobile gradient overlay */
          .hero-mobile-overlay {
            display: block !important;
          }

          /* Left panel — overlay for text content only */
          .hero-left-panel {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            clip-path: none !important;
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
            z-index: 5 !important;
            pointer-events: none !important;
          }

          /* Hide left image wrapper on mobile — only text will show */
          .hero-left-image-wrapper {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
          }

          /* Also hide any direct image in left panel */
          .hero-left-panel > img {
            display: none !important;
          }

          /* Hide the desktop overlay */
          .hero-left-overlay {
            display: none !important;
          }

          /* Content — positioned at bottom */
          .hero-content {
            position: absolute !important;
            bottom: 0 !important;
            top: auto !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            padding: 24px 24px 80px 24px !important;
            justify-content: flex-end !important;
            pointer-events: auto !important;
          }

          .hero-heading {
            font-size: 26px !important;
            margin-bottom: 12px !important;
            text-shadow: 0 2px 15px rgba(0, 0, 0, 0.6) !important;
          }

          .hero-subtext {
            font-size: 13px !important;
            max-width: 100% !important;
            margin-bottom: 18px !important;
            text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5) !important;
          }

          .hero-cta {
            padding: 14px 28px !important;
            font-size: 14px !important;
            min-height: 48px !important;
            box-shadow: 0 8px 24px rgba(255, 107, 138, 0.5) !important;
          }

          /* Badge top position */
          .hero-badge {
            top: 16px !important;
            right: 16px !important;
            font-size: 10px !important;
            padding: 6px 12px !important;
          }

          /* Dots — bottom */
          .hero-dots {
            bottom: 20px !important;
          }
        }

        /* ===== SMALL MOBILE (max 480px) ===== */
        @media (max-width: 480px) {
          .hero-section {
            padding: 8px 8px 0 !important;
          }

          .hero-container {
            height: 75vh !important;
            min-height: 520px !important;
            border-radius: 20px !important;
          }

          .hero-slider {
            border-radius: 20px !important;
          }

          .hero-content {
            padding: 20px 20px 72px 20px !important;
          }

          .hero-heading {
            font-size: 22px !important;
          }

          .hero-subtext {
            font-size: 12px !important;
            margin-bottom: 16px !important;
          }

          .hero-cta {
            padding: 12px 24px !important;
            font-size: 13px !important;
          }

          .hero-badge {
            top: 12px !important;
            right: 12px !important;
            font-size: 9px !important;
            padding: 5px 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
