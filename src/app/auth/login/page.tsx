import { getPageSession } from "#/lib/auth/lucia";
import { redirect } from "next/navigation";
import { LoginForm } from "./form";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getPageSession();
  if (session) {
    if (!session.user.emailVerified) redirect("/auth/email-verification");
    redirect("/app");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <LoginForm callbackUrl={searchParams.callbackUrl as string} />
      </div>
    </div>
  );
}
