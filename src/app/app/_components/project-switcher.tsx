"use client";

import { Button } from "#/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "#/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { CP_PREFIX } from "#/lib/const";
import { cn } from "#/utils";
import { Project } from "@prisma/client";
import { CheckIcon, ChevronDown, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { startTransition, useMemo } from "react";

export interface ProjectSwitcherProps {
  activeProjectId?: string;
  projects: Project[];
}

export const ProjectSwitcher: React.FC<ProjectSwitcherProps> = (props) => {
  const { projects, activeProjectId } = props;

  const router = useRouter();
  const [isOpen, setOpen] = React.useState(false);

  const activeProject = useMemo(() => {
    return projects.find((project) => project.id === activeProjectId);
  }, [projects, activeProjectId]);

  const onProjectSelect = (project: Project) => {
    startTransition(() => {
      setOpen(false);
      router.push(`${CP_PREFIX}/${project.id}`);
    });
  };

  const onProjectCreate = () => {
    startTransition(() => {
      setOpen(false);
      router.push(`${CP_PREFIX}/project/new`);
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a Project"
          className={cn("w-52 justify-between truncate")}
        >
          {activeProject?.name ?? "No project selected"}
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 shrink-0 transition-transform",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search project..." />
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  className="text-sm cursor-pointer"
                  onSelect={() => onProjectSelect(project)}
                >
                  <p className="truncate">{project.name}</p>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      activeProject?.id === project.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="text-sm cursor-pointer"
                onSelect={onProjectCreate}
              >
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                Create Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
