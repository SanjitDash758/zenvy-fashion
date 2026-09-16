"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiX,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiCheck,
  FiZap,
} from "react-icons/fi";
import { WooProduct } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";

interface Variation {
  id: number;
  price: string;
  regular_price: string;
  stock_status: string;
  stock_quantity: number | null;
  image: { src: string; alt: string } | null;
  attributes: Array<{
    name: string;
    option: string;
  }>;
}

interface QuickAddModalProps {
  product: WooProduct | null;
  variations: Variation[];
  isOpen: boolean;
  onClose: () => void;
  mode?: "cart" | "buy";
}

export default function QuickAddModal({
  product,
  variations,
  isOpen,
  onClose,
  mode = "cart",
}: QuickAddModalProps) {
  // ===== ALL HOOKS AT THE TOP (Rules of Hooks) =====
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("কার্টে যোগ হয়েছে!");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && variations.length > 0) {
      setSelectedVariation(variations[0]);
      setQuantity(1);
    }
  }, [isOpen, variations]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ===== AFTER ALL HOOKS, NOW WE CAN HAVE CONDITIONAL RETURN =====
  if (!isOpen || !product) return null;

  // ===== NON-HOOK LOGIC BELOW =====
  const currentPrice = selectedVariation
    ? parseFloat(selectedVariation.price) || 0
    : parseFloat(product.price) || 0;

  const currentStockStatus = selectedVariation
    ? selectedVariation.stock_status
    : product.stock_status;

  const ageAttribute = product.attributes.find((attr) => attr.name === "Age");
  const ageOptions = ageAttribute?.options || [];

  const selectedAgeValue = selectedVariation?.attributes.find(
    (attr) => attr.name === "Age",
  )?.option;

  const handleAgeSelect = (ageValue: string) => {
    const variation = variations.find((v) =>
      v.attributes.some(
        (attr) => attr.name === "Age" && attr.option.trim() === ageValue.trim(),
      ),
    );
    if (variation) {
      setSelectedVariation(variation);
    }
  };

  // Helper: add item to cart
  const addToCartInternal = () => {
    if (!selectedVariation) return false;
    if (currentStockStatus !== "instock") return false;

    const selectedAttributes: { [key: string]: string } = {};
    selectedVariation.attributes.forEach((attr) => {
      selectedAttributes[attr.name] = attr.option;
    });

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

  // 🛒 Add to Cart only
  const handleAddToCart = () => {
    if (!addToCartInternal()) return;

    setToastMessage("কার্টে যোগ হয়েছে!");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1500);
  };

  // ⚡ Buy Now — Cart-এ যোগ করে Checkout-এ যাবে
  const handleBuyNow = () => {
    if (!addToCartInternal()) return;

    setToastMessage("Cart-এ যোগ হয়েছে — Checkout-এ নিয়ে যাচ্ছি...");
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      onClose();
      router.push("/checkout");
    }, 1500);
  };

  return (
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
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(90vw, 480px)",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.25)",
          zIndex: 99999,
          pointerEvents: "auto",
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1A1A1A",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <FiX size={18} />
        </button>

        {/* Product Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 3",
            backgroundColor: "#F5EFE6",
            overflow: "hidden",
            borderRadius: "24px 24px 0 0",
          }}
        >
          <Image
            src={product.images[0]?.src || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="480px"
            unoptimized
          />
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {/* Category */}
          {product.categories[0] && (
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                color: "#FF6B8A",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {product.categories[0].name}
            </span>
          )}

          {/* Product Name */}
          <h3
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: 0,
              marginBottom: "16px",
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "26px",
                fontWeight: 700,
                color: "#1A1A1A",
              }}
            >
              ৳{currentPrice.toLocaleString("bn-BD")}
            </span>
            {currentStockStatus === "instock" && (
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#4CAF50",
                  backgroundColor: "#E8F5E9",
                  padding: "3px 8px",
                  borderRadius: "999px",
                }}
              >
                স্টকে আছে
              </span>
            )}
          </div>

          {/* Age Variation Selector */}
          {ageOptions.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                বয়স নির্বাচন করুন
              </label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {ageOptions.map((age) => (
                  <button
                    key={age}
                    onClick={() => handleAgeSelect(age)}
                    style={{
                      padding: "8px 16px",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "12px",
                      fontWeight: selectedAgeValue === age ? 600 : 500,
                      color: selectedAgeValue === age ? "#FFFFFF" : "#555555",
                      backgroundColor:
                        selectedAgeValue === age ? "#FF6B8A" : "#FFFFFF",
                      border:
                        selectedAgeValue === age
                          ? "1px solid #FF6B8A"
                          : "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
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

          {/* Quantity */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#1A1A1A",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              পরিমাণ
            </label>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555555",
                }}
              >
                <FiMinus size={14} />
              </button>
              <span
                style={{
                  width: "44px",
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
                  height: "44px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555555",
                }}
              >
                <FiPlus size={14} />
              </button>
            </div>
          </div>

          {/* Action Buttons — 2 buttons side by side */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={currentStockStatus !== "instock"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "14px 12px",
                backgroundColor: "transparent",
                color: currentStockStatus === "instock" ? "#FF6B8A" : "#CCCCCC",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                border: `1.5px solid ${
                  currentStockStatus === "instock" ? "#FF6B8A" : "#CCCCCC"
                }`,
                borderRadius: "12px",
                cursor:
                  currentStockStatus === "instock" ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                if (currentStockStatus === "instock") {
                  e.currentTarget.style.backgroundColor = "#FF6B8A";
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                if (currentStockStatus === "instock") {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#FF6B8A";
                }
              }}
            >
              <FiShoppingBag size={15} strokeWidth={2.2} />
              কার্টে যোগ
            </button>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={currentStockStatus !== "instock"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "14px 12px",
                backgroundColor:
                  currentStockStatus === "instock" ? "#FF6B8A" : "#CCCCCC",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                border: "none",
                borderRadius: "12px",
                cursor:
                  currentStockStatus === "instock" ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
                boxShadow:
                  currentStockStatus === "instock"
                    ? "0 10px 30px rgba(255, 107, 138, 0.35)"
                    : "none",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                if (currentStockStatus === "instock") {
                  e.currentTarget.style.backgroundColor = "#FF4081";
                }
              }}
              onMouseLeave={(e) => {
                if (currentStockStatus === "instock") {
                  e.currentTarget.style.backgroundColor = "#FF6B8A";
                }
              }}
            >
              <FiZap size={15} strokeWidth={2.2} />
              এখনই কিনুন
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {showToast && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(76, 175, 80, 0.95)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              color: "#FFFFFF",
              borderRadius: "24px",
              zIndex: 100,
              animation: "fadeIn 0.3s ease",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiCheck size={32} strokeWidth={3} />
            </div>
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                textAlign: "center",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              {toastMessage}
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}
