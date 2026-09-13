"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiChevronDown,
  FiRefreshCw,
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";
import { WooProduct } from "@/lib/api";

interface ProductFilterProps {
  products: WooProduct[];
}

// ===== Static Filter Data (Categories থেকে API-তে যাবে, কিন্তু আপাতত static) =====
const categories = [
  { name: "সব", slug: "all" },
  { name: "কাতান", slug: "katan" },
  { name: "জামদানী", slug: "jamdani" },
  { name: "জাপানি সিল্ক", slug: "japani-silk" },
  { name: "সুতি শাড়ী", slug: "suti" },
  { name: "হাফ সিল্ক", slug: "half-silk" },
  { name: "কাঞ্জিভরম", slug: "kanchibaram" },
];

const colors = [
  { name: "লাল", value: "#E53935", slug: "red" },
  { name: "গোলাপী", value: "#FF6B8A", slug: "pink" },
  { name: "নীল", value: "#1E88E5", slug: "blue" },
  { name: "সাদা", value: "#FFFFFF", slug: "white" },
  { name: "হলুদ", value: "#FDD835", slug: "yellow" },
  { name: "সবুজ", value: "#43A047", slug: "green" },
];

const ages = [
  { name: "১-৩ বছর", slug: "1-3" },
  { name: "৩-৫ বছর", slug: "3-5" },
  { name: "৫-১০ বছর", slug: "5-10" },
  { name: "১০-১২ বছর", slug: "10-12" },
  { name: "১২-১৫ বছর", slug: "12-15" },
];

const occasions = [
  { name: "সব", slug: "all" },
  { name: "💍 বিয়ে", slug: "wedding" },
  { name: "🎁 জন্মদিন", slug: "birthday" },
  { name: "🌸 গায়ে হলুদ", slug: "holud" },
  { name: "🎊 উৎসব", slug: "festival" },
];

export default function ProductFilter({ products }: ProductFilterProps) {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("all");
  const [priceRange, setPriceRange] = useState(5000);
  const [sortBy, setSortBy] = useState("popular");
  const [openSection, setOpenSection] = useState<string | null>("category");
  const [wishlist, setWishlist] = useState<number[]>([]);

  // ===== Read filters from URL query =====
  useEffect(() => {
    if (typeof window === "undefined") return;

    const categoryParam = searchParams.get("category");
    const colorParam = searchParams.get("color");
    const ageParam = searchParams.get("age");
    const occasionParam = searchParams.get("occasion");
    const maxPriceParam = searchParams.get("maxPrice");

    const hasAnyParam =
      categoryParam || colorParam || ageParam || occasionParam || maxPriceParam;

    if (!hasAnyParam) return;

    // Check if this is a page reload using Performance Navigation API
    const navEntries = performance.getEntriesByType(
      "navigation",
    ) as PerformanceNavigationTiming[];
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    if (isReload) {
      setSelectedCategory("all");
      setSelectedColor("");
      setSelectedAge("");
      setSelectedOccasion("all");
      setPriceRange(5000);
      window.history.replaceState(null, "", window.location.pathname);
      sessionStorage.removeItem("lastAppliedUrl");
      return;
    }

    // Fresh navigation — apply filters
    if (categoryParam) {
      const exists = categories.find((c) => c.slug === categoryParam);
      if (exists) {
        setSelectedCategory(categoryParam);
        setOpenSection("category");
      }
    }

    if (colorParam) {
      const exists = colors.find((c) => c.slug === colorParam);
      if (exists) setSelectedColor(colorParam);
    }

    if (ageParam) {
      const exists = ages.find((a) => a.slug === ageParam);
      if (exists) setSelectedAge(ageParam);
    }

    if (occasionParam) {
      const exists = occasions.find((o) => o.slug === occasionParam);
      if (exists) setSelectedOccasion(occasionParam);
    }

    if (maxPriceParam) {
      setPriceRange(Number(maxPriceParam));
    }

    sessionStorage.setItem("lastAppliedUrl", window.location.href);

    const scrollTimer = setTimeout(() => {
      const element = document.getElementById("product-filter");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [searchParams]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedColor("");
    setSelectedAge("");
    setSelectedOccasion("all");
    setPriceRange(5000);
  };

  // ===== Live Filter Logic (API data) =====
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) =>
        p.categories.some((cat) => cat.slug === selectedCategory),
      );
    }

    // Filter by occasion (tags)
    if (selectedOccasion !== "all") {
      result = result.filter((p) =>
        p.tags.some((tag) => tag.slug === selectedOccasion),
      );
    }

    // Filter by age (attributes)
    if (selectedAge) {
      const ageLabel = ages.find((a) => a.slug === selectedAge)?.name || "";
      result = result.filter((p) =>
        p.attributes.some(
          (attr) =>
            attr.name === "Age" && attr.options.some((opt) => opt === ageLabel),
        ),
      );
    }

    // Filter by color (currently no color attribute, so skip if empty)
    if (selectedColor) {
      result = result.filter((p) =>
        p.attributes.some(
          (attr) =>
            attr.name === "Color" &&
            attr.options.some((opt) => {
              const colorObj = colors.find((c) => c.slug === selectedColor);
              return colorObj && opt === colorObj.name;
            }),
        ),
      );
    }

    // Filter by price
    result = result.filter((p) => parseFloat(p.price) <= priceRange);

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "popular") {
      result.sort(
        (a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating),
      );
    }

    return result;
  }, [
    products,
    selectedCategory,
    selectedColor,
    selectedAge,
    selectedOccasion,
    priceRange,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedColor ||
    selectedAge ||
    selectedOccasion !== "all" ||
    priceRange < 5000;

  return (
    <section
      id="product-filter"
      style={{
        width: "100%",
        padding: "80px 24px",
        backgroundColor: "#FFFFFF",
        scrollMarginTop: "120px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
            Find Your Perfect Saree
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
            আপনার পছন্দের{" "}
            <span style={{ color: "#FF6B8A", fontStyle: "italic" }}>শাড়ি</span>{" "}
            খুঁজুন
          </h2>
        </div>

        {/* 2 Columns */}
        <div
          className="filter-container"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Filter Sidebar */}
          <aside
            className="filter-sidebar"
            style={{
              backgroundColor: "#FFF8F9",
              borderRadius: "24px",
              padding: "24px 22px",
              position: "sticky",
              top: "100px",
              border: "1px solid rgba(255, 107, 138, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(255, 107, 138, 0.15)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FiSearch size={16} style={{ color: "#FF6B8A" }} />
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1A1A1A",
                    margin: 0,
                    letterSpacing: "0.5px",
                  }}
                >
                  Filters
                </h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 8px",
                    backgroundColor: "rgba(255, 107, 138, 0.1)",
                    border: "none",
                    color: "#FF6B8A",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                >
                  <FiRefreshCw size={10} />
                  রিসেট
                </button>
              )}
            </div>

            {/* Category Filter */}
            <FilterSection
              title="ক্যাটেগরি"
              isOpen={openSection === "category"}
              onToggle={() => toggleSection("category")}
              badge={
                selectedCategory !== "all"
                  ? categories.find((c) => c.slug === selectedCategory)?.name
                  : undefined
              }
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {categories.map((cat) => (
                  <label
                    key={cat.slug}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "13px",
                      color:
                        selectedCategory === cat.slug ? "#FF6B8A" : "#555555",
                      fontWeight: selectedCategory === cat.slug ? 600 : 400,
                      backgroundColor:
                        selectedCategory === cat.slug
                          ? "rgba(255, 107, 138, 0.08)"
                          : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.slug}
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                      style={{
                        accentColor: "#FF6B8A",
                        cursor: "pointer",
                        width: "13px",
                        height: "13px",
                      }}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Color Filter */}
            <FilterSection
              title="রঙ"
              isOpen={openSection === "color"}
              onToggle={() => toggleSection("color")}
              badge={
                selectedColor
                  ? colors.find((c) => c.slug === selectedColor)?.name
                  : undefined
              }
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {colors.map((color) => (
                  <button
                    key={color.slug}
                    onClick={() =>
                      setSelectedColor(
                        selectedColor === color.slug ? "" : color.slug,
                      )
                    }
                    aria-label={color.name}
                    title={color.name}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: color.value,
                      border:
                        selectedColor === color.slug
                          ? "2px solid #FF6B8A"
                          : "2px solid rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow:
                        selectedColor === color.slug
                          ? "0 0 0 3px rgba(255, 107, 138, 0.2)"
                          : "0 2px 6px rgba(0, 0, 0, 0.08)",
                      transform:
                        selectedColor === color.slug
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Age Filter */}
            <FilterSection
              title="বয়স"
              isOpen={openSection === "age"}
              onToggle={() => toggleSection("age")}
              badge={
                selectedAge
                  ? ages.find((a) => a.slug === selectedAge)?.name
                  : undefined
              }
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "6px",
                }}
              >
                {ages.map((age) => (
                  <button
                    key={age.slug}
                    onClick={() =>
                      setSelectedAge(selectedAge === age.slug ? "" : age.slug)
                    }
                    style={{
                      padding: "7px 4px",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "11px",
                      fontWeight: selectedAge === age.slug ? 600 : 500,
                      color: selectedAge === age.slug ? "#FFFFFF" : "#555555",
                      backgroundColor:
                        selectedAge === age.slug ? "#FF6B8A" : "#FFFFFF",
                      border:
                        selectedAge === age.slug
                          ? "1px solid #FF6B8A"
                          : "1px solid rgba(0, 0, 0, 0.08)",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {age.name}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Occasion Filter */}
            <FilterSection
              title="অনুষ্ঠান"
              isOpen={openSection === "occasion"}
              onToggle={() => toggleSection("occasion")}
              badge={
                selectedOccasion !== "all"
                  ? occasions.find((o) => o.slug === selectedOccasion)?.name
                  : undefined
              }
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {occasions.map((occ) => (
                  <label
                    key={occ.slug}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "13px",
                      color:
                        selectedOccasion === occ.slug ? "#FF6B8A" : "#555555",
                      fontWeight: selectedOccasion === occ.slug ? 600 : 400,
                      backgroundColor:
                        selectedOccasion === occ.slug
                          ? "rgba(255, 107, 138, 0.08)"
                          : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="occasion"
                      value={occ.slug}
                      checked={selectedOccasion === occ.slug}
                      onChange={() => setSelectedOccasion(occ.slug)}
                      style={{
                        accentColor: "#FF6B8A",
                        cursor: "pointer",
                        width: "13px",
                        height: "13px",
                      }}
                    />
                    {occ.name}
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Price Filter */}
            <FilterSection
              title="দাম"
              isOpen={openSection === "price"}
              onToggle={() => toggleSection("price")}
              badge={`৳${priceRange.toLocaleString("bn-BD")}`}
              isLast
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "11px",
                    color: "#777777",
                  }}
                >
                  <span>৳৫০০</span>
                  <span
                    style={{
                      color: "#FF6B8A",
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    ৳{priceRange.toLocaleString("bn-BD")}
                  </span>
                  <span>৳৫০০০</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="price-slider"
                  style={{ width: "100%", accentColor: "#FF6B8A" }}
                />
              </div>
            </FilterSection>
          </aside>

          {/* Filtered Products */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                padding: "0 4px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  color: "#777777",
                  margin: 0,
                }}
              >
                দেখানো হচ্ছে{" "}
                <span
                  style={{
                    color: "#FF6B8A",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  {filteredProducts.length}
                </span>{" "}
                টি প্রোডাক্ট
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "8px 14px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  color: "#555555",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="popular">জনপ্রিয়</option>
                <option value="price-low">কম দাম প্রথমে</option>
                <option value="price-high">বেশি দাম প্রথমে</option>
              </select>
            </div>

            {filteredProducts.length === 0 && (
              <div
                style={{
                  padding: "80px 32px",
                  textAlign: "center",
                  backgroundColor: "#FFF8F9",
                  borderRadius: "20px",
                }}
              >
                <div style={{ fontSize: "56px", marginBottom: "16px" }}>🔍</div>
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
                    marginBottom: "20px",
                  }}
                >
                  ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
                </p>
                <button
                  onClick={resetFilters}
                  style={{
                    padding: "10px 24px",
                    backgroundColor: "#FF6B8A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "999px",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  🔄 সব ফিল্টার রিসেট করুন
                </button>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div
                className="filtered-products-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "18px",
                }}
              >
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  const productImage =
                    product.images[0]?.src || "/images/placeholder.jpg";
                  const productPrice = parseFloat(product.price) || 0;

                  return (
                    <div
                      key={product.id}
                      className="filter-product-card"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "18px",
                        overflow: "hidden",
                        transition: "all 0.35s ease",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                        border: "1px solid rgba(0, 0, 0, 0.04)",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
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
                              transition: "transform 0.6s ease",
                            }}
                            className="filter-product-image"
                            sizes="(max-width: 640px) 50vw, 33vw"
                            unoptimized
                          />
                        </Link>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          aria-label="Wishlist"
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isWishlisted ? "#FF4081" : "#1A1A1A",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                          }}
                        >
                          <FiHeart
                            size={13}
                            fill={isWishlisted ? "#FF4081" : "none"}
                            strokeWidth={2}
                          />
                        </button>

                        <button
                          className="filter-add-cart"
                          aria-label="Add to cart"
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            backgroundColor: "#FF6B8A",
                            color: "#FFFFFF",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease",
                            opacity: 0,
                            transform: "translateY(10px)",
                            boxShadow: "0 6px 20px rgba(255, 107, 138, 0.4)",
                          }}
                        >
                          <FiShoppingBag size={15} strokeWidth={2.2} />
                        </button>
                      </div>

                      <div style={{ padding: "12px 14px 14px" }}>
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
                        <h4
                          style={{
                            fontFamily: "var(--font-cormorant), serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#1A1A1A",
                            margin: "6px 0 6px",
                            lineHeight: 1.3,
                          }}
                        >
                          {product.name}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                            marginBottom: "6px",
                          }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={10}
                              fill={
                                i <
                                Math.round(parseFloat(product.average_rating))
                                  ? "#FFB800"
                                  : "none"
                              }
                              stroke={
                                i <
                                Math.round(parseFloat(product.average_rating))
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
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#1A1A1A",
                          }}
                        >
                          ৳{productPrice.toLocaleString("bn-BD")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .filter-product-card:hover .filter-product-image {
          transform: scale(1.08);
        }

        .filter-product-card:hover .filter-add-cart {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .filter-add-cart:hover {
          background-color: #ff4081 !important;
          transform: scale(1.1) !important;
        }

        .price-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 5px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            #ff6b8a 0%,
            #ff6b8a var(--value, 100%),
            #ffe5ec var(--value, 100%),
            #ffe5ec 100%
          );
        }

        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ff6b8a;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 12px rgba(255, 107, 138, 0.4);
          cursor: pointer;
        }

        .price-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ff6b8a;
          border: 3px solid #ffffff;
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .filter-container {
            grid-template-columns: 1fr !important;
          }
          .filter-sidebar {
            position: static !important;
          }
          .filtered-products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .filtered-products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ===== Collapsible Filter Section ===== */
function FilterSection({
  title,
  isOpen,
  onToggle,
  badge,
  isLast,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  badge?: string;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: isLast ? 0 : "4px",
        paddingBottom: isLast ? 0 : "12px",
        borderBottom: isLast ? "none" : "1px solid rgba(255, 107, 138, 0.1)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 0",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: "#1A1A1A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {title}
          {badge && (
            <span
              style={{
                padding: "2px 7px",
                backgroundColor: "#FF6B8A",
                color: "#FFFFFF",
                fontSize: "9px",
                fontWeight: 600,
                borderRadius: "999px",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <FiChevronDown
          size={14}
          style={{
            color: "#999999",
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div
        style={{
          maxHeight: isOpen ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease, padding 0.3s ease",
          paddingTop: isOpen ? "8px" : "0",
        }}
      >
        {children}
      </div>
    </div>
  );
}
