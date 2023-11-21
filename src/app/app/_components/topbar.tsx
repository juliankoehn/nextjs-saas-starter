import { Logo } from "#/components/ui/logo";
import { Separator } from "#/components/ui/separator";
import { getProjects } from "#/lib/project/get-projects";
import { cn } from "#/utils/dom-utils";
import Link from "next/link";
import { ProjectSwitcher } from "./project-switcher";
import UserNavSSR from "./user-nav-ssr";

export interface TopbarProps {
  activeProjectId?: string;
}

export const Topbar = async (props: TopbarProps) => {
  const { activeProjectId } = props;

  const projects = await getProjects();
  return (
    <div
      className={cn(
        "fixed top-0 left-0 flex gap-5 items-center px-6 z-20",
        "w-screen h-16 bg-background shadow z-10 justify-between"
      )}
    >
      <div className="grid items-center grid-flow-col gap-4">
        <Link href="/app">
          <Logo />
        </Link>
        <Separator orientation="vertical" />
        <ProjectSwitcher
          projects={projects}
          activeProjectId={activeProjectId}
        />
      </div>

      <div>
        <UserNavSSR />
      </div>
    </div>
  );
};
