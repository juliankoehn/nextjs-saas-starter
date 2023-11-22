import {
  githubAuthentication,
  isGithubOAuthEnabled,
} from "#/lib/auth/oauth_github";
import { BadRequestError } from "#/lib/error-code";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const requestUrl = new URL(request.nextUrl);
  const provider = requestUrl.searchParams.get("provider");

  switch (provider) {
    case "github": {
      if (isGithubOAuthEnabled()) {
        const [url, state] = await githubAuthentication.getAuthorizationUrl();

        cookies().set("oauth_state", state, {
          path: "/",
          maxAge: 60 * 60,
        });

        redirect(url.toString());
      }
    }
    default: {
      throw new BadRequestError("Invalid provider");
    }
  }
};
