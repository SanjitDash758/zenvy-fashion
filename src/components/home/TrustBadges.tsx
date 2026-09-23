"use client";

import { FiCheckCircle, FiTruck, FiUsers, FiRefreshCw } from "react-icons/fi";

const badges = [
  {
    icon: FiCheckCircle,
    title: "রেডি টু ওয়্যার",
    subtitle: "সেলাই করা, পরানো সহজ",
  },
  {
    icon: FiTruck,
    title: "ক্যাশ অন ডেলিভারি",
    subtitle: "৬৪ জেলায় সুবিধা",
  },
  {
    icon: FiUsers,
    title: "০-১৫ বছর",
    subtitle: "সব বয়সীদের জন্য",
  },
  {
    icon: FiRefreshCw,
    title: "সহজ রিটার্ন",
    subtitle: "৭ দিনের মধ্যে",
  },
];

export default function TrustBadges() {
  return (
    <section
      style={{
        width: "100%",
        padding: "80px 24px",
        backgroundColor: "#FFF8F9",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Heading */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "56px",
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
            Why Choose Us
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
            কেন{" "}
            <span
              style={{
                color: "#FF6B8A",
                fontStyle: "italic",
              }}
            >
              আমাদের
            </span>{" "}
            বেছে নেবেন?
          </h2>
        </div>

        {/* Badges Grid */}
        <div
          className="trust-badges-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="trust-badge-item"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px 24px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  border: "1px solid rgba(255, 107, 138, 0.08)",
                  boxShadow: "0 4px 20px rgba(255, 107, 138, 0.06)",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 50px rgba(255, 107, 138, 0.18)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 107, 138, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(255, 107, 138, 0.06)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 107, 138, 0.08)";
                }}
              >
                {/* Decorative top-left accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "60px",
                    height: "60px",
                    background:
                      "radial-gradient(circle at top left, rgba(255, 107, 138, 0.12), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #FF6B8A 0%, #FF4081 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    boxShadow: "0 8px 24px rgba(255, 107, 138, 0.3)",
                    transition: "transform 0.35s ease",
                    flexShrink: 0,
                  }}
                  className="trust-badge-icon"
                >
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    margin: 0,
                    letterSpacing: "0.2px",
                  }}
                >
                  {badge.title}
                </h3>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#777777",
                    margin: 0,
                    lineHeight: 1.5,
                    letterSpacing: "0.2px",
                  }}
                >
                  {badge.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .trust-badges-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .trust-badges-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }

        .trust-badge-item:hover .trust-badge-icon {
          transform: scale(1.1) rotate(-5deg);
        }
      `}</style>
    </section>
  );
}
