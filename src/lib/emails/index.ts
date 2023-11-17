import { APP_NAME, WEBAPP_URL } from "../const";

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

export const sendProjectInviteEmail = async (
  projectName: string,
  token: string,
  email: string
) => {
  const subject = `You've been invited to join ${projectName} on ${APP_NAME}`;
  const url = `${WEBAPP_URL}/invitations/${token}`;
  console.log(`Your project invite link ${email}: ${url}`);

  // @TODO sendmail magic.
};
