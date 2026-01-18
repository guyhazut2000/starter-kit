"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/features/auth/_schemas/auth-schema";

interface LoginFormProps {
  redirectUrl?: string;
}

export function LoginForm({ redirectUrl = "/" }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Client-side validation
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((err) => {
        const path = (err.path[0] as string) ?? "root";
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      setFieldErrors(errors);
      setError(result.error.issues.map((e) => e.message).join(", "));
      return;
    }

    setIsLoading(true);

    try {
      // Use Better Auth client for authentication
      const response = await authClient.signIn.email({
        email: result.data.email,
        password: result.data.password,
      });

      if (response.error) {
        setError(response.error.message || "Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Redirect on success
      if (response.data) {
        router.push(redirectUrl);
        router.refresh();
      } else {
        setError("Login failed. Please try again.");
        setIsLoading(false);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  const inputBase =
    "mt-1.5 block w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/25 sm:text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className={inputBase}
          placeholder="you@example.com"
          required
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {fieldErrors.email && (
          <p
            id="email-error"
            className="mt-1.5 text-sm text-red-700 dark:text-red-400"
            role="alert"
          >
            {fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className={inputBase}
          placeholder="••••••••"
          required
          aria-invalid={!!fieldErrors.password}
          aria-describedby={fieldErrors.password ? "password-error" : undefined}
        />
        {fieldErrors.password && (
          <p
            id="password-error"
            className="mt-1.5 text-sm text-red-700 dark:text-red-400"
            role="alert"
          >
            {fieldErrors.password[0]}
          </p>
        )}
      </div>

      {error && (
        <div
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/40 dark:bg-red-950/50"
          role="alert"
        >
          <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-neutral-900"
        aria-busy={isLoading}
      >
        {isLoading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
