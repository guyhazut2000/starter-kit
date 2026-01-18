"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LoginError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-neutral-50 to-neutral-100/80 dark:from-neutral-950 dark:to-neutral-900/50">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-[400px]">
          <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-xl shadow-neutral-200/50 dark:border-neutral-700/50 dark:bg-neutral-900 dark:shadow-neutral-950/50">
            <div className="px-8 py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <svg
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {error.message || "An unexpected error occurred. Please try again."}
              </p>
              <button
                onClick={reset}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-neutral-900"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
