export default function LoginLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-neutral-50 to-neutral-100/80 dark:from-neutral-950 dark:to-neutral-900/50">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-[400px]">
          <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-xl shadow-neutral-200/50 dark:border-neutral-700/50 dark:bg-neutral-900 dark:shadow-neutral-950/50">
            <div className="px-8 pt-8 pb-2">
              <div className="mb-6 h-7 w-28 rounded-full bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-7 w-48 rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="mt-2 h-4 w-64 rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <div className="animate-pulse space-y-5 px-8 py-6">
              <div className="h-11 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-11 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-11 rounded-lg bg-blue-200/60 dark:bg-blue-900/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
