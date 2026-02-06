"use client";

import Link from "next/link";

import { authRoutes } from "@/lib/routes";
import { useLoginForm } from "@/features/auth/hooks/use-login-form";
import { LoginCredentialsStep } from "./login-credentials-step";
import { LoginChannelStep } from "./login-channel-step";
import { LoginOtpStep } from "./login-otp-step";

const stepCopy: Record<
  "credentials" | "channel" | "otp",
  { title: string; description: string }
> = {
  credentials: {
    title: "Sign in",
    description: "Use your email and password to access your account.",
  },
  channel: {
    title: "Sign in",
    description: "Choose how to receive your verification code.",
  },
  otp: {
    title: "Sign in",
    description: "Enter the 6-digit code we sent to you.",
  },
};

export function LoginForm() {
  const {
    step,
    credentials,
    channel,
    otp,
    error,
    fieldErrors,
    setCredentialsField,
    setChannel,
    setOtp,
    handleCredentialsSubmit,
    handleChannelSubmit,
    handleOtpSubmit,
    backToCredentials,
    backToChannel,
    isPending,
  } = useLoginForm();

  const { description } = stepCopy[step];

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          {stepCopy[step].title}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>

      {step === "credentials" && (
        <LoginCredentialsStep
          values={credentials}
          fieldErrors={fieldErrors}
          error={error}
          isPending={isPending}
          onFieldChange={setCredentialsField}
          onSubmit={handleCredentialsSubmit}
        />
      )}

      {step === "channel" && (
        <LoginChannelStep
          email={credentials.email}
          channel={channel}
          error={error}
          isPending={isPending}
          onChannelChange={setChannel}
          onSubmit={handleChannelSubmit}
          onBack={backToCredentials}
        />
      )}

      {step === "otp" && channel && (
        <LoginOtpStep
          otp={otp}
          channel={channel}
          fieldErrors={fieldErrors}
          error={error}
          isPending={isPending}
          onOtpChange={setOtp}
          onSubmit={handleOtpSubmit}
          onBack={backToChannel}
        />
      )}

      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link
          href={authRoutes.signup}
          className="font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
        >
          Sign up
        </Link>
        .
      </p>
    </div>
  );
}
