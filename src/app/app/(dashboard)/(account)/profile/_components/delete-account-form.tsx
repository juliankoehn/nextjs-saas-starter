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
import { Button, buttonVariants } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { APP_NAME, CP_PREFIX } from "#/lib/const";
import { Project } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { deletePersonalAccount } from "./actions";

export interface DeleteAccountFormProps {
  projects: Project[];
}

export const DeleteAccountForm: React.FC<DeleteAccountFormProps> = (props) => {
  const { projects } = props;

  const router = useRouter();

  const onDeleteConfirm = async () => {
    await deletePersonalAccount();
    router.refresh();
  };

  return (
    <AlertDialog>
      <Card variant="destructive">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-normal leading-6">
            Permanently remove your Personal Account and all of its contents
            from the <strong>{APP_NAME}</strong> platform. This action is not
            reversible, so please continue with caution.
          </p>
        </CardContent>
        <CardFooter variant="destructive" className="py-3">
          <div className="flex items-center justify-end ml-auto">
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Personal Account</Button>
            </AlertDialogTrigger>
          </div>
        </CardFooter>
      </Card>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Personal Account</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              {projects.length > 0 ? (
                <div>
                  You have access to{" "}
                  <strong>{projects.length} Projects.</strong> You must leave or
                  delete them before you can delete your Personal Account.
                </div>
              ) : (
                <span>
                  Are you sure you want to delete your Personal Account? This
                  action is not reversible, so please continue with caution.
                </span>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {projects.length > 0 && (
          <div className="bg-muted border-t p-6 -mx-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="font-semibold text-sm truncate">
                    {project.name}
                  </div>
                  <Link
                    href={`${CP_PREFIX}/${project.id}/settings/general`}
                    className={buttonVariants({
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    Settings
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {projects.length > 0 ? null : (
            <AlertDialogAction onClick={onDeleteConfirm}>
              Confirm
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
