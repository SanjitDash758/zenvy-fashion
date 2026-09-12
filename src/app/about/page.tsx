"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FiArrowRight,
  FiHeart,
  FiAward,
  FiStar,
  FiUsers,
  FiTruck,
  FiGrid,
  FiCalendar,
} from "react-icons/fi";

const values = [
  {
    icon: FiAward,
    title: "কোয়ালিটি",
    subtitle: "প্রিমিয়াম ফেব্রিক, যত্নে সেলাই করা",
    color: "#FF6B8A",
  },
  {
    icon: FiHeart,
    title: "যত্ন",
    subtitle: "প্রতিটি ডেলিভারিতে বিশেষ প্যাকেজিং",
    color: "#E91E63",
  },
  {
    icon: FiStar,
    title: "ঐতিহ্য",
    subtitle: "বাংলার ঐতিহ্যবাহী ডিজাইনের ছোঁয়া",
    color: "#FF4081",
  },
];

const stats = [
  { icon: FiUsers, number: "১০০০+", label: "সন্তুষ্ট ক্রেতা" },
  { icon: FiTruck, number: "৬৪", label: "জেলায় ডেলিভারি" },
  { icon: FiGrid, number: "৫০+", label: "ইউনিক ডিজাইন" },
  { icon: FiCalendar, number: "৩+", label: "বছরের অভিজ্ঞতা" },
];

export default function AboutPage() {
  return (
    <main>
      {/* ============================================================
          SECTION 1: HERO
      ============================================================ */}
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
            height: "clamp(420px, 60vh, 560px)",
            borderRadius: "32px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/zenvy-banner.jpg"
            alt="ZenvyFashion Banner"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "40px 24px 32px",
              zIndex: 2,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "7px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "999px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                color: "#FFFFFF",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginTop: "60px",
                marginBottom: "16px",
              }}
            >
              ✦ About Us
            </span>

            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: "0.5px",
                textShadow: "0 4px 30px rgba(0,0,0,0.4)",
                maxWidth: "720px",
              }}
            >
              শৈশবের প্রতি{" "}
              <span style={{ fontStyle: "italic", color: "#FFD1DC" }}>
                ভালোবাসা
              </span>{" "}
              থেকে জন্ম
            </h1>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(12px, 1.1vw, 15px)",
                color: "rgba(255, 255, 255, 0.9)",
                marginTop: "16px",
                maxWidth: "560px",
                lineHeight: 1.7,
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              আমাদের যাত্রা শুরু হয়েছিল একটি ছোট্ট স্বপ্ন নিয়ে — আপনার ছোট্ট
              সোনামনির প্রতিটি বিশেষ মুহূর্ত আরও সুন্দর করে তোলা।
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: OUR STORY
      ============================================================ */}
      <section
        style={{
          width: "100%",
          padding: "72px 24px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          className="about-story"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "56px",
            alignItems: "center",
          }}
        >
          {/* LEFT: Text */}
          <div>
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#FF6B8A",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Our Story
            </span>

            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(26px, 2.8vw, 38px)",
                fontWeight: 600,
                color: "#1A1A1A",
                margin: 0,
                marginBottom: "20px",
                lineHeight: 1.2,
                letterSpacing: "0.3px",
              }}
            >
              একটি ছোট্ট স্বপ্ন থেকে{" "}
              <span style={{ color: "#FF6B8A", fontStyle: "italic" }}>
                বড় যাত্রা
              </span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                lineHeight: 1.75,
                color: "#555555",
                margin: 0,
                marginBottom: "16px",
              }}
            >
              ২০২৩ সালে একটি ছোট্ট স্বপ্ন নিয়ে যাত্রা শুরু — আমাদের ছোট্ট
              সোনামনিদের জন্য এমন শাড়ি বানানো, যা তারা নিজে নিজে পরতে পারবে।
              কারণ আমরা বিশ্বাস করি, প্রতিটি শিশুর বিশেষ মুহূর্ত আরও সুন্দর
              হওয়া উচিত।
            </p>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                lineHeight: 1.75,
                color: "#555555",
                margin: 0,
                marginBottom: "24px",
              }}
            >
              আজ আমরা গর্বিত যে বাংলাদেশের ৬৪ জেলায় আমাদের সন্তুষ্ট ক্রেতা
              রয়েছে, যারা তাদের ছোট্ট রাজকন্যাদের জন্য আমাদের ওপর ভরসা রাখেন।
            </p>

            <Link
              href="/shop"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 26px",
                backgroundColor: "#FF6B8A",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "999px",
                boxShadow: "0 10px 30px rgba(255, 107, 138, 0.35)",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
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
                  "0 10px 30px rgba(255, 107, 138, 0.35)";
              }}
            >
              আমাদের কালেকশন দেখুন
              <FiArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>

          {/* RIGHT: Image — smaller */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1.15",
              maxWidth: "440px",
              marginLeft: "auto",
              width: "100%",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 30px 70px rgba(255, 107, 138, 0.15)",
            }}
          >
            <Image
              src="/images/zenvy-banner.jpg"
              alt="Our Story"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 440px"
            />

            {/* Decorative badge */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6B8A 0%, #FF4081 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                boxShadow: "0 15px 40px rgba(255, 107, 138, 0.4)",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                ৩+
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "8px",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginTop: "3px",
                }}
              >
                Years
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: VALUES
      ============================================================ */}
      <section
        style={{
          width: "100%",
          padding: "72px 24px",
          backgroundColor: "#FFF8F9",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          {/* Heading */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "44px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#FF6B8A",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Our Values
            </span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(26px, 2.8vw, 38px)",
                fontWeight: 600,
                color: "#1A1A1A",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "0.3px",
              }}
            >
              আমাদের{" "}
              <span style={{ color: "#FF6B8A", fontStyle: "italic" }}>
                মূল্যবোধ
              </span>
            </h2>
          </div>

          {/* Values Grid */}
          <div
            className="values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="value-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "22px",
                    padding: "32px 24px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    border: "1px solid rgba(255, 107, 138, 0.08)",
                    transition: "all 0.35s ease",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 50px rgba(255, 107, 138, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0, 0, 0, 0.04)";
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${value.color} 0%, ${value.color}CC 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      boxShadow: `0 12px 32px ${value.color}40`,
                    }}
                  >
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#1A1A1A",
                      margin: 0,
                      letterSpacing: "0.3px",
                    }}
                  >
                    {value.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#777777",
                      margin: 0,
                    }}
                  >
                    {value.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: STATS
      ============================================================ */}
      <section
        style={{
          width: "100%",
          padding: "64px 24px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFF8F9",
                  borderRadius: "20px",
                  padding: "28px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "12px",
                  border: "1px solid rgba(255, 107, 138, 0.08)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFE5EC";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFF8F9";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Icon size={22} style={{ color: "#FF6B8A" }} />

                <span
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "#1A1A1A",
                    lineHeight: 1,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {stat.number}
                </span>

                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#777777",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SECTION 5: PROMISE / CTA
      ============================================================ */}
      <section
        style={{
          width: "100%",
          padding: "72px 24px 96px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            position: "relative",
            background: "linear-gradient(135deg, #FF6B8A 0%, #FF4081 100%)",
            borderRadius: "28px",
            padding: "56px 40px",
            overflow: "hidden",
            textAlign: "center",
            boxShadow: "0 30px 80px rgba(255, 107, 138, 0.3)",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.08)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-110px",
              left: "-70px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.06)",
              pointerEvents: "none",
            }}
          />

          {/* Dot pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "999px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                color: "#FFFFFF",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              <FiHeart size={11} fill="#FFFFFF" />
              Our Promise
            </span>

            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(26px, 3.5vw, 44px)",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: "0.5px",
                maxWidth: "640px",
                textShadow: "0 4px 30px rgba(0,0,0,0.15)",
              }}
            >
              আপনার ছোট্ট রাজকন্যার সাজে{" "}
              <span style={{ fontStyle: "italic", color: "#FFE5EC" }}>
                আমরা প্রতিশ্রুতিবদ্ধ
              </span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "rgba(255, 255, 255, 0.92)",
                margin: 0,
                maxWidth: "520px",
              }}
            >
              প্রতিটি শাড়ি যত্নে বাছাই করা, প্রতিটি ডেলিভারি যত্নে প্যাক করা —
              কারণ আপনার ভালোবাসাই আমাদের সবচেয়ে বড় শক্তি।
            </p>

            <Link
              href="/shop"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 34px",
                backgroundColor: "#FFFFFF",
                color: "#FF6B8A",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: "999px",
                marginTop: "10px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-3px) scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 0, 0, 0.2)";
              }}
            >
              শপিং শুরু করুন
              <FiArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CSS ===== */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .about-story {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .values-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
