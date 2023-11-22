"use client";
import { Button } from "#/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "#/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { toast } from "#/components/ui/use-toast";
import { cn } from "#/utils";
import { MembershipRole } from "@prisma/client";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { changeRoleAction } from "../actions";

export interface RolePopoverProps {
  isOwner: boolean;
  isAdmin: boolean;
  projectId: string;
  memberId: string;
  role: string;
}

export const RolePopover: React.FC<RolePopoverProps> = (props) => {
  const { role, memberId, isOwner, isAdmin, projectId } = props;

  const [isOpen, setOpen] = React.useState(false);

  const handleUpdateRole = async (role: MembershipRole) => {
    try {
      const result = await changeRoleAction(memberId, projectId, role);
      const { status, message } = result;

      if (status === "KO") {
        return toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }

      toast({
        title: "Success",
        description: "Role updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change role",
        variant: "destructive",
      });
    }
  };

  const renderCommandItem = (
    label: string,
    description: string,
    selectedRole: MembershipRole
  ) => {
    const canChangeRole = isOwner || isAdmin;

    return (
      <CommandItem
        onSelect={() => handleUpdateRole(selectedRole)}
        className={`cursor-pointer flex flex-col items-start gap-y-1 px-4 py-2 ${
          !canChangeRole &&
          "aria-disabled:cursor-not-allowed aria-disabled:opacity-40"
        }`}
      >
        <p>{label}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CommandItem>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a role"
          className={cn("w-52 justify-between truncate")}
          disabled={!isOwner && !isAdmin}
        >
          <span className="capitalize">{role}</span>
          <ChevronDownIcon
            className={cn(
              "ml-auto h-4 w-4 shrink-0 transition-transform",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <Command>
          <CommandList className="max-h-full">
            <CommandGroup>
              {renderCommandItem(
                "Member",
                "Can work on the project",
                MembershipRole.MEMBER
              )}
              {renderCommandItem(
                "Admin",
                "Can manage the project and its members",
                MembershipRole.ADMIN
              )}
              {isOwner &&
                renderCommandItem(
                  "Owner",
                  "Can manage, transfer, and delete the project",
                  MembershipRole.OWNER
                )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
