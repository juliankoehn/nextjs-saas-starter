import { Card, CardContent } from "#/components/ui/card";
import { CP_PREFIX } from "#/lib/const";
import { Project } from "@prisma/client";
import Link from "next/link";
import React from "react";

export interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const { project } = props;

  return (
    <Card className="relative box-border cursor-pointer overflow-visible hover:shadow-md">
      <div className="grid outline-none pointer-events-none">
        <Link
          href={`${CP_PREFIX}/${project.id}`}
          className="pointer-events-auto absolute inset-0"
        />
        <CardContent className="flex h-full p-6">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="block truncate max-w-full justify-self-start text-base font-semibold">
              {project.name}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
