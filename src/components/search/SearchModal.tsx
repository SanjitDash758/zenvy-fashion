"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiX, FiShoppingBag, FiZap, FiLoader } from "react-icons/fi";
import { WooProduct } from "@/lib/api";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: WooProduct[];
  onQuickAdd: (product: WooProduct, mode: "cart" | "buy") => void;
  loadingProductId: number | null;
}

const popularSearches = ["কাতান", "জামদানী", "সুতি", "হাফ সিল্ক", "কাঞ্জিভরম"];

export default function SearchModal({
  isOpen,
  onClose,
  products,
  onQuickAdd,
  loadingProductId,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WooProduct[]>([]);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mount check for Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Prevent body scroll + ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();

    const filtered = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const categoryMatch = product.categories.some((cat) =>
        cat.name.toLowerCase().includes(searchTerm)
      );
      return nameMatch || categoryMatch;
    });

    setResults(filtered.slice(0, 10));
  }, [query, products]);

  const handlePopularSearch = (term: string) => {
    setQuery(term);
  };

  if (!isOpen || !mounted) return null;

  const getPriceRange = (product: WooProduct) => {
    const minPrice = parseFloat(product.price) || 0;
    const regularPrice = parseFloat(product.regular_price) || 0;

    if (regularPrice > minPrice) {
      return { min: minPrice, max: regularPrice, isRange: true };
    }
    return { min: minPrice, max: minPrice, isRange: false };
  };

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 99998,
          pointerEvents: "auto",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "90vh",
          maxHeight: "90vh",
          backgroundColor: "#FFFFFF",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          pointerEvents: "auto",
        }}
      >
        {/* Header (Fixed) */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexShrink: 0,
            backgroundColor: "#FFFFFF",
          }}
        >
          <FiSearch size={22} style={{ color: "#FF6B8A", flexShrink: 0 }} />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="প্রোডাক্ট খুঁজুন..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "18px",
              fontWeight: 500,
              color: "#1A1A1A",
              backgroundColor: "transparent",
              minWidth: 0,
            }}
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#FFF8F9",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1A1A1A",
              flexShrink: 0,
            }}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: "24px",
            minHeight: 0,
          }}
        >
          {/* Popular Searches */}
          {!query.trim() && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#999999",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  margin: 0,
                  marginBottom: "16px",
                }}
              >
                জনপ্রিয় সার্চ
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handlePopularSearch(term)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#FFF8F9",
                      border: "1.5px solid rgba(255, 107, 138, 0.2)",
                      color: "#1A1A1A",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      borderRadius: "999px",
                      cursor: "pointer",
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {query.trim() && (
            <div>
              {results.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 24px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                    🔍
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#1A1A1A",
                      margin: 0,
                      marginBottom: "8px",
                    }}
                  >
                    কোনো প্রোডাক্ট পাওয়া যায়নি
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "13px",
                      color: "#777777",
                      margin: 0,
                    }}
                  >
                    অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন
                  </p>
                </div>
              ) : (
                <>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "12px",
                      color: "#999999",
                      margin: 0,
                      marginBottom: "16px",
                    }}
                  >
                    {results.length} টি প্রোডাক্ট পাওয়া গেছে
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {results.map((product) => {
                      const priceRange = getPriceRange(product);
                      const productImage =
                        product.images[0]?.src || "/images/placeholder.jpg";

                      return (
                        <SearchResultCard
                          key={product.id}
                          product={product}
                          productImage={productImage}
                          priceRange={priceRange}
                          onClose={onClose}
                          onQuickAdd={onQuickAdd}
                          isLoading={loadingProductId === product.id}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}

// ===== Search Result Card =====
function SearchResultCard({
  product,
  productImage,
  priceRange,
  onClose,
  onQuickAdd,
  isLoading,
}: {
  product: WooProduct;
  productImage: string;
  priceRange: { min: number; max: number; isRange: boolean };
  onClose: () => void;
  onQuickAdd: (product: WooProduct, mode: "cart" | "buy") => void;
  isLoading: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: "16px",
        padding: "12px",
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        onClick={onClose}
        style={{
          position: "relative",
          width: "80px",
          height: "80px",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#F5EFE6",
          flexShrink: 0,
        }}
      >
        <Image
          src={productImage}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="80px"
          unoptimized
        />
      </Link>

      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {product.categories[0] && (
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              color: "#FF6B8A",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
            }}
          >
            {product.categories[0].name}
          </span>
        )}

        <Link
          href={`/product/${product.slug}`}
          onClick={onClose}
          style={{ textDecoration: "none" }}
        >
          <h4
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "#1A1A1A",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h4>
        </Link>

        {/* Price */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "4px",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#FF6B8A",
            }}
          >
            ৳{priceRange.min.toLocaleString("bn-BD")}
          </span>
          {priceRange.isRange && (
            <>
              <span style={{ fontSize: "12px", color: "#999999" }}>-</span>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#FF6B8A",
                }}
              >
                ৳{priceRange.max.toLocaleString("bn-BD")}
              </span>
            </>
          )}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "4px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => onQuickAdd(product, "cart")}
            disabled={isLoading}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 14px",
              backgroundColor: "transparent",
              color: isLoading ? "#CCCCCC" : "#FF6B8A",
              border: `1.5px solid ${isLoading ? "#CCCCCC" : "#FF6B8A"}`,
              borderRadius: "999px",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              cursor: isLoading ? "wait" : "pointer",
            }}
          >
            {isLoading ? (
              <FiLoader
                size={12}
                style={{ animation: "spin 1s linear infinite" }}
              />
            ) : (
              <FiShoppingBag size={12} strokeWidth={2.5} />
            )}
            কার্টে যোগ করুন
          </button>

          <button
            type="button"
            onClick={() => onQuickAdd(product, "buy")}
            disabled={isLoading}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 14px",
              backgroundColor: isLoading ? "#CCCCCC" : "#FF6B8A",
              color: "#FFFFFF",
              border: `1.5px solid ${isLoading ? "#CCCCCC" : "#FF6B8A"}`,
              borderRadius: "999px",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              cursor: isLoading ? "wait" : "pointer",
            }}
          >
            <FiZap size={12} strokeWidth={2.5} />
            এখনই কিনুন
          </button>
        </div>
      </div>
    </div>
  );
}