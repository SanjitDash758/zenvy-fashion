import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

// Simple in-memory rate limiter
// In production, use Redis or Vercel KV
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = 10; // 10 requests per minute
  const windowMs = 60 * 1000;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "অনেক বেশি চেষ্টা করেছেন। এক মিনিট পর আবার চেষ্টা করুন।",
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { orderNumber, phone } = body;

    // Validation
    if (!orderNumber || !phone) {
      return NextResponse.json(
        { error: "অর্ডার নম্বর এবং ফোন নম্বর আবশ্যক" },
        { status: 400 },
      );
    }

    // Normalize inputs
    const cleanOrderNumber = String(orderNumber).replace(/[#\s]/g, "").trim();
    const cleanPhone = String(phone)
      .replace(/[\s\-\(\)]/g, "")
      .trim();

    if (cleanOrderNumber.length === 0 || cleanPhone.length < 10) {
      return NextResponse.json(
        { error: "সঠিক অর্ডার নম্বর এবং ফোন নম্বর দিন" },
        { status: 400 },
      );
    }

    // Parse order ID
    const orderId = parseInt(cleanOrderNumber, 10);
    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: "অর্ডার নম্বর সঠিক নয়" },
        { status: 400 },
      );
    }

    // Fetch order from WooCommerce
    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.json(
        { error: "এই অর্ডার নম্বরে কোনো অর্ডার পাওয়া যায়নি" },
        { status: 404 },
      );
    }

    // Verify phone matches (only last 10 digits to handle +880 vs 0 prefixes)
    const orderPhone = (order.billing.phone || "").replace(/[\s\-\(\)]/g, "");
    const last10OrderPhone = orderPhone.slice(-10);
    const last10ProvidedPhone = cleanPhone.slice(-10);

    if (last10OrderPhone !== last10ProvidedPhone) {
      // Deliberately vague error to prevent enumeration
      return NextResponse.json(
        { error: "অর্ডার নম্বর বা ফোন নম্বর সঠিক নয়" },
        { status: 404 },
      );
    }

    // Build public-safe response (no sensitive data)
    const publicOrder = {
      id: order.id,
      number: order.number,
      status: order.status,
      date_created: order.date_created,
      date_modified: order.date_modified,
      total: order.total,
      currency: order.currency,
      payment_method_title: order.payment_method_title,
      payment_method: order.payment_method,
      customer: {
        first_name: order.billing.first_name,
        last_name: order.billing.last_name,
        city: order.billing.city,
        // Don't include full address or email
      },
      items: order.line_items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        image: item.image?.src || null,
      })),
      meta: {
        // Estimated delivery (if order is processing, ~3 days)
        estimated_delivery: estimateDelivery(order.date_created, order.status),
      },
    };

    return NextResponse.json({ success: true, order: publicOrder });
  } catch (error: any) {
    console.error("Track order error:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}

/**
 * Estimate delivery date based on order date and status.
 */
function estimateDelivery(orderDate: string, status: string): string | null {
  if (["completed", "cancelled", "refunded", "failed"].includes(status)) {
    return null;
  }

  try {
    let normalized = orderDate;
    if (!normalized.endsWith("Z") && !normalized.includes("+")) {
      normalized = `${normalized}Z`;
    }
    const created = new Date(normalized);
    const now = new Date();

    // Bangladesh: typically 2-4 days from confirmation
    const minDate = new Date(created);
    minDate.setDate(minDate.getDate() + 2);

    const maxDate = new Date(created);
    maxDate.setDate(maxDate.getDate() + 4);

    // If already past maxDate, return null
    if (now > maxDate) {
      return null;
    }

    const minStr = minDate.toLocaleDateString("bn-BD", {
      timeZone: "Asia/Dhaka",
      day: "numeric",
      month: "short",
    });
    const maxStr = maxDate.toLocaleDateString("bn-BD", {
      timeZone: "Asia/Dhaka",
      day: "numeric",
      month: "short",
    });

    return `${minStr} - ${maxStr}`;
  } catch {
    return null;
  }
}
