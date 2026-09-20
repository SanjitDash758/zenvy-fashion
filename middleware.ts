import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "zenvy_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    // Allow the login page
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const session = request.cookies.get(COOKIE_NAME)?.value;
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};