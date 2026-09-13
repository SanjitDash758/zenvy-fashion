"use client";

import Link from "next/link";
import Image from "next/image";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

const categories = [
  { name: "কাতান", slug: "katan" },
  { name: "জামদানী", slug: "jamdani" },
  { name: "জাপানি সিল্ক", slug: "japani-silk" },
  { name: "সুতি শাড়ী", slug: "suti" },
  { name: "হাফ সিল্ক", slug: "half-silk" },
  { name: "কাঞ্জিভরম", slug: "kanchibaram" },
];

const shopBy = [
  { name: "ক্যাটেগরিস", href: "/#product-filter" },
  { name: "প্রিমিয়াম", href: "/?category=half-silk#product-filter" },
  { name: "উৎসব", href: "/?occasion=festival#product-filter" },
];

const getToKnowUs = [
  { name: "About", href: "/about" },
  { name: "Testimonial", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
];

const supportLinks = [
  { name: "অর্ডার ট্র্যাক", href: "/order-tracking" },
  { name: "যোগাযোগ", href: "/contact" },
  { name: "পণ্য খুঁজুন", href: "/#product-filter" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FiFacebook,
    color: "#1877F2",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FiInstagram,
    color: "#E4405F",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: FaTiktok,
    color: "#000000",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: FiYoutube,
    color: "#FF0000",
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "32px 24px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          backgroundColor: "#FFF8F9",
          borderRadius: "24px",
          height: "400px",
          padding: "48px 48px 24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ===== Main Content Area (Position Relative) ===== */}
        <div
          className="footer-main"
          style={{
            position: "relative",
            flex: 1,
            width: "100%",
          }}
        >
          {/* ===== LEFT GROUP: Categories + Shop By ===== */}
          <div
            className="footer-left-group"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "35%",
              display: "flex",
              gap: "32px",
            }}
          >
            {/* Categories */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  margin: 0,
                  marginBottom: "16px",
                  letterSpacing: "0.5px",
                }}
              >
                Categories
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/?category=${cat.slug}#product-filter`}
                      className="footer-link"
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#666666",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                        display: "inline-block",
                      }}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop By */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  margin: 0,
                  marginBottom: "16px",
                  letterSpacing: "0.5px",
                }}
              >
                Shop By
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {shopBy.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="footer-link"
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#666666",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                        display: "inline-block",
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ===== CENTER: Logo Section (Absolute Center) ===== */}
          <div
            className="footer-center-group"
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <Image
                src="/ZenvyFashion-Logo.png"
                alt="ZenvyFashion Logo"
                width={180}
                height={180}
                style={{
                  objectFit: "contain",
                  width: "140px",
                  height: "140px",
                }}
                priority
              />
            </Link>

            {/* Subtitle 1 */}
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "15px",
                fontWeight: 600,
                color: "#1A1A1A",
                margin: 0,
                marginTop: "4px",
                marginBottom: "4px",
                letterSpacing: "0.3px",
                lineHeight: 1.3,
              }}
            >
              Zenvy —{" "}
              <span
                style={{
                  color: "#FF6B8A",
                  fontStyle: "italic",
                }}
              >
                Where Style Meets Confidence
              </span>
            </p>

            {/* Subtitle 2 */}
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                color: "#999999",
                margin: 0,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Modern &nbsp;|&nbsp; Elegant &nbsp;|&nbsp; Affordable Luxury
            </p>

            {/* Social Icons */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666666",
                      transition: "all 0.3s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.color = "#FFFFFF";
                      e.currentTarget.style.borderColor = social.color;
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 6px 16px ${social.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.color = "#666666";
                      e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.06)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ===== RIGHT GROUP: Get to know Us + Support ===== */}
          <div
            className="footer-right-group"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "35%",
              display: "flex",
              gap: "60px",
              justifyContent: "space-between",
            }}
          >
            {/* Get to know Us */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  margin: 0,
                  marginBottom: "16px",
                  letterSpacing: "0.5px",
                }}
              >
                Get to know Us
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {getToKnowUs.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="footer-link"
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#666666",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                        display: "inline-block",
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  margin: 0,
                  marginBottom: "16px",
                  letterSpacing: "0.5px",
                }}
              >
                Support
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {supportLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="footer-link"
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#666666",
                        textDecoration: "none",
                        transition: "all 0.25s ease",
                        display: "inline-block",
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== Copyright Bar ===== */}
        <div
          style={{
            paddingTop: "20px",
            marginTop: "20px",
            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              color: "#999999",
              margin: 0,
              letterSpacing: "0.3px",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "#FF6B8A", fontWeight: 600 }}>
              ZenvyFashion
            </span>{" "}
            — All rights reserved. Made with{" "}
            <span style={{ color: "#FF4081" }}>♥</span> in Bangladesh
          </p>
        </div>
      </div>

      {/* ===== CSS ===== */}
      <style jsx>{`
        .footer-link:hover {
          color: #ff6b8a !important;
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .footer-left-group,
          .footer-right-group {
            width: 30% !important;
          }
          .footer-center-group {
            width: 35% !important;
          }
        }

        @media (max-width: 768px) {
          .footer-main {
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
          }
          .footer-left-group,
          .footer-right-group,
          .footer-center-group {
            position: static !important;
            transform: none !important;
            width: 100% !important;
          }
          .footer-left-group,
          .footer-right-group {
            justify-content: space-between !important;
          }
        }
      `}</style>
    </footer>
  );
}
