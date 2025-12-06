import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected and auth routes
  const isProtectedRoute = path.startsWith("/111");
  const isAuthRoute = path === "/login" || path === "/signup";

  // Get token from cookie
  const token = request.cookies.get("auth-token")?.value;

  console.log(
    "[middleware] path=" + path,
    "tokenPresent=" + !!token,
    "tokenPreview=" + (token ? token.substring(0, 20) + "..." : "null")
  );

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    console.log("[middleware] no token -> redirect to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token if exists
  if (token) {
    const payload = verifyToken(token);
    console.log(
      "[middleware] verifyToken result:",
      payload ? "VALID" : "INVALID"
    );

    // Redirect to login if token is invalid and accessing protected route
    if (!payload && isProtectedRoute) {
      console.log(
        "[middleware] token invalid -> clearing cookie + redirect to /login"
      );
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      return response;
    }

    // Redirect to dashboard if already logged in and trying to access auth pages
    if (payload && isAuthRoute) {
      console.log(
        "[middleware] valid token on auth page -> redirect to /dashboard"
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  console.log("[middleware] allowing request to proceed");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
