import { buttonVariants } from "#/components/ui/button";
import { Logo } from "#/components/ui/logo";
import Link from "next/link";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="hidden items-center space-x-2 md:flex">
              <Logo />
            </Link>
          </div>
          <nav>
            <Link
              href="/auth/login"
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
              })}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Logo />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by{" "}
              <a
                href={"https://julian.pro"}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Julian K&ouml;hn
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/juliankoehn/nextjs-saas-starter/"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
