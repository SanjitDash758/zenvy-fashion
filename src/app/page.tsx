import HeroSection from "@/components/home/HeroSection";
import ProductFilter from "@/components/home/ProductFilter";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyZenvyFashion from "@/components/home/WhyZenvyFashion";
// import GiftBanner from "@/components/home/GiftBanner";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductFilter />
      <FeaturedProducts />
      <WhyZenvyFashion />
      {/* <GiftBanner /> */}
      <Testimonials />
    </main>
  );
}
