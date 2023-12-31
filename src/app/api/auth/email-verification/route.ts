import { getPageSession } from "#/lib/auth/lucia";
import { generateEmailVerificationToken } from "#/lib/auth/token";
import { sendEmailVerificationLink } from "#/lib/emails";
import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await getPageSession();
  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  if (session.user.emailVerified) {
    return new Response(
      JSON.stringify({
        error: "Email already verified",
      }),
      {
        status: 422,
      }
    );
  }
  try {
    const token = await generateEmailVerificationToken(session.user.userId);
    await sendEmailVerificationLink({
      language: "en",
      code: token,
      user: {
        email: session.user.email,
        name: session.user.username,
      },
    });
    return new Response();
  } catch {
    return new Response(
      JSON.stringify({
        error: "An unknown error occurred",
      }),
      {
        status: 500,
      }
    );
  }
};
