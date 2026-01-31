import { PageWrapper } from "@/components/layout/page-wrapper";
import { requireGuest } from "@/features/auth/lib/auth-server";
import { LoginForm } from "./_components/login-form";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your account",
};

export default async function LoginPage() {
  await requireGuest();

  return (
    <PageWrapper>
      <LoginForm />
    </PageWrapper>
  );
}
