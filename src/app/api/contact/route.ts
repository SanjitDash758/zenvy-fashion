import { NextRequest, NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Validation
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "নাম, ফোন এবং বার্তা আবশ্যক" },
        { status: 400 },
      );
    }

    // Build Telegram message
    const telegramMessage = `
📩 <b>নতুন কন্টাক্ট মেসেজ!</b>

<b>নাম:</b> ${name}
<b>ফোন:</b> ${phone}
${email ? `<b>ইমেইল:</b> ${email}\n` : ""}
${subject ? `<b>বিষয়:</b> ${subject}\n` : ""}
<b>বার্তা:</b>
${message}

━━━━━━━━━━━━━━━━
📅 ${new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" })}
    `.trim();

    const sent = await sendTelegramNotification(telegramMessage);

    if (!sent) {
      return NextResponse.json(
        { error: "বার্তা পাঠানো ব্যর্থ হয়েছে" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}
