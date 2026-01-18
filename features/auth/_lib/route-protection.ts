import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Get the current session on the server
 * Use this in Server Components or Server Actions
 */
export async function getServerSession() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });
    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Require authentication in Server Components
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

/**
 * Require no authentication (for auth pages)
 * Redirects to dashboard if already authenticated
 */
export async function requireGuest() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
}
