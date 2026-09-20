"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Zap, Star, Heart } from "lucide-react";
import { WooProduct } from "@/lib/api";
import QuickAddModal from "@/components/product/QuickAddModal";

interface PujaCollectionCardProps {
  product: WooProduct;
}

export default function PujaCollectionCard({
  product,
}: PujaCollectionCardProps) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"cart" | "buy">("cart");
  const [variations, setVariations] = useState<any[]>([]);
  const [loadingVariations, setLoadingVariations] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Track which product we've already fetched variations for
  const fetchedProductRef = useRef<number | null>(null);

  const rating = parseFloat(product.average_rating) || 0;

  // Fetch variations when modal opens (only once per product)
  useEffect(() => {
    if (!modalOpen) return;
    if (product.type !== "variable") return;
    if (fetchedProductRef.current === product.id) return;
    if (variations.length > 0) return;

    fetchedProductRef.current = product.id;

    const fetchVariations = async () => {
      setLoadingVariations(true);
      try {
        const res = await fetch(`/api/variations/${product.id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setVariations(data);
      } catch (err) {
        console.error("Error fetching variations:", err);
        fetchedProductRef.current = null; // Allow retry on error
      } finally {
        setLoadingVariations(false);
      }
    };

    fetchVariations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, product.id, product.type]);

  const openModal = (mode: "cart" | "buy") => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleSimpleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      variationId: null,
      name: product.name,
      image: product.images?.[0]?.src || "/images/placeholder.jpg",
      price: parseFloat(product.price),
      quantity: 1,
      maxStock: product.stock_quantity || 99,
    });
  };

  return (
    <>
      <Link
        href={`/product/${product.slug}`}
        className="group block bg-white rounded-2xl overflow-hidden border border-rose-100/60 shadow-sm hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-rose-50/40">
          <Image
            src={product.images?.[0]?.src || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-700"
            unoptimized
          />

          {/* Wishlist */}
          <button
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-rose-50 transition z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="w-4 h-4 text-gray-700" />
          </button>

          {/* Hover buttons */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 flex gap-2 transition-all duration-300 ${
              hovered
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.type === "variable") {
                  openModal("cart");
                } else {
                  handleSimpleAdd(e);
                }
              }}
              className="flex-1 h-11 rounded-xl bg-white border-2 border-rose-300 text-rose-500 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-rose-50 transition shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              কার্ট
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.type === "variable") {
                  openModal("buy");
                } else {
                  handleSimpleAdd(e);
                }
              }}
              className="flex-1 h-11 rounded-xl bg-[#E8748A] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#d96379] transition shadow-md"
            >
              <Zap className="w-4 h-4" />
              কিনুন
            </button>
          </div>
        </div>

        <div className="p-4">
          {product.categories?.[0] && (
            <p className="text-[11px] font-bold tracking-widest text-[#E8748A] uppercase mb-1">
              {product.categories[0].name}
            </p>
          )}

          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm md:text-base leading-snug">
            {product.name}
          </h3>

          <div className="flex items-center gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            {product.rating_count > 0 && (
              <span className="text-[11px] text-gray-500 ml-1">
                ({product.rating_count})
              </span>
            )}
          </div>

          <p className="text-gray-900 font-bold mt-2 text-base md:text-lg">
            ৳ {parseFloat(product.price).toLocaleString("bn-BD")}
          </p>
        </div>
      </Link>

      {/* Quick Add Modal */}
      <QuickAddModal
        product={modalOpen ? product : null}
        variations={variations}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
      />
    </>
  );
}