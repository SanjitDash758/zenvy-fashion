import axios from "axios";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

// WooCommerce API instance
const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
  "base64",
);

export const wooApi = axios.create({
  baseURL: `${WP_URL}/wp-json/wc/v3`,
  headers: {
    Authorization: `Basic ${credentials}`,
  },
});

// ===== Product Types =====
export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  type: string;
  status: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  sku: string;
  stock_status: string;
  stock_quantity: number | null;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  attributes: Array<{
    id: number;
    name: string;
    slug: string;
    options: string[];
    variation: boolean;
  }>;
  variations: number[];
  average_rating: string;
  rating_count: number;
}

// ===== Fetch all products =====
export const getProducts = async (params = {}): Promise<WooProduct[]> => {
  try {
    const response = await wooApi.get("/products", {
      params: {
        per_page: 100,
        status: "publish",
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// ===== Fetch single product by slug =====
export const getProductBySlug = async (
  slug: string,
): Promise<WooProduct | null> => {
  try {
    const response = await wooApi.get("/products", {
      params: { slug },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// ===== Fetch featured products =====
export const getFeaturedProducts = async (
  limit: number = 5,
): Promise<WooProduct[]> => {
  try {
    const response = await wooApi.get("/products", {
      params: {
        featured: true,
        per_page: limit,
        status: "publish",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

// ===== Fetch categories =====
export const getCategories = async () => {
  try {
    const response = await wooApi.get("/products/categories", {
      params: {
        per_page: 100,
        hide_empty: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// ===== Fetch products by category =====
export const getProductsByCategory = async (
  categorySlug: string,
): Promise<WooProduct[]> => {
  try {
    const response = await wooApi.get("/products", {
      params: {
        category: categorySlug,
        per_page: 100,
        status: "publish",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

// ===== Fetch variations of a product =====
export const getProductVariations = async (productId: number) => {
  try {
    const response = await wooApi.get(`/products/${productId}/variations`, {
      params: { per_page: 100 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching variations:", error);
    return [];
  }
};

// ===== Fetch single product by ID =====
export const getProductById = async (
  id: number,
): Promise<WooProduct | null> => {
  try {
    const response = await wooApi.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

// ===== Fetch product by decoded slug =====
export const getProductByDecodedSlug = async (
  encodedSlug: string,
): Promise<WooProduct | null> => {
  try {
    // Decode the URL-encoded slug (handles Bengali characters)
    const slug = decodeURIComponent(encodedSlug);

    const response = await wooApi.get("/products", {
      params: { slug, per_page: 1 },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

// ===== Fetch Puja Collection products (NEW) =====
export const getPujaCollectionProducts = async (
  limit: number = 8,
): Promise<WooProduct[]> => {
  try {
    const response = await wooApi.get("/products", {
      params: {
        category: 44,
        per_page: limit,
        status: "publish",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Puja Collection products:", error);
    return [];
  }
};
