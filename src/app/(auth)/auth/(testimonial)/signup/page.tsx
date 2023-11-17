import { buttonVariants } from "#/components/ui/button";
import { getPageSession } from "#/lib/auth/lucia";
import { cn } from "#/utils/dom-utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignupForm } from "./form";

export default async function Signup({
  searchParams,
}: {
  searchParams: {
    token?: string;
    callbackUrl?: string;
  };
}) {
  const token = searchParams?.token;
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
        href="/auth/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="grid">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <SignupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking &quot;Sign up&quot;, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
