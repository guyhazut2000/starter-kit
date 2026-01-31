"use client";

import { authClient } from "@/lib/auth-client";
import {
  signupSchema,
  type SignupValues,
  type SignupResult,
} from "@/features/auth/schemas/auth-schema";

/**
 * Validates signup input and calls Better Auth signUp.email.
 * Use from Client Components (e.g. signup form).
 */
export async function signUpWithEmail(values: SignupValues): Promise<SignupResult> {
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    const fieldErrors: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(flattened.fieldErrors)) {
      if (Array.isArray(value) && value.length > 0) {
        fieldErrors[key] = value;
      }
    }
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors,
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
