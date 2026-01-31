import { Metadata } from "next";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { requireGuest } from "@/features/auth/lib/auth-server";

import { SignupForm } from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a new account",
};

export default async function SignupPage() {
  await requireGuest();

  return (
    <PageWrapper>
      <SignupForm />
    </PageWrapper>
  );
}
