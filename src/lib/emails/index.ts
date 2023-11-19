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

export const sendPasswordResetLink = async (token: string) => {
  const url = `${WEBAPP_URL}/auth/password-reset/${token}`;
  console.log(`Your password reset link: ${url}`);

  // @TODO sendmail magic.
};

export const sendPasswordChangedEmail = async (email: string) => {
  const subject = `Password Changed`;
  console.log(`Your password has been changed for ${email}`);

  // @TODO sendmail magic.
};

export const sendEmailChangeLink = async (token: string) => {
  const subject = `Email Change Verification`;
  const url = `${WEBAPP_URL}/auth/email-change/${token}`;

  console.log(`Your email change link: ${url}`);
};
