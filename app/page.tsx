import { PageWrapper } from "@/components/layout/page-wrapper";
import { requireAuth } from "@/features/auth/lib/auth-server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function HomePage() {
  await requireAuth();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <PageWrapper>{session?.user?.email ?? "no email"}</PageWrapper>;
}
