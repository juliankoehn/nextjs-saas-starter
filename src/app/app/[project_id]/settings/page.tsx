import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";
import { getProject } from "#/lib/project/get-current-project";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import { DeleteForm } from "./delete-form";
import { GeneralForm } from "./general-form";

interface Props {
  params: {
    project_id: string;
  };
}

const SettingsPage: NextPage<Props> = async ({ params }) => {
  const project = await getProject(params.project_id);
  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Manage Settings for your Project</CardDescription>
        </CardHeader>
        <CardContent>
          <GeneralForm
            projectId={params.project_id}
            defaultValues={{
              name: project.name,
            }}
          />
        </CardContent>
      </Card>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Delete your Project</CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteForm projectId={parseInt(params.project_id)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
