"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiHome,
  FiInfo,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

// Fix: dropdown hrefs previously combined a query string AND a hash
// (e.g. "/?category=katan#product-filter"). Next.js's <Link> races the
// hash-scroll against the query-driven re-render, which swallowed the
// filter update on the first click and only worked on the second. The
// ProductFilter component already scrollIntoView()s itself once it sees
// a new category param, so the hash fragment isn't needed here at all.
const navLinks = [
  { name: "Home", href: "/", icon: FiHome },
  {
    name: "Products",
    href: "/#product-filter",
    icon: FiShoppingBag,
    dropdown: [
      { name: "কাতান", href: "/?category=katan#product-filter" },
      { name: "জামদানী", href: "/?category=jamdani#product-filter" },
      { name: "জাপানি সিল্ক", href: "/?category=japani-silk#product-filter" },
      { name: "সুতি শাড়ী", href: "/?category=suti#product-filter" },
      { name: "হাফ সিল্ক", href: "/?category=half-silk#product-filter" },
      { name: "কাঞ্জিভরম", href: "/?category=kanchibaram#product-filter" },
    ],
  },
  { name: "About", href: "/about", icon: FiInfo },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [isUserHovered, setIsUserHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "16px 24px",
        pointerEvents: "none",
      }}
    >
      <header
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "60px",
          boxShadow: isScrolled
            ? "0 10px 40px rgba(255, 107, 138, 0.15)"
            : "0 4px 20px rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(255, 107, 138, 0.15)",
          transition: "all 0.3s ease",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isScrolled ? "10px 32px" : "14px 32px",
            transition: "all 0.3s ease",
            position: "relative",
          }}
        >
          {/* ===== LOGO ===== */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Image
              src="/ZenvyFashion-Logo.png"
              alt="ZenvyFashion Logo"
              width={90}
              height={90}
              style={{
                width: isScrolled ? "70px" : "90px",
                height: isScrolled ? "70px" : "90px",
                transition: "all 0.3s ease",
                transform: "scale(1.3)",
                transformOrigin: "left center",
              }}
              priority
            />
          </Link>

          {/* ===== CENTER NAVIGATION ===== */}
          <nav
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isDropdown = !!link.dropdown;

              return (
                <div
                  key={link.name}
                  style={{ position: "relative" }}
                  onMouseEnter={() =>
                    isDropdown && setHoveredDropdown(link.name)
                  }
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      borderRadius: "40px",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#333333",
                      textDecoration: "none",
                      letterSpacing: "0.3px",
                      transition: "all 0.25s ease",
                      backgroundColor:
                        hoveredDropdown === link.name
                          ? "#FCE4EC"
                          : "transparent",
                    }}
                  >
                    <Icon
                      size={16}
                      style={{
                        color: "#FF6B8A",
                      }}
                    />
                    {link.name}
                    {isDropdown && (
                      <FiChevronDown
                        size={14}
                        style={{
                          marginLeft: "2px",
                          transition: "transform 0.25s ease",
                          transform:
                            hoveredDropdown === link.name
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      />
                    )}
                  </Link>

                  {/* ===== PRODUCTS DROPDOWN (centered) ===== */}
                  {isDropdown && hoveredDropdown === link.name && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        paddingTop: "12px",
                        animation: "fadeInCenter 0.25s ease",
                        zIndex: 100,
                      }}
                    >
                      <div
                        style={{
                          minWidth: "200px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "20px",
                          boxShadow: "0 20px 50px rgba(255, 107, 138, 0.2)",
                          border: "1px solid rgba(255, 107, 138, 0.15)",
                          padding: "10px",
                        }}
                      >
                        {link.dropdown!.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            style={{
                              display: "block",
                              padding: "10px 18px",
                              borderRadius: "12px",
                              fontFamily: "var(--font-inter), sans-serif",
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#333333",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#FCE4EC";
                              e.currentTarget.style.color = "#FF6B8A";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color = "#333333";
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ===== RIGHT ICONS ===== */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Cart Icon */}
            <IconButton href="/cart" icon={FiShoppingBag} badge="0" />

            {/* Search Icon */}
            <IconButton icon={FiSearch} isButton />

            {/* Login/User Icon with hover menu */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setIsUserHovered(true)}
              onMouseLeave={() => setIsUserHovered(false)}
            >
              <Link
                href="/login"
                aria-label="Account"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  color: isUserHovered ? "#FF6B8A" : "#333333",
                  textDecoration: "none",
                  backgroundColor: isUserHovered ? "#FCE4EC" : "transparent",
                  transition: "all 0.25s ease",
                }}
              >
                <FiUser size={18} />
              </Link>

              {/* ===== USER DROPDOWN (right-aligned, different animation) ===== */}
              {isUserHovered && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    left: "auto",
                    paddingTop: "12px",
                    animation: "fadeInRight 0.2s ease",
                    zIndex: 100,
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    style={{
                      minWidth: "200px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "16px",
                      boxShadow: "0 20px 50px rgba(255, 107, 138, 0.2)",
                      border: "1px solid rgba(255, 107, 138, 0.15)",
                      padding: "8px",
                    }}
                  >
                    <Link
                      href="/login"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#333333",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#FCE4EC";
                        e.currentTarget.style.color = "#FF6B8A";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#333333";
                      }}
                    >
                      <FiLogIn size={15} />
                      লগইন করুন
                    </Link>

                    <Link
                      href="/register"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#333333",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#FCE4EC";
                        e.currentTarget.style.color = "#FF6B8A";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#333333";
                      }}
                    >
                      <FiUserPlus size={15} />
                      রেজিস্ট্রেশন
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label="Menu"
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#333333",
              }}
            >
              {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        {isMobileMenuOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(255, 107, 138, 0.15)",
              padding: "16px 24px",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#333333",
                        textDecoration: "none",
                        backgroundColor: "#FFF8F9",
                      }}
                    >
                      <Icon size={18} style={{ color: "#FF6B8A" }} />
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div
                        style={{
                          paddingLeft: "32px",
                          marginTop: "4px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                              padding: "8px 16px",
                              fontSize: "14px",
                              color: "#666666",
                              textDecoration: "none",
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* ===== MOBILE: Login & Register ===== */}
              <div
                style={{
                  marginTop: "12px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255, 107, 138, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    backgroundColor: "#FF6B8A",
                    textDecoration: "none",
                  }}
                >
                  <FiLogIn size={16} />
                  লগইন করুন
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#FF6B8A",
                    backgroundColor: "#FFF8F9",
                    border: "1.5px solid #FF6B8A",
                    textDecoration: "none",
                  }}
                >
                  <FiUserPlus size={16} />
                  রেজিস্ট্রেশন করুন
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ===== CSS ANIMATIONS ===== */}
      <style jsx global>{`
        /* Animation for center-aligned dropdowns (Products) */
        @keyframes fadeInCenter {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        /* Animation for right-aligned dropdowns (User) — NO translateX */
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ===== Reusable Icon Button ===== */
function IconButton({
  href,
  icon: Icon,
  badge,
  isButton,
}: {
  href?: string;
  icon: any;
  badge?: string;
  isButton?: boolean;
}) {
  const content = (
    <>
      <Icon size={18} />
      {badge && (
        <span
          style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
            backgroundColor: "#FF6B8A",
            color: "#FFFFFF",
            fontSize: "10px",
            fontWeight: 600,
            borderRadius: "999px",
            width: "16px",
            height: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {badge}
        </span>
      )}
    </>
  );

  const style = {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    color: "#333333",
    textDecoration: "none",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "all 0.25s ease",
  };

  const onMouseEnter = (e: any) => {
    e.currentTarget.style.backgroundColor = "#FCE4EC";
    e.currentTarget.style.color = "#FF6B8A";
  };
  const onMouseLeave = (e: any) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = "#333333";
  };

  if (isButton) {
    return (
      <button
        aria-label="Search"
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href!}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </Link>
  );
}
