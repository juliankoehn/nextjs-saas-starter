import { githubOAuthCallback } from "#/lib/auth/oauth_github";
import { BadRequestError } from "#/lib/error-code";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      provider: string;
    };
  }
) => {
  switch (params.provider) {
    case "github": {
      return githubOAuthCallback(request);
    }
    default: {
      throw new BadRequestError("Invalid provider");
    }
  }
};
