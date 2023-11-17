import { Sidebar } from "#/components/ui/sidebar";
import { CP_PREFIX } from "#/lib/const";
import { getProject } from "#/lib/project/get-current-project";
import { CogIcon, HomeIcon } from "lucide-react";
import { NextPage } from "next";
import { notFound } from "next/navigation";

const ProjectLayout: NextPage<{
  children: React.ReactNode;
  params: {
    project_id: string;
  };
}> = async ({ children, params }) => {
  // get project and ensure access..
  const project = await getProject(params.project_id);
  if (!project) {
    notFound();
  }

  return (
    <div className="transition-all block ps-16">
      <Sidebar
        links={[
          {
            href: `${CP_PREFIX}/${params.project_id}`,
            label: "Dashboard",
            icon: <HomeIcon />,
            exact: true,
          },
          {
            href: `${CP_PREFIX}/${params.project_id}/settings`,
            label: "Settings",
            icon: <CogIcon />,
          },
        ]}
      />
      <div>{children}</div>
    </div>
  );
};

export default ProjectLayout;
