import { auth } from "#/lib/auth/lucia";
import { LuciaError } from "lucia";
import * as context from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const requestBody = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(255),
});

export const POST = async (request: NextRequest) => {
  const body = requestBody.parse((await request.json()) ?? {});

  try {
    const key = await auth.useKey(
      "email",
      body.email.toLowerCase(),
      body.password
    );

    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/app", // redirect to profile page
      },
    });
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      // user does not exist
      // or invalid password
      return NextResponse.json(
        {
          error: "Incorrect email or password",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
