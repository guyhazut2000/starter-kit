import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins/email-otp";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [env.BETTER_AUTH_URL],
  advanced: {
    cookiePrefix: env.SESSION_COOKIE_PREFIX,
  },
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          // Dev: log OTP; in production integrate Resend or another provider
          logger.info("Login OTP (dev)", { email, otp });
          // Fire-and-forget to avoid timing leaks; in production call your email API here
        }
      },
    }),
  ],
  experimental: {
    joins: true,
  },
});
