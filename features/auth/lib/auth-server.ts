import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { authRoutes } from "@/lib/routes";

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(authRoutes.login);
  }

  return { user: session.user };
}

export async function requireGuest() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect(authRoutes.dashboard);
  }
}
