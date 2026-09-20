const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface OrderNotificationData {
  orderId: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  paymentMethod: string;
  total: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  note?: string;
}

export async function sendTelegramNotification(
  message: string,
): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram credentials missing in .env.local");
    return false;
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    const data = await res.json();

    if (!data.ok) {
      console.error("Telegram API error:", data.description);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Telegram fetch failed:", error);
    return false;
  }
}

/**
 * Format an order into a beautiful Telegram message.
 */
export function formatOrderMessage(order: OrderNotificationData): string {
  const itemsList = order.items
    .map(
      (item) =>
        `  • ${item.name} × ${item.quantity} — ৳${(
          item.price * item.quantity
        ).toLocaleString("bn-BD")}`,
    )
    .join("\n");

  const paymentLabel =
    order.paymentMethod === "cod"
      ? "ক্যাশ অন ডেলিভারি"
      : order.paymentMethod === "bkash"
        ? "বিকাশ (ম্যানুয়াল)"
        : order.paymentMethod;

  return `
🛒 <b>নতুন অর্ডার এসেছে!</b>

<b>অর্ডার নম্বর:</b> #${order.orderNumber}
<b>কাস্টমার:</b> ${order.customerName}
<b>ফোন:</b> ${order.customerPhone}
<b>ঠিকানা:</b> ${order.customerAddress}, ${order.customerCity}
<b>পেমেন্ট:</b> ${paymentLabel}
<b>মোট:</b> ৳${parseFloat(order.total).toLocaleString("bn-BD")}

<b>পণ্যসমূহ:</b>
${itemsList}

${order.note ? `<b>নোট:</b> ${order.note}\n` : ""}
━━━━━━━━━━━━━━━━
📊 ড্যাশবোর্ডে দেখুন:
https://www.zenvyfashion.com/admin/orders
`.trim();
}
