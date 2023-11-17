"use server";
import { getPageSession } from "#/lib/auth/lucia";
import { BadRequestError, UnauthorizedError } from "#/lib/error-code";

export const deleteInviteAction = async (inviteId: string, teamId: string) => {
  const session = await getPageSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  throw new BadRequestError("Not implemented");
};
