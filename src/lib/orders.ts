import axios from "axios";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

// ===== Base64 credentials (same as api.ts) =====
const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
  "base64",
);

// ===== Order Types =====
export interface OrderLineItem {
  product_id: number;
  variation_id?: number;
  quantity: number;
  name?: string;
  price?: number;
  total?: string;
  image?: { src: string };
}

export interface OrderBilling {
  first_name: string;
  last_name?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state?: string;
  postcode?: string;
  country: string;
  email?: string;
  phone: string;
}

export interface OrderShipping {
  first_name: string;
  last_name?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state?: string;
  postcode?: string;
  country: string;
}

export interface CreateOrderPayload {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  status?: string;
  billing: OrderBilling;
  shipping: OrderShipping;
  line_items: OrderLineItem[];
  customer_note?: string;
  meta_data?: Array<{ key: string; value: string }>;
}

export interface WooOrder {
  id: number;
  number: string;
  status: string;
  currency: string;
  date_created: string;
  date_modified: string;
  total: string;
  subtotal: string;
  total_tax: string;
  shipping_total: string;
  discount_total: string;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_id: number;
  customer_note: string;
  billing: OrderBilling;
  shipping: OrderShipping;
  line_items: Array<{
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    price: number;
    total: string;
    image?: { src: string };
  }>;
  meta_data: Array<{ id: number; key: string; value: any }>;
}

// ===== WooCommerce Orders API instance (same auth pattern as api.ts) =====
const ordersApi = axios.create({
  baseURL: `${WP_URL}/wp-json/wc/v3`,
  headers: {
    Authorization: `Basic ${credentials}`,
  },
});

// ===== Create a new order =====
export async function createOrder(
  payload: CreateOrderPayload,
): Promise<WooOrder | null> {
  try {
    const response = await ordersApi.post("/orders", payload);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message,
    );
    return null;
  }
}

// ===== Fetch a single order by ID =====
export async function getOrder(orderId: number): Promise<WooOrder | null> {
  try {
    const response = await ordersApi.get(`/orders/${orderId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching order:",
      error.response?.data || error.message,
    );
    return null;
  }
}

// ===== Fetch all orders (for dashboard) =====
export async function getAllOrders(
  params: {
    per_page?: number;
    page?: number;
    status?: string;
  } = {},
): Promise<WooOrder[]> {
  try {
    const response = await ordersApi.get("/orders", {
      params: {
        per_page: params.per_page || 50,
        page: params.page || 1,
        orderby: "date",
        order: "desc",
        ...(params.status ? { status: params.status } : {}),
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching orders:",
      error.response?.data || error.message,
    );
    return [];
  }
}

// ===== Update order status =====
export async function updateOrderStatus(
  orderId: number,
  status: string,
): Promise<WooOrder | null> {
  try {
    const response = await ordersApi.put(`/orders/${orderId}`, { status });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating order status:",
      error.response?.data || error.message,
    );
    return null;
  }
}
// ===== Fetch order notes (status change history) =====
export interface OrderNote {
  id: number;
  author: string;
  date_created: string;
  note: string;
  customer_note: boolean;
}

export async function getOrderNotes(orderId: number): Promise<OrderNote[]> {
  try {
    const response = await ordersApi.get(`/orders/${orderId}/notes`, {
      params: { per_page: 100 },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching order notes:",
      error.response?.data || error.message,
    );
    return [];
  }
}
