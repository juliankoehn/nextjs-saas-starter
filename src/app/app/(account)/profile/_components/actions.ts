"use server";
import { auth, getPageSession } from "#/lib/auth/lucia";
import { generateEmailChangeToken } from "#/lib/auth/token";
import { sendEmailChangeLink } from "#/lib/emails";
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

export const updateEmail = async (email: string) => {
  const session = await getPageSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  try {
    const tkn = await generateEmailChangeToken(session.user.userId, email);
    await sendEmailChangeLink(tkn);
  } catch {
    throw new InternalServerError("Something went wrong");
  }
};
