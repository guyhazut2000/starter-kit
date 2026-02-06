"use client";

import type { LoginValues } from "@/features/auth/schemas/auth-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const errorClassName = "text-sm text-red-600 dark:text-red-400";

type LoginCredentialsStepProps = {
  values: LoginValues;
  fieldErrors: Record<string, string[]>;
  error: string | null;
  isPending: boolean;
  onFieldChange: (field: keyof LoginValues, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function LoginCredentialsStep({
  values,
  fieldErrors,
  error,
  isPending,
  onFieldChange,
  onSubmit,
}: LoginCredentialsStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => onFieldChange("email", e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
        />
        {fieldErrors.email?.[0] && (
          <p id="login-email-error" className={errorClassName} role="alert">
            {fieldErrors.email[0]}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={values.password}
          onChange={(e) => onFieldChange("password", e.target.value)}
          aria-invalid={Boolean(fieldErrors.password)}
          aria-describedby={fieldErrors.password ? "login-password-error" : undefined}
        />
        {fieldErrors.password?.[0] && (
          <p id="login-password-error" className={errorClassName} role="alert">
            {fieldErrors.password[0]}
          </p>
        )}
      </div>
      {error && (
        <p className={errorClassName} role="alert">
          {error}
        </p>
      )}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Checking..." : "Continue"}
      </Button>
    </form>
  );
}
