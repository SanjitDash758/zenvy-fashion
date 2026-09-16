"use client";

import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

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

export default function StickySocial() {
  return (
    <div
      className="sticky-social"
      style={{
        position: "fixed",
        right: "5px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        pointerEvents: "auto",
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
            className="sticky-social-icon"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: social.color,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              boxShadow: `0 8px 20px ${social.color}40`,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15) translateX(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 30px ${social.color}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) translateX(0)";
              e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}40`;
            }}
          >
            <Icon size={18} />
          </a>
        );
      })}

      {/* Decorative vertical line */}
      <div
        style={{
          width: "2px",
          height: "40px",
          backgroundColor: "rgba(255, 107, 138, 0.2)",
          margin: "8px auto 0",
          borderRadius: "2px",
        }}
      />

      <style jsx>{`
        @media (max-width: 1024px) {
          .sticky-social {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
