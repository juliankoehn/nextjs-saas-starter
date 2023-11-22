import { buttonVariants } from "#/components/ui/button";
import { auth, getPageSession } from "#/lib/auth/lucia";
import { isGithubOAuthEnabled } from "#/lib/auth/oauth_github";
import { cn } from "#/utils";
import { Key } from "lucia";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OAuthActions } from "./oauth-actions";

const LoginConnections = async () => {
  const session = await getPageSession();
  if (!session) {
    redirect("/auth/login");
  }

  const keys = (await auth.getAllUserKeys(session.user.userId)) as Key[];

  const githubConnected = keys.find((k) => k.providerId === "github");

  return (
    <section className="grid gap-6">
      <div>
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Login Connections
        </h3>
        <p className={cn("text-sm text-muted-foreground mt-4")}>
          Connect your Personal Account with a third-party service to use it for
          login. One Login Connection can be added per third-party service.
        </p>
      </div>

      <ul className="rounded-lg border divide-y">
        {isGithubOAuthEnabled() && (
          <li className="flex items-center px-5 py-2">
            <div className="relative mr-2 flex shrink-0 items-center justify-center py-2 px-6 bg-[#333333] rounded-lg">
              <GithubIcon className="text-white h-6 w-6" />
            </div>
            <div className="mr-auto">
              <span className="font-medium text-base text-foreground">
                GitHub
              </span>
              <p className="text-sm text-muted-foreground">
                Sign in with GitHub
              </p>
            </div>
            <div>
              {githubConnected ? (
                <OAuthActions
                  providerName="GitHub"
                  authKey={keys.find((k) => k.providerId === "github")}
                />
              ) : (
                <Link
                  href="/auth/oauth?provider=github"
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Connect
                </Link>
              )}
            </div>
          </li>
        )}
      </ul>
    </section>
  );
};

export default LoginConnections;
