"use client";

import type { LoginOtpChannel } from "@/features/auth/schemas/auth-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const errorClassName = "text-sm text-red-600 dark:text-red-400";

type LoginOtpStepProps = {
  otp: string;
  channel: LoginOtpChannel;
  fieldErrors: Record<string, string[]>;
  error: string | null;
  isPending: boolean;
  onOtpChange: (otp: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

export function LoginOtpStep({
  otp,
  channel,
  fieldErrors,
  error,
  isPending,
  onOtpChange,
  onSubmit,
  onBack,
}: LoginOtpStepProps) {
  const hint =
    channel === "email"
      ? "Check your email for the code."
      : "Check the server logs for the code (mock).";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-otp">Verification code</Label>
        <Input
          id="login-otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="000000"
          maxLength={6}
          value={otp}
          onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ""))}
          aria-invalid={Boolean(fieldErrors.otp)}
          aria-describedby={fieldErrors.otp ? "login-otp-error" : "login-otp-hint"}
        />
        {fieldErrors.otp?.[0] ? (
          <p id="login-otp-error" className={errorClassName} role="alert">
            {fieldErrors.otp[0]}
          </p>
        ) : (
          <p id="login-otp-hint" className="text-xs text-neutral-500 dark:text-neutral-400">
            {hint}
          </p>
        )}
      </div>
      {error && (
        <p className={errorClassName} role="alert">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          disabled={isPending || otp.length < 6}
          className="flex-1"
        >
          {isPending ? "Verifying..." : "Verify and sign in"}
        </Button>
      </div>
    </form>
  );
}
