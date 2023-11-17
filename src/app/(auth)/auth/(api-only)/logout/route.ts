import { auth } from "#/lib/auth/lucia";
import { revalidatePath } from "next/cache";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // get query params from request
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const authRequest = auth.handleRequest(request.method, context);

  // check if user is authenticated
  const session = await authRequest.validate();
  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // make sure to invalidate the current session!
  await auth.invalidateSession(session.sessionId);
  // delete session cookie
  authRequest.setSession(null);

  revalidatePath("/");

  redirect(`/auth/login${token ? `?token=${token}` : ""}`);
}
