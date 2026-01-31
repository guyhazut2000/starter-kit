import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { authRoutes, protectedRoutes } from "@/lib/routes";

/**
 * Next.js middleware (proxy): handles auth redirects for public, protected, and API routes.
 * Optimistic redirects only; pages/API routes must still validate session.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://better-auth.com/docs/integrations/next
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes: public API routes (e.g. /api/auth) pass through; others continue without redirect
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const hasSession = await getHasSession(request);

  // Protected routes: redirect to login when not signed in
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  if (isProtected && !hasSession) {
    const loginUrl = new URL(authRoutes.login, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Public auth pages (login/signup): redirect to dashboard when signed in
  const isAuthPage =
    pathname === authRoutes.login || pathname === authRoutes.signup;
  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL(authRoutes.dashboard, request.url));
  }

  return NextResponse.next();
}

async function getHasSession(request: NextRequest): Promise<boolean> {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    return Boolean(session?.user);
  } catch {
    return false;
  }
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
