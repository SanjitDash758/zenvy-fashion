"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const categories = [
  {
    name: "কাতান",
    englishName: "Katan",
    slug: "katan",
    count: 12,
    image: "/images/slider1.jpg",
  },
  {
    name: "জামদানী",
    englishName: "Jamdani",
    slug: "jamdani",
    count: 8,
    image: "/images/slider2.jpg",
  },
  {
    name: "চাঁদনী সিল্ক",
    englishName: "Chandni Silk",
    slug: "chandni-silk",
    count: 15,
    image: "/images/slider3.jpg",
  },
  {
    name: "ডিজিটাল প্রিন্ট চাঁদনী সিল্ক",
    englishName: "Digital Print",
    slug: "digital-print-chandni-silk",
    count: 10,
    image: "/images/slider4.jpg",
  },
  {
    name: "সুতির শাড়ী",
    englishName: "Cotton Saree",
    slug: "cotton-saree",
    count: 20,
    image: "/images/slider5.jpg",
  },
  {
    name: "হাফ সিল্ক",
    englishName: "Half Silk",
    slug: "half-silk",
    count: 6,
    image: "/images/slider1.jpg",
  },
];

export default function FeaturedCategories() {
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
        }}
      >
        {/* ===== Heading ===== */}
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
            Shop by Category
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
            আমাদের{" "}
            <span
              style={{
                color: "#FF6B8A",
                fontStyle: "italic",
              }}
            >
              শাড়ির
            </span>{" "}
            কালেকশন
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "15px",
              color: "#777777",
              marginTop: "16px",
              margin: 0,
              maxWidth: "560px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            আপনার ছোট্ট রাজকন্যার জন্য প্রতিটি বিশেষ মুহূর্তকে আরও সুন্দর করে
            তুলতে আমাদের নির্বাচিত শাড়ির সংগ্রহ
          </p>
        </div>

        {/* ===== Categories Grid ===== */}
        <div
          className="categories-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/shop?category=${category.slug}`}
              className="category-card"
              style={{
                display: "block",
                textDecoration: "none",
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#FFF8F9",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 24px 60px rgba(255, 107, 138, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.04)";
              }}
            >
              {/* ===== Image Section ===== */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "320px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.6s ease",
                  }}
                  className="category-image"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)",
                    zIndex: 1,
                  }}
                />

                {/* Count badge — top right */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    padding: "6px 14px",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderRadius: "999px",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#FF6B8A",
                    letterSpacing: "0.5px",
                    zIndex: 3,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {category.count}টি পণ্য
                </div>
              </div>

              {/* ===== Info Section ===== */}
              <div
                style={{
                  padding: "24px 24px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                      margin: 0,
                      marginBottom: "4px",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {category.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#999999",
                      margin: 0,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {category.englishName}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div
                  className="category-arrow"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#FF6B8A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(255, 107, 138, 0.3)",
                  }}
                >
                  <FiArrowRight size={18} strokeWidth={2.5} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ===== View All Button ===== */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "56px",
          }}
        >
          <Link
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 36px",
              backgroundColor: "transparent",
              color: "#1A1A1A",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "999px",
              border: "1.5px solid #1A1A1A",
              transition: "all 0.3s ease",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1A1A1A";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(26, 26, 26, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#1A1A1A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            সব ক্যাটেগরি দেখুন
            <FiArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      {/* ===== Responsive CSS ===== */}
      <style jsx>{`
        .category-card:hover .category-image {
          transform: scale(1.08);
        }

        .category-card:hover .category-arrow {
          background-color: #FF4081;
          transform: translateX(4px);
          box-shadow: 0 8px 20px rgba(255, 107, 138, 0.5);
        }

        @media (max-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 640px) {
          .categories-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}