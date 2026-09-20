import { NextRequest, NextResponse } from "next/server";
import { createOrder, CreateOrderPayload } from "@/lib/orders";
import { sendTelegramNotification, formatOrderMessage } from "@/lib/telegram";

interface CartItem {
  productId: number;
  variationId: number | null;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutPayload {
  customer: {
    firstName: string;
    lastName?: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    postcode?: string;
    note?: string;
  };
  paymentMethod: "cod" | "bkash";
  items: CartItem[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutPayload = await request.json();

    // ===== 1. Validate required fields =====
    if (!body.customer?.firstName || !body.customer?.phone) {
      return NextResponse.json(
        { error: "নাম এবং ফোন নম্বর আবশ্যক" },
        { status: 400 },
      );
    }

    if (!body.customer?.address || !body.customer?.city) {
      return NextResponse.json(
        { error: "ঠিকানা এবং শহর আবশ্যক" },
        { status: 400 },
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "কার্ট খালি" }, { status: 400 });
    }

    // ===== 2. Map payment method =====
    const paymentMethodTitle =
      body.paymentMethod === "cod" ? "Cash on Delivery" : "bKash (Manual)";

    // ===== 3. Build billing object (conditionally) =====
    const billing: any = {
      first_name: body.customer.firstName,
      last_name: body.customer.lastName || "",
      address_1: body.customer.address,
      city: body.customer.city,
      country: "BD",
      phone: body.customer.phone,
    };

    if (body.customer.postcode && body.customer.postcode.trim() !== "") {
      billing.postcode = body.customer.postcode;
    }

    if (body.customer.email && body.customer.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(body.customer.email.trim())) {
        billing.email = body.customer.email.trim();
      }
    }

    // ===== 4. Build shipping object =====
    const shipping: any = {
      first_name: body.customer.firstName,
      last_name: body.customer.lastName || "",
      address_1: body.customer.address,
      city: body.customer.city,
      country: "BD",
    };

    if (body.customer.postcode && body.customer.postcode.trim() !== "") {
      shipping.postcode = body.customer.postcode;
    }

    // ===== 5. Build WooCommerce order payload =====
    const orderPayload: CreateOrderPayload = {
      payment_method: body.paymentMethod,
      payment_method_title: paymentMethodTitle,
      set_paid: false,
      status: "pending",
      billing,
      shipping,
      line_items: body.items.map((item) => ({
        product_id: item.productId,
        variation_id: item.variationId || undefined,
        quantity: item.quantity,
      })),
      customer_note: body.customer.note || "",
      meta_data: [
        { key: "_payment_method_label", value: paymentMethodTitle },
        { key: "_order_source", value: "Next.js Website" },
      ],
    };

    // ===== 6. Send to WooCommerce =====
    const order = await createOrder(orderPayload);

    if (!order) {
      return NextResponse.json(
        { error: "WooCommerce-এ অর্ডার তৈরি ব্যর্থ হয়েছে" },
        { status: 500 },
      );
    }

    // ===== 7. Send Telegram notification (non-blocking) =====
    const telegramMessage = formatOrderMessage({
      orderId: order.id,
      orderNumber: order.number,
      customerName: `${body.customer.firstName} ${
        body.customer.lastName || ""
      }`.trim(),
      customerPhone: body.customer.phone,
      customerCity: body.customer.city,
      customerAddress: body.customer.address,
      paymentMethod: body.paymentMethod,
      total: order.total,
      items: body.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      note: body.customer.note,
    });

    // Fire and forget — don't block the response
    sendTelegramNotification(telegramMessage).catch((err) =>
      console.error("Telegram notification error:", err),
    );

    // ===== 8. Success response =====
    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        orderNumber: order.number,
        total: order.total,
        status: order.status,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}
