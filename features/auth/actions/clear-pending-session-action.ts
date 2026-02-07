"use server";

import {
  clearPending2StepCookie,
  getPending2StepCookie,
} from "@/features/auth/lib/pending-2step-cookie";

export type ClearPendingSessionResult = {
  hadPendingSession: boolean;
};

/**
 * Clears the pending two-step login cookie if present.
 * Call from the login page (e.g. on mount) so that refresh or link entry starts fresh.
 * Cookie modification is only allowed in Server Actions, not in Server Component render.
 */
export async function clearPendingSessionIfAny(): Promise<ClearPendingSessionResult> {
  const pending = await getPending2StepCookie();
  if (pending === null) {
    return { hadPendingSession: false };
  }
  await clearPending2StepCookie();
  return { hadPendingSession: true };
}
