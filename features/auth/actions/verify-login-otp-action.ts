"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getPending2StepCookie,
  clearPending2StepCookie,
} from "@/features/auth/lib/pending-2step-cookie";

const SMS_IDENTIFIER_PREFIX = "two-step-login-sms-";

export type VerifyLoginOtpResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Step 3 of two-step login: verify OTP and clear pending cookie.
 * Does not create the session — client must call signIn.emailOtp(email, otp) after success.
 */
export async function verifyLoginOtp(
  otp: string,
  channel: "email" | "sms"
): Promise<VerifyLoginOtpResult> {
  const pending = await getPending2StepCookie();
  if (!pending) {
    return {
      success: false,
      error: "Session expired. Please sign in again.",
    };
  }

  const { email } = pending;
  const code = otp?.trim().replace(/\s/g, "");

  if (!code || code.length < 6) {
    return { success: false, error: "Please enter the 6-digit code." };
  }

  if (channel === "email") {
    try {
      const res = await auth.api.checkVerificationOTP({
        body: { email, type: "sign-in", otp: code },
        headers: await headers(),
      });
      if (res && "success" in res && res.success === true) {
        await clearPending2StepCookie();
        return { success: true };
      }
      return {
        success: false,
        error: "Invalid or expired code. Please try again.",
      };
    } catch {
      return {
        success: false,
        error: "Invalid or expired code. Please try again.",
      };
    }
  }

  // SMS mock: verify against stored value
  const identifier = `${SMS_IDENTIFIER_PREFIX}${email}`;
  const row = await prisma.verification.findFirst({
    where: { identifier },
    orderBy: { createdAt: "desc" },
  });

  if (!row || row.expiresAt < new Date()) {
    return {
      success: false,
      error: "Invalid or expired code. Please try again.",
    };
  }

  const [storedOtp] = row.value.split(":");
  if (storedOtp !== code) {
    return {
      success: false,
      error: "Invalid or expired code. Please try again.",
    };
  }

  try {
    await prisma.verification.delete({ where: { id: row.id } });
    await clearPending2StepCookie();
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
