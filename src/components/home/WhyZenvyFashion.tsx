"use client";

import { useState, useEffect, useRef } from "react";
import { FiUsers, FiTruck, FiGrid, FiCalendar } from "react-icons/fi";

// ===== Stats Data =====
const stats = [
  {
    icon: FiUsers,
    target: 1000,
    suffix: "+",
    label: "সন্তুষ্ট ক্রেতা",
    prefix: "",
  },
  {
    icon: FiTruck,
    target: 64,
    suffix: "",
    label: "জেলায় ডেলিভারি",
    prefix: "",
  },
  { icon: FiGrid, target: 50, suffix: "+", label: "ইউনিক ডিজাইন", prefix: "" },
  {
    icon: FiCalendar,
    target: 3,
    suffix: "+",
    label: "বছরের অভিজ্ঞতা",
    prefix: "",
  },
];

// ===== Custom Hook: Count up when element is visible =====
function useCountUp(
  target: number,
  duration: number = 2000,
  start: boolean = false,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic for smooth ending
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return count;
}

// ===== Individual Stat Card (uses the hook) =====
function StatCard({
  icon: Icon,
  target,
  suffix,
  label,
  isVisible,
  delay,
}: {
  icon: any;
  target: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}) {
  const [shouldStart, setShouldStart] = useState(false);
  const count = useCountUp(target, 2000, shouldStart);

  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => setShouldStart(true), delay);
      return () => clearTimeout(t);
    }
  }, [isVisible, delay]);

  return (
    <div
      className="stat-card"
      style={{
        backgroundColor: "#FFF8F9",
        borderRadius: "24px",
        padding: "36px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "14px",
        border: "1px solid rgba(255, 107, 138, 0.08)",
        transition: "all 0.35s ease",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#FFE5EC";
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 20px 50px rgba(255, 107, 138, 0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#FFF8F9";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.03)";
      }}
    >
      {/* Icon */}
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
          boxShadow: "0 10px 30px rgba(255, 107, 138, 0.3)",
        }}
      >
        <Icon size={24} strokeWidth={1.8} />
      </div>

      {/* Number — animated */}
      <span
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "48px",
          fontWeight: 700,
          color: "#1A1A1A",
          lineHeight: 1,
          letterSpacing: "-0.5px",
          minHeight: "48px",
        }}
      >
        {count.toLocaleString("bn-BD")}
        {suffix && (
          <span
            style={{
              color: "#FF6B8A",
              fontSize: "36px",
              marginLeft: "2px",
            }}
          >
            {suffix}
          </span>
        )}
      </span>

      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          color: "#777777",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function WhyZenvyFashion() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Observe when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        padding: "80px 24px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* ===== Heading ===== */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#FF6B8A",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            ✦ Why ZenvyFashion
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(28px, 3vw, 42px)",
              fontWeight: 600,
              color: "#1A1A1A",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "0.3px",
            }}
          >
            কেন আমাদের{" "}
            <span style={{ color: "#FF6B8A", fontStyle: "italic" }}>
              বেছে নেবেন
            </span>
            ?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "14px",
              color: "#777777",
              marginTop: "14px",
              margin: 0,
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            আমাদের সংখ্যাগুলোই বলে দেয় — আমরা কতটা যত্ন নিয়ে আপনার ছোট্ট
            সোনামনির জন্য কাজ করি
          </p>
        </div>

        {/* ===== Stats Grid ===== */}
        <div
          className="why-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              icon={stat.icon}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={isVisible}
              delay={i * 150}
            />
          ))}
        </div>
      </div>

      {/* ===== CSS ===== */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .why-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .why-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
