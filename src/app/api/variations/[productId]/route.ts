import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 },
      );
    }

    const response = await axios.get(
      `${WP_URL}/wp-json/wc/v3/products/${productId}/variations`,
      {
        params: { per_page: 100 },
        auth: {
          username: CONSUMER_KEY!,
          password: CONSUMER_SECRET!,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching variations:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch variations" },
      { status: error.response?.status || 500 },
    );
  }
}
