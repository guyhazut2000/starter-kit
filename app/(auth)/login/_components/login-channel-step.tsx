"use client";

import type { LoginOtpChannel } from "@/features/auth/schemas/auth-schema";
import { Button } from "@/components/ui/button";

const errorClassName = "text-sm text-red-600 dark:text-red-400";

type LoginChannelStepProps = {
  email: string;
  channel: LoginOtpChannel | null;
  error: string | null;
  isPending: boolean;
  onChannelChange: (channel: LoginOtpChannel | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

export function LoginChannelStep({
  email,
  channel,
  error,
  isPending,
  onChannelChange,
  onSubmit,
  onBack,
}: LoginChannelStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Code will be sent to: <strong>{email}</strong>
        </p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant={channel === "email" ? "default" : "outline"}
            className="flex-1"
            onClick={() => onChannelChange("email")}
          >
            Email
          </Button>
          <Button
            type="button"
            variant={channel === "sms" ? "default" : "outline"}
            className="flex-1"
            onClick={() => onChannelChange("sms")}
          >
            SMS (mock)
          </Button>
        </div>
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
          disabled={isPending || !channel}
          className="flex-1"
        >
          {isPending ? "Sending..." : "Send code"}
        </Button>
      </div>
    </form>
  );
}
