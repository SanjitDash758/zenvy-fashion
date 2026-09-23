"use client";
import { usePixel } from "next-pixels";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiHeart,
  FiShoppingBag,
  FiStar,
  FiChevronDown,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiMinus,
  FiPlus,
  FiCheck,
  FiZap,
} from "react-icons/fi";
import { WooProduct } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";
import SizeGuideModal from "./SizeGuideModal";

interface Variation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  stock_quantity: number | null;
  image: { src: string; alt: string } | null;
  attributes: Array<{
    name: string;
    option: string;
  }>;
}

interface ProductDetailClientProps {
  product: WooProduct;
  variations: Variation[];
}

export default function ProductDetailClient({
  product,
  variations,
}: ProductDetailClientProps) {
  // ⚠️ Meta Pixel Hook
  const { track } = usePixel();

  // ⚠️ Router for Buy Now
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    variations[0] || null,
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("কার্টে যোগ হয়েছে!");

  // ⚠️ Meta Pixel - ViewContent Tracking
  useEffect(() => {
    if (typeof window !== "undefined" && product) {
      track({
        eventName: "ViewContent",
        data: {
          content_ids: [product.id.toString()],
          content_name: product.name,
          content_type: "product",
          value: parseFloat(product.price) || 0,
          currency: "BDT",
        },
      });
    }
  }, [product, track]);

  // Get all images
  const images =
    product.images.length > 0
      ? product.images
      : [{ id: 0, src: "/images/placeholder.jpg", alt: product.name }];

  // Current price (from selected variation or product)
  const currentPrice = selectedVariation
    ? parseFloat(selectedVariation.price) || 0
    : parseFloat(product.price) || 0;

  const currentRegularPrice = selectedVariation
    ? parseFloat(selectedVariation.regular_price) || 0
    : parseFloat(product.regular_price) || 0;

  const currentStockStatus = selectedVariation
    ? selectedVariation.stock_status
    : product.stock_status;

  // Extract Age attribute options
  const ageAttribute = product.attributes.find((attr) => attr.name === "Age");
  const ageOptions = ageAttribute?.options || [];

  // Find variation by age option
  const handleAgeSelect = (ageValue: string) => {
    const variation = variations.find((v) =>
      v.attributes.some(
        (attr) => attr.name === "Age" && attr.option === ageValue,
      ),
    );
    if (variation) {
      setSelectedVariation(variation);
      // If variation has image, select it
      if (variation.image) {
        const imgIndex = images.findIndex(
          (img) => img.src === variation.image?.src,
        );
        if (imgIndex >= 0) setSelectedImage(imgIndex);
      }
    }
  };

  const selectedAgeValue = selectedVariation?.attributes.find(
    (attr) => attr.name === "Age",
  )?.option;

  // ===== Shared helper: Add item to cart =====
  const addToCartInternal = (): boolean => {
    if (!selectedVariation) return false;
    if (currentStockStatus !== "instock") return false;

    // Build selected attributes object
    const selectedAttributes: { [key: string]: string } = {};
    selectedVariation.attributes.forEach((attr) => {
      selectedAttributes[attr.name] = attr.option;
    });

    // Add item to cart
    addItem({
      productId: product.id,
      variationId: selectedVariation.id,
      name: product.name,
      image:
        selectedVariation.image?.src ||
        product.images[0]?.src ||
        "/images/placeholder.jpg",
      price: currentPrice,
      quantity: quantity,
      maxStock: selectedVariation.stock_quantity || 10,
      selectedAttributes,
    });

    return true;
  };

  // ===== 🛒 Add to Cart Only =====
  const handleAddToCart = () => {
    if (!addToCartInternal()) return;

    // ⚠️ Meta Pixel - AddToCart Tracking
    track({
      eventName: "AddToCart",
      data: {
        content_ids: [product.id.toString()],
        content_name: product.name,
        content_type: "product",
        value: currentPrice * quantity,
        currency: "BDT",
        contents: [
          {
            id: product.id.toString(),
            quantity: quantity,
            item_price: currentPrice,
          },
        ],
      },
    });

    setToastMessage("কার্টে যোগ হয়েছে!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // ===== ⚡ Buy Now — Add to Cart + Redirect to Checkout =====
  const handleBuyNow = () => {
    if (!addToCartInternal()) return;

    // ⚠️ Meta Pixel - AddToCart Tracking (also fires on Buy Now)
    track({
      eventName: "AddToCart",
      data: {
        content_ids: [product.id.toString()],
        content_name: product.name,
        content_type: "product",
        value: currentPrice * quantity,
        currency: "BDT",
        contents: [
          {
            id: product.id.toString(),
            quantity: quantity,
            item_price: currentPrice,
          },
        ],
      },
    });

    setToastMessage("কার্টে যোগ হয়েছে — চেকআউটে নিয়ে যাচ্ছি...");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      router.push("/checkout");
    }, 1200);
  };

  return (
    <main style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "24px 24px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "13px",
            color: "#999999",
            marginBottom: "24px",
          }}
        >
          <Link href="/" style={{ color: "#999999", textDecoration: "none" }}>
            হোম
          </Link>
          <span>/</span>
          {product.categories[0] && (
            <>
              <Link
                href={`/?category=${product.categories[0].slug}#product-filter`}
                style={{ color: "#999999", textDecoration: "none" }}
              >
                {product.categories[0].name}
              </Link>
              <span>/</span>
            </>
          )}
          <span style={{ color: "#FF6B8A", fontWeight: 500 }}>
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Product Section */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          className="product-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* ===== LEFT: Image Gallery ===== */}
          <div>
            {/* Main Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#F5EFE6",
                marginBottom: "16px",
              }}
            >
              <Image
                src={images[selectedImage]?.src || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "12px",
                }}
              >
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      position: "relative",
                      aspectRatio: "1 / 1",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border:
                        selectedImage === index
                          ? "2px solid #FF6B8A"
                          : "2px solid transparent",
                      cursor: "pointer",
                      backgroundColor: "#F5EFE6",
                      padding: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="100px"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== RIGHT: Product Info ===== */}
          <div>
            {/* Category */}
            {product.categories[0] && (
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#FF6B8A",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {product.categories[0].name}
              </span>
            )}

            {/* Product Name */}
            <h1
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 700,
                color: "#1A1A1A",
                margin: 0,
                marginBottom: "16px",
                lineHeight: 1.2,
                letterSpacing: "0.3px",
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={16}
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
              </div>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "13px",
                  color: "#999999",
                }}
              >
                ({product.rating_count} রিভিউ)
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                marginBottom: "28px",
                paddingBottom: "24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#1A1A1A",
                }}
              >
                ৳{currentPrice.toLocaleString("bn-BD")}
              </span>
              {currentRegularPrice > currentPrice && (
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "18px",
                    color: "#AAAAAA",
                    textDecoration: "line-through",
                  }}
                >
                  ৳{currentRegularPrice.toLocaleString("bn-BD")}
                </span>
              )}
              {currentStockStatus === "instock" ? (
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#4CAF50",
                    backgroundColor: "#E8F5E9",
                    padding: "4px 10px",
                    borderRadius: "999px",
                  }}
                >
                  ✅ স্টকে আছে
                </span>
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#E53935",
                    backgroundColor: "#FFEBEE",
                    padding: "4px 10px",
                    borderRadius: "999px",
                  }}
                >
                  ❌ স্টক নেই
                </span>
              )}
            </div>

            {/* Short Description */}
            {product.short_description && (
              <div
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#555555",
                  marginBottom: "24px",
                }}
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Age Variation Selector */}
            {ageOptions.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  বয়স নির্বাচন করুন
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {ageOptions.map((age) => (
                    <button
                      key={age}
                      onClick={() => handleAgeSelect(age)}
                      style={{
                        padding: "10px 20px",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "13px",
                        fontWeight: selectedAgeValue === age ? 600 : 500,
                        color: selectedAgeValue === age ? "#FFFFFF" : "#555555",
                        backgroundColor:
                          selectedAgeValue === age ? "#FF6B8A" : "#FFFFFF",
                        border:
                          selectedAgeValue === age
                            ? "1px solid #FF6B8A"
                            : "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ===== Quantity + Add to Cart + Buy Now + Size Guide + Wishlist ===== */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "28px",
                flexWrap: "wrap",
              }}
            >
              {/* Quantity */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "52px",
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: "44px",
                    height: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#555555",
                  }}
                >
                  <FiMinus size={16} />
                </button>
                <span
                  style={{
                    width: "40px",
                    textAlign: "center",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#1A1A1A",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "44px",
                    height: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#555555",
                  }}
                >
                  <FiPlus size={16} />
                </button>
              </div>

              {/* ===== Add to Cart Button ===== */}
              <button
                onClick={handleAddToCart}
                disabled={currentStockStatus !== "instock"}
                style={{
                  flex: "1 1 auto",
                  minWidth: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  height: "52px",
                  padding: "0 16px",
                  backgroundColor: "transparent",
                  color:
                    currentStockStatus === "instock" ? "#FF6B8A" : "#CCCCCC",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: `1.5px solid ${
                    currentStockStatus === "instock" ? "#FF6B8A" : "#CCCCCC"
                  }`,
                  borderRadius: "12px",
                  cursor:
                    currentStockStatus === "instock"
                      ? "pointer"
                      : "not-allowed",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.3px",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (currentStockStatus === "instock") {
                    e.currentTarget.style.backgroundColor = "#FF6B8A";
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentStockStatus === "instock") {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#FF6B8A";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <FiShoppingBag size={15} strokeWidth={2.2} />
                কার্টে যোগ
              </button>

              {/* ===== ⚡ Buy Now Button ===== */}
              <button
                onClick={handleBuyNow}
                disabled={currentStockStatus !== "instock"}
                style={{
                  flex: "1 1 auto",
                  minWidth: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  height: "52px",
                  padding: "0 16px",
                  backgroundColor:
                    currentStockStatus === "instock" ? "#FF6B8A" : "#CCCCCC",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "12px",
                  cursor:
                    currentStockStatus === "instock"
                      ? "pointer"
                      : "not-allowed",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.3px",
                  boxShadow:
                    currentStockStatus === "instock"
                      ? "0 10px 30px rgba(255, 107, 138, 0.35)"
                      : "none",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (currentStockStatus === "instock") {
                    e.currentTarget.style.backgroundColor = "#FF4081";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentStockStatus === "instock") {
                    e.currentTarget.style.backgroundColor = "#FF6B8A";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <FiZap size={15} strokeWidth={2.2} />
                কিনুন
              </button>

              {/* ===== Size Guide Button ===== */}
              <button
                onClick={() => setSizeGuideOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  height: "52px",
                  padding: "0 16px",
                  backgroundColor: "#FFFFFF",
                  color: "#FF6B8A",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1.5px solid #FF6B8A",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFF0F4";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                📏 সাইজ দেখুন
              </button>

              {/* ===== Wishlist Button ===== */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Wishlist"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isWishlisted ? "#FF4081" : "#555555",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
              >
                <FiHeart
                  size={20}
                  fill={isWishlisted ? "#FF4081" : "none"}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                padding: "20px",
                backgroundColor: "#FFF8F9",
                borderRadius: "16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  textAlign: "center",
                }}
              >
                <FiTruck size={20} style={{ color: "#FF6B8A" }} />
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#555555",
                  }}
                >
                  ক্যাশ অন ডেলিভারি
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  textAlign: "center",
                }}
              >
                <FiRefreshCw size={20} style={{ color: "#FF6B8A" }} />
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#555555",
                  }}
                >
                  সহজ রিটার্ন
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  textAlign: "center",
                }}
              >
                <FiShield size={20} style={{ color: "#FF6B8A" }} />
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#555555",
                  }}
                >
                  বিশ্বস্ত কোয়ালিটি
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Full Description ===== */}
        {product.description && (
          <div
            style={{
              marginTop: "80px",
              paddingTop: "48px",
              borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#1A1A1A",
                margin: 0,
                marginBottom: "24px",
              }}
            >
              প্রোডাক্ট বিবরণ
            </h2>
            <div
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#555555",
              }}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
      </section>

      {/* Success Toast */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
            padding: "14px 28px",
            borderRadius: "12px",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0 10px 30px rgba(76, 175, 80, 0.4)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "slideUp 0.3s ease",
          }}
        >
          <FiCheck size={20} strokeWidth={3} />
          {toastMessage}
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      <style jsx>{`
        @media (max-width: 1024px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
