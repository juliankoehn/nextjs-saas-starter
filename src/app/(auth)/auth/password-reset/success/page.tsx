import { buttonVariants } from "#/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-row items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Password reset successfully requested
          </h1>
          <p className="text-sm text-muted-foreground">
            Check your email for instructions on how to reset your password.
          </p>
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive an email? Check your spam folder or{" "}
            <Link href="/auth/password-reset" className="font-semibold">
              Try again
            </Link>
          </p>
        </div>
        <Link href="/auth/login" className={buttonVariants()}>
          Go back to login
        </Link>
      </div>
    </div>
  );
}
