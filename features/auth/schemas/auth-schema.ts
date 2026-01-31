import { z } from "zod";

const baseAuthSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = baseAuthSchema;
export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = baseAuthSchema.extend({
  name: z.string().max(256).optional(),
});
export type SignupValues = z.infer<typeof signupSchema>;
