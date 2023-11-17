"use client";

import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { Button } from "#/components/ui/button";
import { Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export const ResendEmailVerificationForm: React.FC = () => {
  const router = useRouter();
  const [resend, setResend] = React.useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/auth/email-verification", {
      method: "POST",
      redirect: "manual",
    });

    if (response.status === 0) {
      // redirected
      // when using `redirect: "manual"`, response status 0 is returned
      return router.refresh();
    }

    setResend(true);
  };

  return resend ? (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        We&apos;ve sent you an email with a link to verify your account.
      </AlertDescription>
    </Alert>
  ) : (
    <form className="grid gap-6 mt-8" onSubmit={onSubmit}>
      <div className="flex items-center justify-center">
        <Button type="submit">Resend email verification</Button>
      </div>
    </form>
  );
};
