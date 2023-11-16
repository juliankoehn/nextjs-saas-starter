import { getPageSession } from "#/lib/auth/lucia";
import { db } from "#/lib/db";
import { cn } from "#/utils/dom-utils";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { ProjectGallery } from "./_components/project-list";

const ProjectList: NextPage = async () => {
  const session = await getPageSession();
  if (!session) {
    redirect("/auth/login");
  }

  const projects = await db.project.findMany({
    where: {
      members: {
        some: {
          userId: session.user.userId,
        },
      },
    },
  });

  return (
    <div className={cn("flex max-w-7xl px-6 w-full mx-auto pt-6 pb-36 gap-6")}>
      <ProjectGallery projects={projects} />
    </div>
  );
};

export default ProjectList;
