"use server";

import { randomInt } from "crypto";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { getPending2StepCookie } from "@/features/auth/lib/pending-2step-cookie";

const OTP_EXPIRES_IN_SEC = 300; // 5 minutes
const SMS_IDENTIFIER_PREFIX = "two-step-login-sms-";

export type SendLoginOtpResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Step 2 of two-step login: send OTP to the user.
 * Email: uses Better Auth email OTP plugin. SMS: mock (log code, store in Verification).
 */
export async function sendLoginOtp(
  channel: "email" | "sms"
): Promise<SendLoginOtpResult> {
  const pending = await getPending2StepCookie();
  if (!pending) {
    return {
      success: false,
      error: "Session expired. Please sign in again.",
    };
  }

  const { email } = pending;

  if (channel === "email") {
    try {
      const res = await auth.api.sendVerificationOTP({
        body: { email, type: "sign-in" },
        headers: await headers(),
      });
      if (res && "success" in res && res.success === true) {
        return { success: true };
      }
      return {
        success: false,
        error: "Failed to send code. Please try again.",
      };
    } catch {
      return {
        success: false,
        error: "Failed to send code. Please try again.",
      };
    }
  }

  // SMS mock: generate OTP, store in Verification, log it
  const otp = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const identifier = `${SMS_IDENTIFIER_PREFIX}${email}`;
  const expiresAt = new Date(Date.now() + OTP_EXPIRES_IN_SEC * 1000);

  try {
    await prisma.verification.deleteMany({ where: { identifier } });
    await prisma.verification.create({
      data: {
        id: crypto.randomUUID(),
        identifier,
        value: `${otp}:0`,
        expiresAt,
      },
    });
    logger.info("Login OTP (SMS mock)", { email, otp });
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Failed to send code. Please try again.",
    };
  }
}
