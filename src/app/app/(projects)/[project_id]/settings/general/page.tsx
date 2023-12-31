import { Separator } from "#/components/ui/separator";
import { getProject } from "#/lib/project/get-current-project";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import { DeleteForm } from "./components/delete-form";
import { GeneralForm } from "./components/general-form";

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
      <GeneralForm
        projectId={params.project_id}
        defaultValues={{
          name: project.name,
        }}
      />

      <Separator />
      <DeleteForm projectId={params.project_id} />
    </div>
  );
};

export default SettingsPage;
