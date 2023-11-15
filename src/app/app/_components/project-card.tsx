import { cn } from '#/utils/dom-utils';
import Link from 'next/link';
import React from 'react';

export interface ProjectCardProps {
    name: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = (props) => {
    const { name } = props;

  return (
    <Link
      href="/app/project_id"
      className={cn(
        "transition-shadow relative grid auto-rows-max grid-flow-row shadow rounded-md",
        "group hover:shadow-lg"
      )}
    >
      <div
        className={cn(
          "grid px-5 pt-5 pb-6 rounded-t-md",
          "bg-gradient-to-t from-gray-950 to-gray-600"
        )}
      >
        <div className="grid items-center gap-3 grid-cols-[1fr_auto]">
          <div className="block truncate max-w-full justify-self-start text-lg text-white">
            {name}
          </div>
        </div>
      </div>

      <div className="grid py-3 px-5 bg-white rounded-b-md">actions</div>
    </Link>
  );
};