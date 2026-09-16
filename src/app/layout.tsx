import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickySocial from "@/components/layout/StickySocial";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { getProducts } from "@/lib/api";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZenvyFashion - Style that Speaks",
  description: "Premium baby and kids saree collection for special occasions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch products for search functionality
  const products = await getProducts();

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${cormorant.variable} ${inter.variable}`}
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          backgroundColor: "#FFFFFF",
          color: "#333333",
          margin: 0,
          padding: 0,
        }}
        suppressHydrationWarning
      >
        <Header products={products} />
        <StickySocial />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
