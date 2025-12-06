import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected and auth routes
  const isProtectedRoute = path.startsWith("/dashboard");
  const isAuthRoute = path === "/login" || path === "/signup";

  // Get token from cookie
  const token = request.cookies.get("auth-token")?.value;

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token if exists
  if (token) {
    const payload = verifyToken(token);

    // Redirect to login if token is invalid
    if (!payload && isProtectedRoute) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      return response;
    }

    // Redirect to dashboard if already logged in and trying to access auth pages
    if (payload && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
