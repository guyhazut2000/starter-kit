"use client";

import Link from "next/link";

import { authRoutes } from "@/lib/routes";
import { useSignupForm } from "@/features/auth/hooks/use-signup-form";
import { useAuth } from "@/hooks/use-auth";

const inputClassName =
  "block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-neutral-100 dark:focus:ring-neutral-100/10";

export function SignupForm() {
  const { isLoaded } = useAuth();
  const {
    values,
    fieldErrors,
    error,
    setField,
    handleSubmit,
    isPending,
  } = useSignupForm();

  const isSubmitting = isPending;
  const isDisabled = isSubmitting || !isLoaded;

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Create your account
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Sign up with your email and a secure password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Name (optional)
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={values.name ?? ""}
            onChange={(e) => setField("name", e.target.value)}
            className={inputClassName}
          />
          {fieldErrors.name?.[0] && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className={inputClassName}
          />
          {fieldErrors.email?.[0] && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={values.password}
            onChange={(e) => setField("password", e.target.value)}
            className={inputClassName}
          />
          {fieldErrors.password?.[0] && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {fieldErrors.password[0]}
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className="flex w-full items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        Already have an account?{" "}
        <Link
          href={authRoutes.login}
          className="font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
        >
          Sign in
        </Link>
        .
      </p>
    </div>
  );
}
