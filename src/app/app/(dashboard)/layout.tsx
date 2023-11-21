import { getPageSession } from "#/lib/auth/lucia";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { Topbar } from "../_components/topbar";

const AppLayout: NextPage<{
  children: React.ReactNode;
}> = async ({ children }) => {
  const session = await getPageSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      <Topbar />
      <div className="flex flex-1 flex-col pt-16">{children}</div>
    </>
  );
};

export default AppLayout;
