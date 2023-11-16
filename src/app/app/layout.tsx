import { Toaster } from "#/components/ui/toaster";
import { getPageSession } from "#/lib/auth/lucia";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { Topbar } from "./_components/topbar";
import Providers from "./providers";

const AppLayout: NextPage<{
  children: React.ReactNode;
}> = async ({ children }) => {
  const session = await getPageSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      <Providers />
      <Topbar />
      <div className="block pt-16">{children}</div>
      <Toaster />
    </>
  );
};

export default AppLayout;
