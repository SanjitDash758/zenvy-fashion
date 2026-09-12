import axios from "axios";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

// WooCommerce API instance
export const wooApi = axios.create({
  baseURL: `${WP_URL}/wp-json/wc/v3`,
  auth: {
    username: CONSUMER_KEY!,
    password: CONSUMER_SECRET!,
  },
});

// WordPress API instance (posts, pages)
export const wpApi = axios.create({
  baseURL: `${WP_URL}/wp-json/wp/v2`,
});

// API Functions
export const getProducts = async (params = {}) => {
  const response = await wooApi.get("/products", { params });
  return response.data;
};

export const getProductBySlug = async (slug: string) => {
  const response = await wooApi.get("/products", { params: { slug } });
  return response.data[0];
};

export const getCategories = async () => {
  const response = await wooApi.get("/products/categories");
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await wooApi.get("/products", {
    params: { featured: true, per_page: 8 },
  });
  return response.data;
};