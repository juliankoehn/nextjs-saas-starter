import { github } from "@lucia-auth/oauth/providers";
import { User } from "@prisma/client";
import * as context from "next/headers";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { CP_PREFIX } from "../const";
import { db } from "../db";
import { env } from "../env";
import { auth, getPageSession } from "./lucia";

export const githubAuthentication = github(auth, {
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
  scope: ["user:email"],
});

export const isGithubOAuthEnabled = () =>
  env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET;

export const githubOAuthCallback = async (request: NextRequest) => {
  const activeSession = await getPageSession();

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("oauth_state")?.value ?? null;

  // validate state
  if (storedState !== state || !code || !state) {
    return new Response(null, { status: 401 });
  }

  let currentUser: User | null = null;

  try {
    const { getExistingUser, githubUser, createUser, createKey, githubTokens } =
      await githubAuthentication.validateCallback(code);

    if (!githubUser.email) {
      const result: Array<{
        email: string;
        primary: boolean;
        verified: boolean;
        visibility: string;
      }> = await fetch(`https://api.github.com/user/emails`, {
        headers: {
          Authorization: `token ${githubTokens.accessToken}`,
        },
      }).then((res) => res.json());

      const email = result.find((email) => email.primary)?.email;

      if (!email) {
        return new Response(null, { status: 401 });
      }

      githubUser.email = email;
    }

    let existingUser = await getExistingUser();

    // no user associated with the github account
    if (!existingUser && githubUser.email) {
      currentUser = (await db.user.findFirst({
        where: {
          email: githubUser.email,
        },
      })) as User | null;

      if (currentUser) {
        await createKey(currentUser.id);
      }
    }

    const user =
      existingUser ??
      currentUser ??
      (await createUser({
        attributes: {
          email: githubUser.email,
          name: githubUser.name ?? githubUser.login,
          username: githubUser.login,
          emailVerified: new Date(),
        },
      }));

    const session = await auth.createSession({
      // @TODO type assert
      // @ts-ignore
      userId: (user.id as User) ?? user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);

    const location = activeSession
      ? `${CP_PREFIX}/profile/login-connections`
      : CP_PREFIX;

    return new Response(null, {
      status: 302,
      headers: {
        location,
      },
    });
  } catch (error) {
    console.error((error as any).message);
    return new Response(null, {
      status: 500,
    });
  }
};
