/**
 * Route paths — single source of truth for redirects and links.
 * Import from here instead of hardcoding paths.
 */
export const authRoutes = {
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
} as const;

/** Public routes: no auth required. Auth pages redirect to dashboard when signed in. */
export const publicRoutes = ["/", authRoutes.login, authRoutes.signup] as const;

/** Protected routes: require auth; redirect to login when not signed in. */
export const protectedRoutes = [authRoutes.dashboard] as const;

/** API routes that are always public (e.g. auth handler, webhooks). */
export const publicApiRoutes = ["/api/auth"] as const;
