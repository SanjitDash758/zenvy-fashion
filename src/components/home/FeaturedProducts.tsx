"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiShoppingBag, FiStar, FiLoader } from "react-icons/fi";
import { WooProduct } from "@/lib/api";
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
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Open Quick Add Modal — fetch variations first
  const handleQuickAdd = async (product: WooProduct) => {
    setLoadingProductId(product.id);
    try {
      // Call our Next.js API route (server-side)
      const response = await fetch(`/api/variations/${product.id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch variations: ${response.status}`);
      }
      const variations = await response.json();
      setSelectedProduct(product);
      setModalVariations(variations);
      setModalOpen(true);
    } catch (error) {
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

  // If no products, show empty state
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
        style={{
          width: "100%",
          padding: "80px 24px",
          backgroundColor: "#FFF8F9",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* ===== Heading ===== */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
              আপনার ছোট্ট রাজকন্যার জন্য সবচেয়ে জনপ্রিয় ও পছন্দের শাড়িগুলো
            </p>
          </div>

          {/* ===== Products Grid ===== */}
          <div
            className="products-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {products.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const productImage =
                product.images[0]?.src || "/images/placeholder.jpg";
              const productPrice = parseFloat(product.price) || 0;
              const regularPrice = parseFloat(product.regular_price) || 0;
              const discount =
                regularPrice > 0 && regularPrice > productPrice
                  ? Math.round(
                      ((regularPrice - productPrice) / regularPrice) * 100,
                    )
                  : 0;
              const isLoading = loadingProductId === product.id;

              return (
                <div
                  key={product.id}
                  className="product-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 50px rgba(255, 107, 138, 0.18)";
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
                        className="product-image"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        unoptimized
                      />
                    </Link>

                    {/* Discount tag */}
                    {discount > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "12px",
                          left: "12px",
                          padding: "4px 10px",
                          backgroundColor: "#FFFFFF",
                          color: "#FF4081",
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "11px",
                          fontWeight: 700,
                          borderRadius: "6px",
                          zIndex: 3,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        -{discount}%
                      </div>
                    )}

                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Add to wishlist"
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
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

                    {/* Quick Add to Cart Button */}
                    <button
                      onClick={() => handleQuickAdd(product)}
                      disabled={isLoading}
                      className="add-to-cart-btn"
                      aria-label="Quick add to cart"
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        right: "12px",
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        backgroundColor: isLoading ? "#CCCCCC" : "#FF6B8A",
                        color: "#FFFFFF",
                        border: "none",
                        cursor: isLoading ? "wait" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        zIndex: 3,
                        opacity: 0,
                        transform: "translateY(10px)",
                        boxShadow: "0 6px 20px rgba(255, 107, 138, 0.4)",
                      }}
                    >
                      {isLoading ? (
                        <FiLoader
                          size={18}
                          strokeWidth={2.2}
                          style={{ animation: "spin 1s linear infinite" }}
                        />
                      ) : (
                        <FiShoppingBag size={18} strokeWidth={2.2} />
                      )}
                    </button>
                  </div>

                  {/* ===== Info Section ===== */}
                  <div
                    style={{
                      padding: "18px 18px 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      flex: 1,
                    }}
                  >
                    {/* Category */}
                    {product.categories[0] && (
                      <span
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "#FF6B8A",
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                        }}
                      >
                        {product.categories[0].name}
                      </span>
                    )}

                    {/* Product Name */}
                    <Link
                      href={`/product/${product.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#1A1A1A",
                          margin: 0,
                          lineHeight: 1.3,
                          letterSpacing: "0.2px",
                          transition: "color 0.3s ease",
                        }}
                        className="product-name"
                      >
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginTop: "2px",
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={13}
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
                          fontSize: "11px",
                          color: "#999999",
                          marginLeft: "4px",
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
                        gap: "8px",
                        marginTop: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "18px",
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
                            fontSize: "13px",
                            fontWeight: 400,
                            color: "#AAAAAA",
                            textDecoration: "line-through",
                          }}
                        >
                          ৳{regularPrice.toLocaleString("bn-BD")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Responsive CSS ===== */}
        <style jsx>{`
          .product-card:hover .product-image {
            transform: scale(1.08);
          }

          .product-card:hover .add-to-cart-btn {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }

          .product-card:hover .product-name {
            color: #ff6b8a !important;
          }

          .add-to-cart-btn:hover {
            background-color: #ff4081 !important;
            transform: scale(1.1) !important;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 1024px) {
            .products-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 20px !important;
            }
          }

          @media (max-width: 768px) {
            .products-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 16px !important;
            }
          }

          @media (max-width: 480px) {
            .products-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ===== Quick Add Modal ===== */}
      <QuickAddModal
        product={selectedProduct}
        variations={modalVariations}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
