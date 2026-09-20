import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickySocial from "@/components/layout/StickySocial";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { getProducts } from "@/lib/api";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getProducts();

  return (
    <>
      <Header products={products} />
      <StickySocial />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}