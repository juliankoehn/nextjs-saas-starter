"use server";

import { auth } from "#/lib/auth/lucia";
import { validatePasswordResetToken } from "#/lib/auth/token";
import { sendPasswordChangedEmail } from "#/lib/emails";
import { BadRequestError } from "#/lib/error-code";
import { cookies } from "next/headers";

export const resetPaswordAction = async (token: string, password: string) => {
  try {
    const userId = await validatePasswordResetToken(token);

    let user = await auth.getUser(userId);
    await auth.invalidateAllUserSessions(user.userId);
    await auth.updateKeyPassword("email", user.email, password);

    if (!user.emailVerified) {
      // if the user has not verified their email address yet, we do it here
      // as they have access to their email account and can verify it
      user = await auth.updateUserAttributes(user.userId, {
        emailVerified: new Date(),
      });
    }

    // create a new session for the user
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const sessionCookie = auth.createSessionCookie(session);

    cookies().set(sessionCookie);

    await sendPasswordChangedEmail(user.email);

    return;
  } catch {
    throw new BadRequestError("Invalid or expired password reset link");
  }
};
