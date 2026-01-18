import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Public routes that don't require authentication
 * Note: "/" is handled separately - it redirects based on auth status
 */
const publicRoutes = ["/login", "/signup", "/sign-in", "/sign-up", "/api/auth"];

/**
 * Protected routes that require authentication
 * Add your protected routes here
 */
const protectedRoutes = ["/dashboard", "/account", "/profile", "/settings"];

/**
 * Check if a path is a public route
 */
function isPublicRoute(pathname: string): boolean {
  return (
    publicRoutes.some((route) => pathname === route || pathname.startsWith(route)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/favicon") ||
    !!pathname.match(/\.(ico|png|jpg|jpeg|svg|webp)$/)
  );
}

/**
 * Check if a path is a protected route
 */
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

/**
 * Fast cookie check (optimistic, for UX)
 * This is fast but not fully secure - always validate in route handlers
 */
function hasSessionCookie(request: NextRequest): boolean {
  const sessionCookie = getSessionCookie(request);
  return !!sessionCookie;
}

/**
 * Proxy function that runs before route handling
 * Handles public and protected route logic
 *
 * Note: In Next.js 16+, middleware.ts is deprecated and replaced with proxy.ts
 * Proxy always runs on Node.js runtime (not Edge)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle root path "/" - redirect based on authentication status
  if (pathname === "/") {
    if (hasSessionCookie(request)) {
      // User is authenticated, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      // User is not authenticated, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow public routes and static assets
  if (isPublicRoute(pathname)) {
    // If user is authenticated and tries to access login/signup, redirect to dashboard
    if (
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/sign-in" ||
      pathname === "/sign-up"
    ) {
      if (hasSessionCookie(request)) {
        // User is logged in, redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  // Protect routes that require authentication
  if (isProtectedRoute(pathname)) {
    // Use fast cookie check for better UX (redirects quickly)
    // For full security, always validate in route handlers using requireAuth()
    if (!hasSessionCookie(request)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

/**
 * Matcher configuration
 * Only run proxy on routes that need protection
 * Excludes static files and Next.js internals
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
