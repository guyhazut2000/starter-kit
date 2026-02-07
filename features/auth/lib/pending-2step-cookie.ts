import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

import { env } from "@/lib/env";

/** Prefixed so multiple apps on the same server do not share the pending 2-step cookie. */
const COOKIE_NAME = `${env.SESSION_COOKIE_PREFIX}.pending_2step`;
const MAX_AGE_SEC = 600; // 10 minutes

export interface Pending2StepPayload {
  email: string;
  exp: number;
}

function base64UrlEncode(value: Buffer): string {
  return value.toString("base64url");
}

function base64UrlDecode(value: string): Buffer {
  return Buffer.from(value, "base64url");
}

function sign(payload: string, secret: string): string {
  const signature = createHmac("sha256", secret).update(payload).digest();
  return base64UrlEncode(signature);
}

function verify(payload: string, signature: string, secret: string): boolean {
  const expected = sign(payload, secret);
  try {
    // `timingSafeEqual` requires buffers of the same length.
    if (signature.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(signature, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}

/**
 * Set the pending two-step cookie after step 1 (valid credentials).
 * Payload contains email and expiry; signed with BETTER_AUTH_SECRET.
 */
export async function setPending2StepCookie(payload: {
  email: string;
  exp?: number;
}): Promise<void> {
  const exp = payload.exp ?? Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const data: Pending2StepPayload = { email: payload.email, exp };
  const raw = JSON.stringify(data);
  const encoded = base64UrlEncode(Buffer.from(raw, "utf8"));
  const signature = sign(encoded, env.BETTER_AUTH_SECRET);
  const value = `${encoded}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SEC,
    path: "/",
  });
}

/**
 * Read and verify the pending two-step cookie.
 * Returns payload if valid and not expired; null otherwise.
 */
export async function getPending2StepCookie(): Promise<Pending2StepPayload | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) return null;

  const dot = value.indexOf(".");
  if (dot === -1) return null;
  const encoded = value.slice(0, dot);
  const signature = value.slice(dot + 1);

  if (!verify(encoded, signature, env.BETTER_AUTH_SECRET)) return null;

  let data: Pending2StepPayload;
  try {
    const raw = base64UrlDecode(encoded).toString("utf8");
    data = JSON.parse(raw) as Pending2StepPayload;
  } catch {
    return null;
  }

  if (typeof data.email !== "string" || typeof data.exp !== "number") return null;
  if (data.exp < Math.floor(Date.now() / 1000)) return null;

  return data;
}

/**
 * Clear the pending two-step cookie (after successful OTP or when user abandons).
 */
export async function clearPending2StepCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
