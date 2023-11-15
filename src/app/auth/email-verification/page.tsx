import { buttonVariants } from "#/components/ui/button";
import { getPageSession } from "#/lib/auth/lucia";
import { cn } from "#/utils/dom-utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ResendEmailVerificationForm } from "./resend-email-verification-form";

export default async function Index() {
  const session = await getPageSession();
  if (!session) redirect("/auth/login");
  if (session.user.emailVerified) redirect("/app");

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/auth/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login (@TODO Logout)
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 flex flex-col gap-8">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Email verification
          </h1>
          <p className="text-sm text-muted-foreground">
            Your email verification link was sent to your inbox (i.e. console).
          </p>
        </div>
        <ResendEmailVerificationForm />
      </div>
    </div>
  );
}
