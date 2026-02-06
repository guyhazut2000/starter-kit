import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { authRoutes } from "@/lib/routes";
import {
  isApiRoute,
  shouldRedirectToLogin,
  shouldRedirectToDashboard,
  buildLoginUrl,
} from "@/lib/middleware-utils";

/**
 * Next.js middleware (proxy): handles auth redirects for public, protected, and API routes.
 * Optimistic redirects only; pages/API routes must still validate session.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://better-auth.com/docs/integrations/next
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isApiRoute(pathname)) {
    return NextResponse.next();
  }

  const hasSession = await getHasSession(request);

  if (shouldRedirectToLogin(pathname, hasSession)) {
    const loginUrl = buildLoginUrl(request.url, pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (shouldRedirectToDashboard(pathname, hasSession)) {
    return NextResponse.redirect(new URL(authRoutes.dashboard, request.url));
  }

  return NextResponse.next();
}

/**
 * Session check for middleware only. Kept here so middleware-utils stays pure (pathname + hasSession).
 */
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
