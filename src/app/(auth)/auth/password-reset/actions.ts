"use server";
import { generatePasswordResetToken } from "#/lib/auth/token";
import { db } from "#/lib/db";
import { sendPasswordResetLink } from "#/lib/emails";
import { InternalServerError } from "#/lib/error-code";
import { delay } from "#/lib/security";

export const doPasswordReset = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return delay();
    }

    const token = await generatePasswordResetToken(user.id);
    await sendPasswordResetLink(token);

    return delay();
  } catch (e) {
    throw new InternalServerError("Something went wrong");
  }
};
