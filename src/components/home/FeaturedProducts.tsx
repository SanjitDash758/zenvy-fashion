"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiShoppingBag, FiArrowRight, FiStar } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "কাতান বেবি শাড়ি",
    category: "কাতান",
    price: 1200,
    oldPrice: 1500,
    rating: 5,
    reviews: 24,
    image: "/images/4PTkrKMT.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "জামদানী বেবি শাড়ি",
    category: "জামদানী",
    price: 1500,
    oldPrice: 1800,
    rating: 5,
    reviews: 18,
    image: "/images/7kGtew0u.jpg",
    badge: "New",
  },
  {
    id: 3,
    name: "চাঁদনী সিল্ক শাড়ি",
    category: "চাঁদনী সিল্ক",
    price: 1800,
    oldPrice: null,
    rating: 4,
    reviews: 12,
    image: "/images/7OgJOQJ9.jpg",
    badge: null,
  },
  {
    id: 4,
    name: "সুতির শাড়ি",
    category: "সুতির শাড়ী",
    price: 1000,
    oldPrice: 1200,
    rating: 5,
    reviews: 32,
    image: "/images/8Z05-xXL.jpg",
    badge: "Sale",
  },
  {
    id: 5,
    name: "ডিজিটাল প্রিন্ট শাড়ি",
    category: "ডিজিটাল প্রিন্ট",
    price: 1300,
    oldPrice: null,
    rating: 4,
    reviews: 8,
    image: "/images/9YjHQ_72.jpg",
    badge: null,
  },
  {
    id: 6,
    name: "হাফ সিল্ক শাড়ি",
    category: "হাফ সিল্ক",
    price: 2000,
    oldPrice: 2400,
    rating: 5,
    reviews: 15,
    image: "/images/Half-Silk.jpg",
    badge: "Premium",
  },
  {
    id: 7,
    name: "এথনিক বেবি শাড়ি",
    category: "কাতান",
    price: 1400,
    oldPrice: null,
    rating: 5,
    reviews: 20,
    image: "/images/eUwPWIQn.jpg",
    badge: null,
  },
  {
    id: 8,
    name: "ট্র্যাডিশনাল শাড়ি",
    category: "জামদানী",
    price: 1600,
    oldPrice: 1900,
    rating: 4,
    reviews: 10,
    image: "/images/FZqSB4mP.jpg",
    badge: "Sale",
  },
];

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      style={{
        width: "100%",
        padding: "80px 24px",
        backgroundColor: "#FFF8F9",
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
            Best Sellers
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
              জনপ্রিয়
            </span>{" "}
            শাড়ি
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
            const discount = product.oldPrice
              ? Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )
              : 0;

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
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "transform 0.6s ease",
                      }}
                      className="product-image"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>

                  {/* Badge — top left */}
                  {product.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        padding: "6px 12px",
                        backgroundColor:
                          product.badge === "Sale"
                            ? "#FF4081"
                            : product.badge === "New"
                            ? "#4CAF50"
                            : product.badge === "Premium"
                            ? "#1A1A1A"
                            : "#FF6B8A",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        borderRadius: "999px",
                        zIndex: 3,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist button — top right */}
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.color = "#FF4081";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      if (!isWishlisted) {
                        e.currentTarget.style.color = "#1A1A1A";
                      }
                    }}
                  >
                    <FiHeart
                      size={16}
                      fill={isWishlisted ? "#FF4081" : "none"}
                      strokeWidth={2}
                    />
                  </button>

                  {/* Discount tag — bottom left */}
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

                  {/* Add to cart — hover এ দেখাবে */}
                  <button
                    className="add-to-cart-btn"
                    aria-label="Add to cart"
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      backgroundColor: "#FF6B8A",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
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
                    <FiShoppingBag size={18} strokeWidth={2.2} />
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
                    {product.category}
                  </span>

                  {/* Product Name */}
                  <Link
                    href={`/product/${product.id}`}
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
                        fill={i < product.rating ? "#FFB800" : "none"}
                        stroke={i < product.rating ? "#FFB800" : "#CCCCCC"}
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
                      ({product.reviews})
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
                      ৳{product.price.toLocaleString("bn-BD")}
                    </span>
                    {product.oldPrice && (
                      <span
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#AAAAAA",
                          textDecoration: "line-through",
                        }}
                      >
                        ৳{product.oldPrice.toLocaleString("bn-BD")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
              backgroundColor: "#1A1A1A",
              color: "#FFFFFF",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "999px",
              transition: "all 0.3s ease",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              boxShadow: "0 10px 30px rgba(26, 26, 26, 0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FF6B8A";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(255, 107, 138, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1A1A1A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(26, 26, 26, 0.15)";
            }}
          >
            সব প্রোডাক্ট দেখুন
            <FiArrowRight size={16} strokeWidth={2.5} />
          </Link>
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
  );
}