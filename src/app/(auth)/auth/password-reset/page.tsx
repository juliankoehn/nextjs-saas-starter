import { PasswordResetForm } from "./password-reset-form";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-row items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to reset your password
          </p>
        </div>
        <div>
          <PasswordResetForm />
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Go back to{" "}
          <a
            href="/auth/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
