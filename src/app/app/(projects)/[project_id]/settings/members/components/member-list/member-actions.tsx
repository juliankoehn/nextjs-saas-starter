"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "#/components/ui/alert-dialog";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemProps,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { MoreVerticalIcon, UserMinusIcon } from "lucide-react";
import React, { forwardRef } from "react";
import { deleteMemberAction } from "../actions";

export interface MemberActionsProps {
  id: string;
  isAdmin: boolean;
  isCurrentUser: boolean;
}

export const MemberActions: React.FC<MemberActionsProps> = (props) => {
  const { id, isAdmin, isCurrentUser } = props;

  const [isRemovingMember, setIsRemovingMember] = React.useState(false);

  const handleRemoveMember = async () => {
    setIsRemovingMember(true);

    try {
      await deleteMemberAction(id);
    } finally {
      setIsRemovingMember(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {isCurrentUser && (
          <DialogItem
            triggerChildren="Leave Project"
            itemProps={{
              variant: "destructive",
              className: "hover:cursor-pointer",
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveMember();
                  }}
                  isLoading={isRemovingMember}
                >
                  Delete Member
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </DialogItem>
        )}
        {isAdmin && !isCurrentUser ? (
          <DialogItem
            itemProps={{
              variant: "destructive",
              className: "hover:cursor-pointer",
            }}
            triggerChildren={
              <>
                <UserMinusIcon className="h-4 w-4 me-2" />
                <span>Remove teammate</span>
              </>
            }
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveMember();
                  }}
                  isLoading={isRemovingMember}
                >
                  Delete Member
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </DialogItem>
        ) : (
          <DropdownMenuItem disabled variant="destructive">
            <UserMinusIcon className="h-4 w-4 me-2" />
            <span>Remove teammate</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface DialogItemProps {
  triggerChildren: React.ReactNode;
  itemProps?: DropdownMenuItemProps;
  children: React.ReactNode;
}

const DialogItem = forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  DialogItemProps
>((props, ref) => {
  const { triggerChildren, itemProps, children } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          ref={ref}
          onSelect={(e) => {
            e.preventDefault();
            itemProps?.onSelect?.(e);
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>{children}</AlertDialogContent>
    </AlertDialog>
  );
});

DialogItem.displayName = "DialogItem";
