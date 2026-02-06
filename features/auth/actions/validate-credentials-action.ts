"use server";

import { hashPassword, verifyPassword } from "better-auth/crypto";

import { prisma } from "@/lib/prisma";
import { setPending2StepCookie } from "@/features/auth/lib/pending-2step-cookie";

const GENERIC_ERROR = "Invalid email or password. Please try again.";

export type ValidateCredentialsResult = { success: true } | { success: false; error: string };

/**
 * Step 1 of two-step login: validate email and password without creating a session.
 * On success, sets a signed pending_2step cookie and returns success.
 */
export async function validateCredentials(
  email: string,
  password: string
): Promise<ValidateCredentialsResult> {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { success: false, error: GENERIC_ERROR };
  }

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, email: true, password: true },
  });

  if (!user?.password) {
    return { success: false, error: GENERIC_ERROR };
  }

  let valid: boolean;
  try {
    valid = await verifyPassword({ hash: user.password, password });
  } catch {
    return { success: false, error: GENERIC_ERROR };
  }

  if (!valid) {
    return { success: false, error: GENERIC_ERROR };
  }

  await setPending2StepCookie({ email: user.email });
  return { success: true };
}
