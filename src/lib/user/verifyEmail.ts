import { randomBytes } from "crypto";
import { WEBAPP_URL } from "../const";
import { db } from "../db";
import { sendEmailVerificationLink } from "../emails";

interface VerifyEmailType {
  username?: string;
  email: string;
  language?: string;
}

export const sendEmailVerification = async ({
  email,
  language,
  username,
}: VerifyEmailType) => {
  const token = randomBytes(32).toString("hex");

  await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: new Date(Date.now() + 24 * 3600 * 1000),
    },
  });

  const params = new URLSearchParams({
    token,
  });

  await sendEmailVerificationLink({
    language: "en",
    verificationEmailLink: `${WEBAPP_URL}/auth/verify-email?${params.toString()}`,
    user: {
      email,
      name: username,
    },
  });

  return { ok: true, skipped: false };
};
