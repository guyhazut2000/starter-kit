"use client";

import { useAuth } from "@/hooks/use-auth";

export function SignOutButton() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
    >
      Sign out
    </button>
  );
}
