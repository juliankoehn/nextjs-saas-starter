import { cn } from "#/utils/dom-utils";
import { Project } from "@prisma/client";
import React from "react";
import { NewProjectButton } from "./new-project-button";
import { ProjectCard } from "./project-card";

/**
 * 
 * @returns .project-gallery {

    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fill,minmax(20rem,1fr));
    grid-gap: 1.25rem;
}
 */

export interface ProjectGalleryProps {
  projects: Project[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = (props) => {
  const { projects } = props;

  return (
    <div
      className={cn(
        "w-full grid auto-rows-[1fr] gap-6",
        "grid-cols-[repeat(auto-fill,minmax(20rem,_1fr))]"
      )}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <NewProjectButton />
    </div>
  );
};
