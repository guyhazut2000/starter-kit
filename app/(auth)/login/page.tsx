import { LoginForm } from "@/features/auth/_components/LoginForm";
import { requireGuest } from "@/features/auth/_lib/route-protection";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default async function LoginPage() {
  await requireGuest();

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-neutral-50 to-neutral-100/80 dark:from-neutral-950 dark:to-neutral-900/50">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-[400px]">
          <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-xl shadow-neutral-200/50 dark:border-neutral-700/50 dark:bg-neutral-900 dark:shadow-neutral-950/50">
            <div className="px-8 pt-8 pb-2">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure sign-in
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">
                Sign in to your account
              </h1>
              <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                Enter your email and password to continue
              </p>
            </div>

            <div className="px-8 py-6">
              <LoginForm />
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-neutral-500 dark:text-neutral-500">
            Forgot your password? Contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
