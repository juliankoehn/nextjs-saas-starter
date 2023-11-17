import { buttonVariants } from "#/components/ui/button";
import { getPageSession } from "#/lib/auth/lucia";
import { cn } from "#/utils";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./form";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Login",
  description: "Open Source SaaS Starter Kit",
};

export default async function Home({
  searchParams,
}: {
  searchParams: {
    token?: string;
    callbackUrl?: string;
  };
}) {
  const token = searchParams.token;

  const params = token ? `?token=${token}` : ``;

  const session = await getPageSession();
  if (session) {
    if (!session.user.emailVerified)
      redirect(`/auth/email-verification${params}`);

    if (token) {
      redirect(`/invitations/${token}`);
    }

    redirect("/app");
  }

  return (
    <>
      <Link
        href="/auth/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
        prefetch={false}
      >
        Sign Up
      </Link>
      <div className="grid">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to login
            </p>
          </div>
          <LoginForm callbackUrl={searchParams.callbackUrl} />
        </div>
      </div>
    </>
  );
}
