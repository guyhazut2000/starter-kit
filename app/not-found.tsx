import Link from "next/link";

/**
 * Temporary 404 page – catches all non-matching routes.
 * Replace with a proper not-found UI when ready.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-4 dark:bg-black">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Page not found
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This page doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Back to home
      </Link>
    </div>
  );
}
