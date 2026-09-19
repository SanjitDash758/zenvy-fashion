import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import ProductFilter from "@/components/home/ProductFilter";
import PujaCollection from "@/components/home/PujaCollection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyZenvyFashion from "@/components/home/WhyZenvyFashion";
// import GiftBanner from "@/components/home/GiftBanner";
import Testimonials from "@/components/home/Testimonials";
import { getProducts, getFeaturedProducts, getPujaCollectionProducts } from "@/lib/api";

export const revalidate = 300;

async function HeroSectionWrapper() {
  const featuredProducts = await getFeaturedProducts(5);
  return <HeroSection featuredProducts={featuredProducts} />;
}

async function ProductsSection() {
  const products = await getProducts();
  return (
    <>
      <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
        <ProductFilter products={products} />
      </Suspense>

      {/* ✅ Filter-এর পরে Puja Collection */}
      <PujaCollection />

      {/* ✅ Puja Collection-এর পরে Featured Products (Our Collection) */}
      <FeaturedProducts products={products} />
    </>
  );
}

function LoadingSection() {
  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF8F9",
        color: "#999999",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      লোড হচ্ছে...
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingSection />}>
        <HeroSectionWrapper />
      </Suspense>

      <Suspense fallback={<LoadingSection />}>
        <ProductsSection />
      </Suspense>

      <WhyZenvyFashion />
      {/* <GiftBanner /> */}
      <Testimonials />
     
    </main>
  );
}

