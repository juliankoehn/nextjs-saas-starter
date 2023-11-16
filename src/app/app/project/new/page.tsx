"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { NewProjectForm } from "./new-project-form";

const ProjectNewPage = () => {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <Card>
        <CardHeader>
          <CardTitle>New Project</CardTitle>
          <CardDescription>Create a new project.</CardDescription>
        </CardHeader>
        <CardContent>
          <NewProjectForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectNewPage;
