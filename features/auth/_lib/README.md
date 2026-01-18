# Route Protection

This directory contains utilities for protecting routes in the application.

## Files

- `route-protection.ts` - Server-side utilities for route protection in Server Components

## Usage

### In Server Components

```typescript
import { requireAuth, getServerSession } from "@/features/auth/_lib/route-protection";

// Require authentication (redirects to /login if not authenticated)
export default async function ProtectedPage() {
  const session = await requireAuth();
  // session is guaranteed to exist here
  return <div>Welcome, {session.user.name}</div>;
}

// Get session without redirecting
export default async function OptionalAuthPage() {
  const session = await getServerSession();
  return <div>{session ? `Welcome, ${session.user.name}` : "Please sign in"}</div>;
}

// Require guest (redirects to /dashboard if authenticated)
export default async function LoginPage() {
  await requireGuest();
  return <LoginForm />;
}
```

## Middleware Protection

Route protection is handled at the middleware level in `middleware.ts` (root directory).

### Protected Routes

Add routes to the `protectedRoutes` array in `middleware.ts`:

```typescript
const protectedRoutes = [
  "/dashboard",
  "/account",
  "/profile",
  "/settings",
  // Add your protected routes here
];
```

### Public Routes

Add routes to the `publicRoutes` array in `middleware.ts`:

```typescript
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  // Add your public routes here
];
```

## Security Notes

- Middleware uses **fast cookie check** for UX (quick redirects)
- Always validate authentication in route handlers/Server Components for actual security
- Use `requireAuth()` in Server Components for full session validation
- Never rely solely on middleware for security - always validate in your route handlers
