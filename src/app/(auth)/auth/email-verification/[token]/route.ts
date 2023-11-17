import { auth } from "#/lib/auth/lucia";
import { validateEmailVerificationToken } from "#/lib/auth/token";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  {
    params,
  }: {
    params: {
      token: string;
    };
  }
) => {
  const { token } = params;

  try {
    const userId = await validateEmailVerificationToken(token);
    const user = await auth.getUser(userId);
    await auth.invalidateAllUserSessions(user.userId);
    await auth.updateUserAttributes(user.userId, {
      emailVerified: new Date().toISOString(),
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const sessionCookie = auth.createSessionCookie(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/app",
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  } catch (e) {
    return new Response("Invalid email verification link", {
      status: 400,
    });
  }
};
