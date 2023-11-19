"use server";
import { auth, getPageSession } from "#/lib/auth/lucia";
import { InternalServerError, UnauthorizedError } from "#/lib/error-code";

export const updateDisplayName = async (displayName: string) => {
  const session = await getPageSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  try {
    const user = await auth.updateUserAttributes(
      session.user.userId,
      {
        name: displayName,
      } // expects partial `Lucia.DatabaseUserAttributes`
    );

    return user;
  } catch {
    throw new InternalServerError("Something went wrong");
  }
};
