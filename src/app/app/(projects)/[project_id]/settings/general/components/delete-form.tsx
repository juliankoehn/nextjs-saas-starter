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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { toast } from "#/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { deleteProject } from "../actions";

export interface DeleteFormProps {
  projectId: string;
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
      <Card variant="destructive">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            You can delete your project at any time. This will permanently
            delete your project and <strong>all related data</strong>.
          </p>
        </CardContent>

        <CardFooter variant="destructive" className="py-3">
          <div className="flex items-center justify-end ml-auto">
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete Project</Button>
            </AlertDialogTrigger>
          </div>
        </CardFooter>
      </Card>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove the related data from our servers.
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
