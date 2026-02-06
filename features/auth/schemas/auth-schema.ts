import { z } from "zod";

// ---------------------------------------------------------------------------
// Base auth fields — shared by login and signup
// ---------------------------------------------------------------------------

const baseAuthSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

export const loginSchema = baseAuthSchema;
export type LoginValues = z.infer<typeof loginSchema>;

/** Login credentials initial values. */
export const loginInitialValues: LoginValues = {
  email: "",
  password: "",
} as const;

/** OTP step: 6-digit code. */
export const loginOtpSchema = z.object({
  otp: z
    .string()
    .min(6, "Enter the 6-digit code.")
    .max(6)
    .regex(/^\d+$/, "Code must be 6 digits."),
});
export type LoginOtpValues = z.infer<typeof loginOtpSchema>;

/** Channel for sending OTP (email or sms). */
export type LoginOtpChannel = "email" | "sms";

// ---------------------------------------------------------------------------
// Signup — extends base with name
// ---------------------------------------------------------------------------

export const signupSchema = baseAuthSchema.extend({
  name: z.string().max(256).optional(),
});
export type SignupValues = z.infer<typeof signupSchema>;

/** Empty form values for signup; single source of truth for initial state. */
export const signupInitialValues: SignupValues = {
  name: "",
  email: "",
  password: "",
} as const;

/** Field keys for signup form (e.g. for reducer actions). */
export const signupFieldKeys = signupSchema.keyof().enum;

// ---------------------------------------------------------------------------
// Action result types — used by signup action and form hook
// ---------------------------------------------------------------------------

export type SignupResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };
