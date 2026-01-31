import Link from "next/link";
import { requireAuth } from "@/features/auth/lib/auth-server";
import { SignOutButton } from "./_components/SignOutButton";

export const metadata = {
  title: "Dashboard",
  description: "Your dashboard",
};

export default async function DashboardPage() {
  const { user } = await requireAuth();

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">Dashboard</h1>
          <SignOutButton />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6 text-center">
          <h2 className="text-xl font-medium text-neutral-900 dark:text-white">
            Welcome{user.name ? `, ${user.name}` : ""}
          </h2>
          {user.email && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
          )}
          <p className="text-neutral-600 dark:text-neutral-400">
            This is your dashboard. More to come.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/"
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
