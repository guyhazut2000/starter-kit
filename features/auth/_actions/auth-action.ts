"use server";

import { loginSchema } from "@/features/auth/_schemas/auth-schema";
import type { AuthResult } from "@/features/auth/_types/auth";

/**
 * Validates login form data with Zod schema.
 * Note: Better Auth handles the actual authentication via its API routes.
 * This action is for server-side validation only.
 */
export async function validateLogin(
  formData: FormData
): Promise<AuthResult<{ email: string }>> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Validate with Zod
  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(", "),
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: { email: result.data.email },
  };
}
