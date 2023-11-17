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
import { deleteInvite } from "../../actions";

export interface MemberActionsProps {
  id: string;
  isAdmin: boolean;
}

export const InvitesActions: React.FC<MemberActionsProps> = (props) => {
  const { isAdmin, id } = props;

  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteInvite(id);
    setIsDeleting(false);
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
        {isAdmin ? (
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
                    handleDelete();
                  }}
                  isLoading={isDeleting}
                >
                  Delete Member
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </DialogItem>
        ) : (
          <DropdownMenuItem disabled variant="destructive">
            Remove teammate
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
