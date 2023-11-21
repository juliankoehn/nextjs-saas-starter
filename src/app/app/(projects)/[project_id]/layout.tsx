import { getPageSession } from "#/lib/auth/lucia";
import { hasProjectAccess } from "#/lib/project/project-authority";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { Topbar } from "../../_components/topbar";
import { ProjectSidebar } from "./_components/project-sidebar";

const ProjectLayout: NextPage<{
  children: React.ReactNode;
  params: {
    project_id: string;
  };
}> = async ({ children, params }) => {
  // authorization and authentication
  const session = await getPageSession();
  if (!session) {
    redirect("/auth/login");
  }

  if (!(await hasProjectAccess(session.user.userId, params.project_id))) {
    redirect("/app");
  }

  return (
    <>
      <Topbar activeProjectId={params.project_id} />
      <div className="flex flex-col flex-1 ps-16 pt-16">
        <ProjectSidebar projectId={params.project_id} />
        <main className="flex flex-col flex-1">{children}</main>
      </div>
    </>
  );
};

export default ProjectLayout;
