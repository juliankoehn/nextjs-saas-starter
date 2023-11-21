import { cn } from "#/utils/dom-utils";
import { Project } from "@prisma/client";
import React from "react";
import { NewProjectButton } from "./new-project-button";
import { ProjectCard } from "./project-card";

export interface ProjectGalleryProps {
  projects: Project[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = (props) => {
  const { projects } = props;

  return (
    <div
      className={cn(
        "w-full grid gap-6",
        "grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
      )}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <NewProjectButton />
    </div>
  );
};
