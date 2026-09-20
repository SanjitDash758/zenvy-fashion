import { notFound } from "next/navigation";
import { getProductByDecodedSlug, getProductVariations } from "@/lib/api";
import ProductDetailClient from "@/components/product/ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // ✅ Next.js 15: await params
  const { slug } = await params;

  // Decode the slug (Bengali characters)
  const product = await getProductByDecodedSlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch variations
  const variations = await getProductVariations(product.id);

  return <ProductDetailClient product={product} variations={variations} />;
}
