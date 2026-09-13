"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ⚠️ আপনার নিজের ডিজাইনের slider images
const sliderImages = [
  "/images/কাতান-৪-মেরুন.jpg",
  "/images/কাতান-৭-হলুদ.jpg",
  "/images/জামদানী-১-অফ-হোয়াইট.jpg",
  "/images/সুতি-শাড়ী-৯.png",
  "/images/হাফ-সিল্ক-১.jpg",
];

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

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Typing effects
  const line1 = useTypewriter("ছোট্ট সোনামনির সাজে", 70, 300);
  const line2 = useTypewriter("বাংলালিয়ানার ছোঁয়া", 70, 1800);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        width: "100%",
        padding: "24px 24px 0",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
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
            SVG DEFINITIONS: Clip paths for curved shapes
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
            LEFT PANEL: Image + Text + CTA
        ============================================================ */}
        <div
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
          {/* Background image — সুতি-শাড়ী-৮.png */}
          <Image
            src="/images/Hero-Left.png"
            alt="Little girl wearing traditional saree"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center top",
            }}
            priority
            unoptimized
          />

          {/* Elegant gradient overlay for text readability */}
          <div
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
            {/* Heading with Typing Effect */}
            <h1
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

        {/* ============================================================
            RIGHT PANEL: Slider (overlaps left panel)
        ============================================================ */}
        <div
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
          {/* Slider Images — আপনার নিজের ডিজাইনের ছবি */}
          {sliderImages.map((img, index) => (
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
                alt={`Premium baby saree collection ${index + 1}`}
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
          ))}

          {/* Premium Saree Badge — top right */}
          <div
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
              zIndex: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            ✦ Premium Saree
          </div>

          {/* Slider Dots */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              right: "32px",
              display: "flex",
              gap: "8px",
              zIndex: 10,
            }}
          >
            {sliderImages.map((_, index) => (
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

          {/* Bottom-right counter */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "calc(50% + 40px)",
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.95)",
              textShadow: "0 1px 10px rgba(0,0,0,0.5)",
              letterSpacing: "1px",
              zIndex: 3,
            }}
          >
            {String(currentSlide + 1).padStart(2, "0")}
            <span style={{ opacity: 0.6, margin: "0 4px" }}>/</span>
            {String(sliderImages.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* CSS Keyframes for typing cursor blink */}
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
      `}</style>
    </section>
  );
}
