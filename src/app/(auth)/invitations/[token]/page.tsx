import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { buttonVariants } from "#/components/ui/button";
import { getPageSession } from "#/lib/auth/lucia";
import { getInvitationByToken } from "#/lib/project/members/get-invitation";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    token: string;
  };
};

const AcceptInvitation = async ({ params }: Props) => {
  const [session, invitation] = await Promise.all([
    getPageSession(),
    getInvitationByToken(params.token),
  ]);

  if (!invitation) {
    notFound();
  }

  const acceptMembership = () => {
    console.log("accept membership");
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Accept Invitation
        </h1>
        <p className="text-sm text-muted-foreground">
          You have been invited to join the Project{" "}
          <strong>{invitation.project.name}</strong> by{" "}
          <strong>
            {invitation.invitedBy.name ?? invitation.invitedBy.email}
          </strong>
        </p>
      </div>
      {!session && (
        <>
          <h3>Invite Create Account</h3>
          <Link
            href={`/auth/signup?token=${invitation.token}`}
            prefetch={false}
          >
            Create Account
          </Link>
          or
          <Link href={`/auth/login?token=${invitation.token}`} prefetch={false}>
            Login
          </Link>
        </>
      )}
      {/* User authenticated and email matches */}
      {session && session.user.email === invitation.email && (
        <>
          <Link
            prefetch={false}
            href={`/invitations/${invitation.token}/accept`}
            className={buttonVariants()}
          >
            Accept
          </Link>
        </>
      )}
      {/* User authenticated and email does not match */}
      {session && session.user.email !== invitation.email && (
        <Alert>
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle className="mb-4">
            This invitation is not for your account.
          </AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>
              {`Your email address ${session.user.email} does not match the email address this invitation was sent to.`}
            </p>
            <p>
              To accept this invitation, you will need to sign out and then sign
              in or create a new account using the same email address used in
              the invitation.
            </p>
            <Link
              href={`/auth/logout?token=${invitation.token}`}
              className={buttonVariants()}
              prefetch={false}
            >
              Sign out
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AcceptInvitation;
