import { getPageSession } from "#/lib/auth/lucia";
import { CP_PREFIX } from "#/lib/const";
import { acceptInvitationByToken } from "#/lib/project/members/accept-invitation";
import { getInvitationByToken } from "#/lib/project/members/get-invitation";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { token: string } }
) => {
  const token = params.token;
  const urlParams = token ? `?token=${token}` : ``;

  const [session, invitation] = await Promise.all([
    getPageSession(),
    getInvitationByToken(params.token),
  ]);

  if (!session) {
    redirect(`/auth/login${urlParams}`);
  }

  if (!invitation) {
    notFound();
  }

  // on mismatch we redirect back to the invitation page, as we are dealing
  // the error handling there
  if (session.user.email !== invitation.email) {
    redirect(`/auth/invitations/${params.token}`);
  }

  // let's accept the invitation and redirect to the project page
  try {
    await acceptInvitationByToken(session.user.userId, params.token);
  } catch {
    redirect(`/auth/invitations/${params.token}`);
  }

  redirect(`${CP_PREFIX}/${invitation.projectId}`);
};
