import { Sidebar } from "#/components/ui/sidebar";
import { CP_PREFIX } from "#/lib/const";
import { CogIcon, HomeIcon } from "lucide-react";

export interface ProjectSidebarProps {
  projectId: string;
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = (props) => {
  const { projectId } = props;
  return (
    <Sidebar
      links={[
        {
          href: `${CP_PREFIX}/${projectId}`,
          label: "Dashboard",
          icon: <HomeIcon />,
          exact: true,
        },
        {
          href: `${CP_PREFIX}/${projectId}/settings`,
          label: "Settings",
          icon: <CogIcon />,
        },
      ]}
    />
  );
};
