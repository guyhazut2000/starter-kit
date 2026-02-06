import { authRoutes, protectedRoutes } from "@/lib/routes";

/**
 * Middleware route guards — pure functions over pathname and session.
 * Use in Next.js middleware to decide redirects without hardcoded paths.
 */

/** True when the request is to an API path (e.g. /api/auth). No auth redirects. */
export function isApiRoute(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

/** True when the path is a protected route or a subpath of one (e.g. /dashboard, /dashboard/settings). */
export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

/** True when the path is the login or signup page. */
export function isAuthPage(pathname: string): boolean {
  return pathname === authRoutes.login || pathname === authRoutes.signup;
}

/**
 * True when the user is not signed in and is on a protected route.
 * Middleware should redirect to login in this case.
 */
export function shouldRedirectToLogin(pathname: string, hasSession: boolean): boolean {
  return isProtectedRoute(pathname) && !hasSession;
}

/**
 * True when the user is signed in and is on login or signup.
 * Middleware should redirect to dashboard in this case.
 */
export function shouldRedirectToDashboard(pathname: string, hasSession: boolean): boolean {
  return isAuthPage(pathname) && hasSession;
}

/**
 * Build the login URL with an optional callback so the user returns after signing in.
 */
export function buildLoginUrl(baseUrl: string, callbackPathname?: string): URL {
  const url = new URL(authRoutes.login, baseUrl);
  if (callbackPathname) {
    url.searchParams.set("callbackUrl", callbackPathname);
  }
  return url;
}
