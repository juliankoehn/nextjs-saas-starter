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
import { toast } from "#/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { deleteProject } from "./actions";

export interface DeleteFormProps {
  projectId: number;
}

export const DeleteForm: React.FC<DeleteFormProps> = (props) => {
  const { projectId } = props;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onConfirm = async () => {
    setIsSubmitting(true);

    try {
      await deleteProject(projectId);
      toast({
        title: "Success",
        description: "Project deleted successfully.",
      });
      router.push("/app");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isSubmitting}
            onClick={onConfirm}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
