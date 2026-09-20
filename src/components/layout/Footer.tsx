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
  { name: "অর্ডার ট্র্যাক", href: "/track-order" },
  { name: "যোগাযোগ", href: "/contact" },
  { name: "পণ্য খুঁজুন", href: "/#product-filter" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1FCevZBWbb/",
    icon: FiFacebook,
    color: "#1877F2",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@zenvyfashionbd",
    icon: FaTiktok,
    color: "#000000",
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
        className="footer-container"
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
        {/* ===== Main Content Area ===== */}
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
                className="footer-section-title"
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
                className="footer-section-title"
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

          {/* ===== CENTER: Logo Section ===== */}
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
                className="footer-logo"
              />
            </Link>

            {/* Subtitle 1 */}
            <p
              className="footer-subtitle-1"
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
              className="footer-subtitle-2"
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
              className="footer-social-icons"
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
                    className="footer-social-icon"
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
                className="footer-section-title"
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
                className="footer-section-title"
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
          className="footer-copyright-wrapper"
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
            className="footer-copyright"
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

        /* ===== TABLET (max 1024px) ===== */
        @media (max-width: 1024px) {
          .footer-left-group,
          .footer-right-group {
            width: 30% !important;
          }
          .footer-center-group {
            width: 35% !important;
          }
        }

        /* ===== MOBILE (max 768px) ===== */
        @media (max-width: 768px) {
          .footer-container {
            height: auto !important;
            min-height: auto !important;
            padding: 32px 20px 24px !important;
            border-radius: 20px !important;
          }

          .footer-main {
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
            position: relative !important;
            height: auto !important;
          }

          /* Row 1: Categories + Shop By — 2 Columns */
          .footer-left-group {
            position: static !important;
            transform: none !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            gap: 16px !important;
            order: 1 !important;
            padding: 0 !important;
          }

          .footer-left-group > div:first-child {
            flex: 0 0 55% !important;
            width: 55% !important;
          }

          .footer-left-group > div:last-child {
            flex: 0 0 40% !important;
            width: 40% !important;
            text-align: right !important;
          }

          /* Row 2: Logo Section — Full Width Centered */
          /* Row 2: Logo Section — Full Width Centered */
          .footer-center-group {
            position: static !important;
            transform: none !important;
            width: 100% !important;
            order: 2 !important;
            margin-top: 16px !important;
            margin-bottom: 16px !important;
            padding: 16px 0 12px 0 !important;
            border-top: 1px solid rgba(255, 107, 138, 0.15) !important;
            border-bottom: 1px solid rgba(255, 107, 138, 0.15) !important;
            align-items: center !important;
            text-align: center !important;
          }

          .footer-logo {
            width: 100px !important;
            height: 100px !important;
          }

          .footer-subtitle-1 {
            font-size: 14px !important;
            line-height: 1.5 !important;
            max-width: 280px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .footer-subtitle-2 {
            font-size: 8px !important;
            letter-spacing: 1.5px !important;
          }

          .footer-social-icons {
            gap: 10px !important;
            margin-top: 16px !important;
          }

          .footer-social-icon {
            width: 40px !important;
            height: 40px !important;
          }

          /* Row 3: Get to know Us + Support — 2 Columns */
          .footer-right-group {
            position: static !important;
            transform: none !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            gap: 16px !important;
            order: 3 !important;
            padding: 0 !important;
          }

          .footer-right-group > div:first-child {
            flex: 0 0 55% !important;
            width: 55% !important;
          }

          .footer-right-group > div:last-child {
            flex: 0 0 40% !important;
            width: 40% !important;
            text-align: right !important;
          }
          /* Section Titles */
          .footer-section-title {
            font-size: 16px !important;
            margin-bottom: "12px" !important;
          }

          /* Links */
          .footer-link {
            font-size: 13px !important;
            line-height: 1.8 !important;
          }

          /* Copyright */
          .footer-copyright-wrapper {
            margin-top: 24px !important;
            padding-top: 20px !important;
          }

          .footer-copyright {
            font-size: 11px !important;
            line-height: 1.6 !important;
          }
        }

        /* ===== SMALL MOBILE (max 480px) ===== */
        @media (max-width: 480px) {
          .footer-container {
            padding: 20px 16px 16px !important;
            border-radius: 16px !important;
          }

          .footer-center-group {
            margin-top: 12px !important;
            margin-bottom: 12px !important;
            padding: 12px 0 10px 0 !important;
          }
          .footer-logo {
            width: 88px !important;
            height: 88px !important;
          }

          .footer-subtitle-1 {
            font-size: 13px !important;
          }

          .footer-subtitle-2 {
            font-size: 7px !important;
            letter-spacing: 1.2px !important;
          }

          .footer-section-title {
            font-size: 15px !important;
            margin-bottom: 10px !important;
          }

          .footer-link {
            font-size: 12px !important;
            line-height: 1.7 !important;
          }

          .footer-social-icon {
            width: 36px !important;
            height: 36px !important;
          }

          .footer-copyright {
            font-size: 10px !important;
          }
        }
      `}</style>
    </footer>
  );
}
