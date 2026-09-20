import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {children}
      </body>
    </html>
  );
}
