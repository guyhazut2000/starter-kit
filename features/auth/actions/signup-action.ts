"use client";

import { authClient } from "@/lib/auth-client";
import { signupSchema } from "@/features/auth/schemas/auth-schema";
import type { SignupValues } from "@/features/auth/schemas/auth-schema";

export type SignupResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Validates signup input and calls Better Auth signUp.email.
 * Use from Client Components (e.g. signup form).
 */
export async function signUpWithEmail(values: SignupValues): Promise<SignupResult> {
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors: flattened.fieldErrors as Record<string, string[]>,
    };
  }

  const result = await authClient.signUp.email({
    ...parsed.data,
    name: parsed.data.name ?? "",
  });

  if (result?.error) {
    return {
      success: false,
      error:
        result.error?.message ??
        "We couldn't create your account. Please check your details and try again.",
    };
  }

  return { success: true };
}
