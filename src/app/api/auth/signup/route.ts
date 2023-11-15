import { auth } from "#/lib/auth/lucia";
import { generateEmailVerificationToken } from "#/lib/auth/token";
import { sendEmailVerificationLink } from "#/lib/emails";
import { validateUsername } from "#/lib/user/validateUsername";
import * as context from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const POST = async (request: NextRequest) => {
  const body = schema.parse(await request.json());

  const userValidation = await validateUsername(body.email.toLowerCase());
  if (!userValidation.isValid) {
    return NextResponse.json(
      {
        error: "Username or email is already taken",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "email",
        providerUserId: body.email.toLowerCase(),
        password: body.password,
      },
      attributes: {
        email: body.email.toLowerCase(),
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    const token = await generateEmailVerificationToken(user.userId);
    await sendEmailVerificationLink({
      code: token,
      language: "en", // @TODO i18next?
      user: {
        email: body.email.toLowerCase(),
      },
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/email-verification",
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: "An unexpected error occurred.",
      },
      {
        status: 500,
      }
    );
  }
};
