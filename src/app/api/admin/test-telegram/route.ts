import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST() {
  try {
    // Step 1: Session check
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized — please log in again" },
        { status: 401 },
      );
    }

    // Step 2: Environment check
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        {
          error: "Telegram credentials missing",
          debug: {
            hasToken: !!token,
            hasChatId: !!chatId,
          },
        },
        { status: 500 },
      );
    }

    // Step 3: Build test message
    const now = new Date().toLocaleString("bn-BD", {
      timeZone: "Asia/Dhaka",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

    const message = `🧪 Test Notification

From: ${session.username}
Time: ${now}

✅ Telegram notification system is working!`;

    // Step 4: Call Telegram API
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      },
    );

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok || !telegramData.ok) {
      console.error("Telegram API error:", telegramData);
      return NextResponse.json(
        {
          error: "Telegram API rejected the request",
          debug: {
            status: telegramRes.status,
            description: telegramData.description || "unknown",
            errorCode: telegramData.error_code,
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Test telegram error:", error);
    return NextResponse.json(
      {
        error: "Server error",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
