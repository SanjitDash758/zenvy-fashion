"use client";

import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  // SVG circle progress
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="scroll-to-top"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#FF6B8A",
        color: "#FFFFFF",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 30px rgba(255, 107, 138, 0.4)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.8)",
        pointerEvents: isVisible ? "auto" : "none",
        zIndex: 45,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#FF4081";
        e.currentTarget.style.transform = "translateY(-4px) scale(1.08)";
        e.currentTarget.style.boxShadow =
          "0 15px 40px rgba(255, 107, 138, 0.55)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#FF6B8A";
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(255, 107, 138, 0.4)";
      }}
    >
      {/* Progress ring */}
      <svg
        className="progress-ring"
        width="56"
        height="56"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotate(-90deg)",
          pointerEvents: "none",
        }}
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="2"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.1s linear",
          }}
        />
      </svg>

      {/* Arrow icon */}
      <FiArrowUp
        size={22}
        strokeWidth={2.5}
        style={{ position: "relative", zIndex: 2 }}
      />

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 640px) {
          .scroll-to-top {
            bottom: 20px !important;
            right: 20px !important;
            width: 48px !important;
            height: 48px !important;
          }
          .progress-ring {
            width: 48px !important;
            height: 48px !important;
          }
        }
      `}</style>
    </button>
  );
}
