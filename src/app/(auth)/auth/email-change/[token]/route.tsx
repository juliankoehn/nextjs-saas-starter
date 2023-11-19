import { auth } from "#/lib/auth/lucia";
import { validateEmailChangeToken } from "#/lib/auth/token";
import { db } from "#/lib/db";
import { NextRequest, NextResponse } from "next/server";

// User is redirected to this route after clicking on the link in the email.
// We know the user has access to the current email address because we sent the
// email to that address.
//
// 1FA? :-) We don't need to ask for the password again.
//
// We can just update the email address in the database.
//
// Same procedure as in the password reset flow
// we clear all sessions afterwards and redirect to the login page.
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

  if (!token) {
    // bad request
    return NextResponse.json(
      { error: "You have no token provided" },
      { status: 401 }
    );
  }

  console.log("token", token);

  try {
    const result = await validateEmailChangeToken(token);

    const user = await auth.getUser(result.userId);
    // sign out all sessions
    await auth.invalidateAllUserSessions(user.userId);
    // update the users account email
    await auth.updateUserAttributes(user.userId, {
      email: result.newEmail.toLowerCase(),
    });

    /**
     * We are using prisma directly instead of lucia
     * as lucia does not provide a API yet to update the key
     * it may come within v3 of lucia, so feel free to update this
     * once it is available
     */
    await db.$transaction(async (trx) => {
      await trx.key.update({
        where: {
          id: `email:${user.email.toLowerCase()}`,
        },
        data: {
          id: `email:${result.newEmail.toLowerCase()}`,
        },
      });
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/auth/login",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
};
