import { cn } from "#/utils/dom-utils";
import { NextPage } from "next";
import { ProjectGallery } from "./_components/project-list";

const ProjectList: NextPage = async () => {
  return (
    <div className={cn("flex max-w-7xl px-6 w-full mx-auto pt-6 pb-36 gap-6")}>
      <ProjectGallery />
    </div>
  );
};

export default ProjectList;
