import { cn } from "#/utils/dom-utils";
import React from "react";
import { ProjectCard } from './project-card';

/**
 * 
 * @returns .project-gallery {

    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fill,minmax(20rem,1fr));
    grid-gap: 1.25rem;
}
 */

export const ProjectGallery: React.FC = () => {
  return (
    <div className={cn("w-full grid auto-rows-[1fr] gap-6", 
    "grid-cols-[repeat(auto-fill,minmax(20rem,_1fr))]")}>
      <ProjectCard name="MCH Short" />
      <ProjectCard name="julian.pro" />
      <ProjectCard name="missuellen.de" />
      <ProjectCard name="bestmed" />
      <ProjectCard name="Signageful" />
    </div>
  );
};
