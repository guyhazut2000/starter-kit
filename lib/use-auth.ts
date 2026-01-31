"use client";

import { useRouter } from "next/navigation";
import { authRoutes } from "@/lib/routes";
import { authClient } from "@/lib/auth-client";

/**
 * Global client auth hook (Clerk-style). Use in Client Components.
 *
 * @returns { user, session, isLoaded, signIn, signOut }
 * - user, session: null when signed out
 * - isLoaded: false while session is loading
 * - signOut: signs out and redirects to login (configurable via options.redirectTo)
 */
export function useAuth() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  return {
    user: session?.user ?? null,
    session: session?.session ?? null,
    isLoaded: !isPending,
    refetch,

    signIn: authClient.signIn,
    signUp: authClient.signUp,

    signOut: (options?: { redirectTo?: string }) => {
      return authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(options?.redirectTo ?? authRoutes.login);
            router.refresh();
          },
        },
      });
    },
  };
}

/**
 * Re-export authClient for cases that need lower-level access.
 */
export { authClient };
