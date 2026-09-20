"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiPackage,
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
import { useCartStore } from "@/store/cartStore";
import { WooProduct } from "@/lib/api";
import SearchModal from "@/components/search/SearchModal";
import QuickAddModal from "@/components/product/QuickAddModal";
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
  { name: "ট্র্যাক অর্ডার", href: "/track-order", icon: FiPackage },
  { name: "About", href: "/about", icon: FiInfo },
];

export default function Header({ products = [] }: { products?: WooProduct[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [isUserHovered, setIsUserHovered] = useState(false);
  // Cart state
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  // Search state
  // Search state
  const [searchOpen, setSearchOpen] = useState(false);

  // Quick Add Modal state (global — usable from any component)
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<WooProduct | null>(
    null,
  );
  const [quickAddVariations, setQuickAddVariations] = useState<any[]>([]);
  const [quickAddMode, setQuickAddMode] = useState<"cart" | "buy">("cart");
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);

  const handleQuickAdd = async (product: WooProduct, mode: "cart" | "buy") => {
    console.log("🟠 handleQuickAdd START:", product.id, mode);
    setLoadingProductId(product.id);

    try {
      const response = await fetch(`/api/variations/${product.id}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const variations = await response.json();

      if (!Array.isArray(variations)) {
        throw new Error("Invalid variations response");
      }

      console.log("🟢 variations fetched:", variations.length);

      // ⚠️ First close search modal
      setSearchOpen(false);

      // Then open QuickAdd modal
      setTimeout(() => {
        setQuickAddProduct(product);
        setQuickAddVariations(variations);
        setQuickAddMode(mode);
        setQuickAddOpen(true);
      }, 100);
    } catch (error: any) {
      console.error("🔴 Error:", error.message);
      alert(`Variation লোড করতে সমস্যা: ${error.message}`);
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleQuickAddClose = () => {
    setQuickAddOpen(false);
    setQuickAddProduct(null);
    setQuickAddVariations([]);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="header-wrapper"
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
          className="header-content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isScrolled ? "10px 32px" : "14px 32px",
            transition: "all 0.3s ease",
            position: "relative",
            gap: "12px",
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
              className="header-logo"
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
            className="header-right-icons"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0px",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Cart Icon */}
            <IconButton
              href="/cart"
              icon={FiShoppingBag}
              badge={mounted && totalItems > 0 ? String(totalItems) : undefined}
            />

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="header-icon-button"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                color: "#333333",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
                flexShrink: 0,
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
              <FiSearch size={20} />
            </button>

            {/* Login/User Icon with hover menu */}
            <div
              className="header-icon-wrapper"
              style={{ position: "relative" }}
              onMouseEnter={() => setIsUserHovered(true)}
              onMouseLeave={() => setIsUserHovered(false)}
            >
              <Link
                href="/login"
                aria-label="Account"
                className="header-icon-button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  color: isUserHovered ? "#FF6B8A" : "#333333",
                  textDecoration: "none",
                  backgroundColor: isUserHovered ? "#FCE4EC" : "transparent",
                  transition: "all 0.25s ease",
                  flexShrink: 0,
                }}
              >
                <FiUser size={20} />
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
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#333333",
                flexShrink: 0,
              }}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
      {/* ===== Search Modal ===== */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
        onQuickAdd={handleQuickAdd}
        loadingProductId={loadingProductId}
      />

      {/* ===== Quick Add Modal (Global) ===== */}
      <QuickAddModal
        product={quickAddProduct}
        variations={quickAddVariations}
        isOpen={quickAddOpen}
        onClose={handleQuickAddClose}
        mode={quickAddMode}
      />

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

        /* ===== TABLET & MOBILE ===== */
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }

        /* ===== MOBILE (max 768px) ===== */
        @media (max-width: 768px) {
          .header-content {
            padding: 8px 16px !important;
            gap: 8px !important;
          }

          .header-logo {
            width: 56px !important;
            height: 56px !important;
            transform: scale(1.1) !important;
          }

          .header-right-icons {
            gap: 0px !important;
          }

          /* ⚠️ 48dp touch target enforced */
          .header-right-icons > * {
            width: 44px !important;
            height: 44px !important;
            min-width: 44px !important;
            min-height: 44px !important;
          }

          .header-right-icons svg {
            width: 18px !important;
            height: 18px !important;
          }
        }

        /* ===== SMALL MOBILE (max 480px) ===== */
        @media (max-width: 480px) {
          .header-content {
            padding: 6px 12px !important;
            gap: 6px !important;
          }

          .header-logo {
            width: 48px !important;
            height: 48px !important;
            transform: scale(1.05) !important;
          }

          .header-right-icons {
            gap: 0px !important;
          }

          /* ⚠️ Still maintain 44dp minimum for Android */
          .header-right-icons > * {
            width: 42px !important;
            height: 42px !important;
            min-width: 42px !important;
            min-height: 42px !important;
          }

          .header-right-icons svg {
            width: 17px !important;
            height: 17px !important;
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
      <Icon size={20} />
      {badge && (
        <span
          style={{
            position: "absolute",
            top: "-2px",
            right: "-2px",
            backgroundColor: "#FF6B8A",
            color: "#FFFFFF",
            fontSize: "10px",
            fontWeight: 600,
            borderRadius: "999px",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(255, 107, 138, 0.3)",
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
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    color: "#333333",
    textDecoration: "none",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "all 0.25s ease",
    flexShrink: 0,
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
