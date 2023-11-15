import { WEBAPP_URL } from "../const";

export type EmailVerifyLink = {
  language: any; // @TODO i18next?
  user: {
    name?: string | null;
    email: string;
  };
  code: string;
};

export const sendEmailVerificationLink = async (
  verificationInput: EmailVerifyLink
) => {
  const url = `${WEBAPP_URL}/auth/email-verification/${verificationInput.code}`;
  console.log(`Your email verification link: ${url}`);
  // @TODO sendmail magic.
};
