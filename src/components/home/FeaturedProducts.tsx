"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiHeart,
  FiShoppingBag,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiZap,
  FiLoader,
} from "react-icons/fi";
import { WooProduct, getProductVariations } from "@/lib/api";
import QuickAddModal from "@/components/product/QuickAddModal";

interface FeaturedProductsProps {
  products: WooProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<WooProduct | null>(
    null,
  );
  const [modalVariations, setModalVariations] = useState<any[]>([]);
  const [modalMode, setModalMode] = useState<"cart" | "buy">("cart");
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(4);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Detect screen size and set cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(2); // Mobile: 2 cards
      } else if (width < 1024) {
        setCardsPerView(3); // Tablet: 3 cards
      } else {
        setCardsPerView(4); // Desktop: 4 cards
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!isAutoPlaying || products.length <= cardsPerView) return;

    const maxIndex = Math.max(0, products.length - cardsPerView);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length, cardsPerView]);

  // Navigation
  const goNext = () => {
    const maxIndex = Math.max(0, products.length - cardsPerView);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const goPrev = () => {
    const maxIndex = Math.max(0, products.length - cardsPerView);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Quick Add — Add to cart
  const handleQuickAdd = async (
    product: WooProduct,
    mode: "cart" | "buy" = "cart",
  ) => {
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

      setSelectedProduct(product);
      setModalVariations(variations);
      setModalMode(mode);
      setModalOpen(true);
    } catch (error: any) {
      console.error("Error loading variations:", error);
      alert("Variation লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setModalVariations([]);
  };

  // Empty state
  if (products.length === 0) {
    return (
      <section
        style={{
          width: "100%",
          padding: "80px 24px",
          backgroundColor: "#FFF8F9",
        }}
      >
        <div
          style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "32px",
              color: "#1A1A1A",
            }}
          >
            শীঘ্রই আসছে...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        className="featured-products-section"
        style={{
          width: "100%",
          padding: "80px 24px",
          backgroundColor: "#FFF8F9",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* ===== Heading with Arrows ===== */}
          <div
            className="featured-heading-wrapper"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "48px",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {/* Left: Text */}
            <div
              className="featured-heading-text"
              style={{ flex: 1, minWidth: 0 }}
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
                Our Collection
              </span>
              <h2
                className="featured-heading-title"
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
                <span style={{ color: "#FF6B8A", fontStyle: "italic" }}>
                  কালেকশন
                </span>
              </h2>
            </div>

            {/* Right: Navigation Arrows */}
            {products.length > cardsPerView && (
              <div
                className="featured-arrows"
                style={{
                  display: "flex",
                  gap: "10px",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={goPrev}
                  aria-label="Previous"
                  className="carousel-arrow-btn"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid rgba(255, 107, 138, 0.3)",
                    color: "#FF6B8A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(255, 107, 138, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF6B8A";
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#FF6B8A";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    e.currentTarget.style.color = "#FF6B8A";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 107, 138, 0.3)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <FiChevronLeft size={22} strokeWidth={2.5} />
                </button>

                <button
                  onClick={goNext}
                  aria-label="Next"
                  className="carousel-arrow-btn"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid rgba(255, 107, 138, 0.3)",
                    color: "#FF6B8A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(255, 107, 138, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF6B8A";
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#FF6B8A";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    e.currentTarget.style.color = "#FF6B8A";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 107, 138, 0.3)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <FiChevronRight size={22} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          {/* ===== Carousel ===== */}
          <div
            className="featured-carousel-wrapper"
            style={{
              overflow: "hidden",
              margin: "0 -8px",
              padding: "8px",
            }}
          >
            <div
              ref={carouselRef}
              className="featured-carousel-track"
              style={{
                display: "flex",
                gap: "16px",
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: `translateX(calc(-${currentIndex} * (100% / ${cardsPerView} + 16px / ${cardsPerView})))`,
              }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                  onBuyNow={() => handleQuickAdd(product, "buy")}
                  isLoading={loadingProductId === product.id}
                  cardsPerView={cardsPerView}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===== Responsive CSS ===== */}
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 1024px) {
            .featured-products-section {
              padding: 60px 20px !important;
            }

            .featured-heading-wrapper {
              margin-bottom: 32px !important;
            }
          }

          @media (max-width: 768px) {
            .featured-products-section {
              padding: 48px 16px !important;
            }

            .featured-heading-title {
              font-size: 26px !important;
            }

            .featured-heading-wrapper {
              margin-bottom: 24px !important;
            }
          }

          @media (max-width: 480px) {
            .featured-products-section {
              padding: 40px 12px !important;
            }

            .featured-heading-title {
              font-size: 24px !important;
            }
          }

          .carousel-arrow-btn:active {
            transform: scale(0.95) !important;
          }
        `}</style>
      </section>

      {/* ===== Quick Add Modal ===== */}
      <QuickAddModal
        product={selectedProduct}
        variations={modalVariations}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
      />
    </>
  );
}

// ============================================================
// Product Card Component
// ============================================================
function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onBuyNow,
  isLoading,
  cardsPerView,
}: {
  product: WooProduct;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onBuyNow: () => void;
  isLoading: boolean;
  cardsPerView: number;
}) {
  const productImage = product.images[0]?.src || "/images/placeholder.jpg";
  const productPrice = parseFloat(product.price) || 0;
  const regularPrice = parseFloat(product.regular_price) || 0;
  const discount =
    regularPrice > 0 && regularPrice > productPrice
      ? Math.round(((regularPrice - productPrice) / regularPrice) * 100)
      : 0;

  // Calculate width based on cards per view
  const gapPx = 16;
  const widthPercentage = 100 / cardsPerView;
  const gapAdjustment = (gapPx * (cardsPerView - 1)) / cardsPerView;

  return (
    <div
      className="featured-product-card"
      style={{
        flex: `0 0 calc(${widthPercentage}% - ${gapAdjustment}px)`,
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 0.3s ease",
      }}
    >
      {/* ===== Image Section ===== */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          backgroundColor: "#F5EFE6",
        }}
      >
        <Link href={`/product/${product.slug}`}>
          <Image
            src={productImage}
            alt={product.name}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
              transition: "transform 0.6s ease",
            }}
            className="featured-product-image"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              padding: "4px 8px",
              backgroundColor: "#FF4081",
              color: "#FFFFFF",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              borderRadius: "6px",
              zIndex: 3,
              boxShadow: "0 4px 12px rgba(255, 64, 129, 0.3)",
            }}
          >
            -{discount}%
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={onToggleWishlist}
          aria-label="Wishlist"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isWishlisted ? "#FF4081" : "#1A1A1A",
            transition: "all 0.3s ease",
            zIndex: 3,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <FiHeart
            size={16}
            fill={isWishlisted ? "#FF4081" : "none"}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* ===== Info Section ===== */}
      <div
        style={{
          padding: "14px 14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: 1,
        }}
      >
        {/* Category */}
        {product.categories[0] && (
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "9px",
              fontWeight: 600,
              color: "#FF6B8A",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
            }}
          >
            {product.categories[0].name}
          </span>
        )}

        {/* Name */}
        <Link
          href={`/product/${product.slug}`}
          style={{ textDecoration: "none" }}
        >
          <h3
            className="featured-product-name"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "#1A1A1A",
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: "0.2px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.6em",
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={11}
              fill={
                i < Math.round(parseFloat(product.average_rating))
                  ? "#FFB800"
                  : "none"
              }
              stroke={
                i < Math.round(parseFloat(product.average_rating))
                  ? "#FFB800"
                  : "#CCCCCC"
              }
              strokeWidth={2}
            />
          ))}
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "10px",
              color: "#999999",
              marginLeft: "3px",
            }}
          >
            ({product.rating_count})
          </span>
        </div>

        {/* Price */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "2px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            ৳{productPrice.toLocaleString("bn-BD")}
          </span>
          {regularPrice > productPrice && (
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                color: "#AAAAAA",
                textDecoration: "line-through",
              }}
            >
              ৳{regularPrice.toLocaleString("bn-BD")}
            </span>
          )}
        </div>

        {/* Buy Now Button */}
        <button
          onClick={onBuyNow}
          disabled={isLoading}
          className="featured-buy-btn"
          aria-label="Buy now"
          style={{
            marginTop: "auto",
            width: "100%",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "0 12px",
            backgroundColor: isLoading ? "#CCCCCC" : "#FF6B8A",
            color: "#FFFFFF",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            border: "none",
            borderRadius: "10px",
            cursor: isLoading ? "wait" : "pointer",
            transition: "all 0.3s ease",
            letterSpacing: "0.3px",
            boxShadow: isLoading
              ? "none"
              : "0 6px 20px rgba(255, 107, 138, 0.3)",
          }}
        >
          {isLoading ? (
            <FiLoader
              size={14}
              style={{ animation: "spin 1s linear infinite" }}
            />
          ) : (
            <FiZap size={14} strokeWidth={2.5} />
          )}
          এখনই কিনুন
        </button>
      </div>

      <style jsx>{`
        .featured-product-card:hover .featured-product-image {
          transform: scale(1.05);
        }

        .featured-product-card:hover .featured-product-name {
          color: #ff6b8a;
        }

        .featured-buy-btn:hover:not(:disabled) {
          background-color: #ff4081 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 138, 0.5) !important;
        }

        .featured-buy-btn:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
