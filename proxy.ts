import { NextResponse } from "next/server";

/**
 * Next.js middleware (proxy): handles auth redirects for protected routes
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export function proxy() {
  return NextResponse.next();
}

/**
 * Matcher: run proxy on all paths except static assets and _next.
 * Values must be static for build-time analysis.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata)
     * - common static extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
