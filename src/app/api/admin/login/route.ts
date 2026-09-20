import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  generateSessionToken,
  ADMIN_COOKIE_NAME,
  getSessionCookieOptions,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validation
    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "ইউজারনেম আবশ্যক" }, { status: 400 });
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "পাসওয়ার্ড আবশ্যক" }, { status: 400 });
    }

    // Authenticate
    const user = await authenticateUser(username, password);

    if (!user) {
      // Delay to prevent brute force
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json(
        { error: "ভুল ইউজারনেম বা পাসওয়ার্ড" },
        { status: 401 },
      );
    }

    // Generate session
    const token = generateSessionToken(user);

    const response = NextResponse.json({
      success: true,
      user: {
        username: user.username,
        displayName: user.display_name,
        role: user.role,
      },
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, getSessionCookieOptions());

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "সার্ভারে সমস্যা" }, { status: 500 });
  }
}
