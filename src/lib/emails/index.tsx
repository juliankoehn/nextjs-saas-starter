"use server";
import { renderAsync } from "@react-email/components";
import * as nodemailer from "nodemailer";
import { APP_NAME, WEBAPP_URL, __DEV__ } from "../const";
import { env } from "../env";
import { InternalServerError } from "../error-code";
import { EmailVerificationLinkEmail } from "./templates/email-verification-link";

type MailOptions = {
  /**
   * Optional from address. If not set here, it will be set from the env.
   * @example "julian.pro <hello@julian.pro>"
   * @default env.SMTP_DEFAULT_FROM
   */
  from?: string;
  /**
   * The email address to send the email to.
   */
  to: string;
  /**
   * The subject of the email.
   */
  subject: string;
  /**
   * HTML content of the email.
   */
  html: string;
};

const transporter = nodemailer.createTransport(
  {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE_ENABLED,
    auth: {
      user: env.SMTP_USERNAME,
      pass: env.SMTP_PASSWORD,
    },
  },
  {
    from: env.SMTP_DEFAULT_FROM,
  }
);

export const sendEmail = (options: MailOptions) => {
  return transporter.sendMail(options, (err, info) => {
    if (err) {
      console.error(`failed to send an email`, err);
    }
  });
};

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

export type SendPasswordResetLinkOptions = {
  to: string;
  token: string;
};

export const sendPasswordResetLink = async (
  opts: SendPasswordResetLinkOptions
) => {
  const subject = `Password Reset`;
  const url = `${WEBAPP_URL}/auth/password-reset/${opts.token}`;
  if (__DEV__) {
    console.log(`Your password reset link: ${url}`);
  }

  try {
    await sendEmail({
      to: opts.to,
      subject,
      html: await renderAsync(
        <EmailVerificationLinkEmail appName={APP_NAME} link={url} />
      ),
    });
  } catch (e) {
    throw new InternalServerError(
      "Could not render or send email notification"
    );
  }
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
