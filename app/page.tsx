import { PageWrapper } from "@/components/layout/page-wrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <PageWrapper>{session?.user?.email ?? "no email"}</PageWrapper>;
}
