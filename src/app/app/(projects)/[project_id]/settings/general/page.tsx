import { Separator } from "#/components/ui/separator";
import { SubPageHeader } from "#/components/ui/subpage-header";
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
      <SubPageHeader
        title="Settings"
        description="Manage Settings for your Project"
      />
      <Separator />
      <GeneralForm
        projectId={params.project_id}
        defaultValues={{
          name: project.name,
        }}
      />

      <Separator />
      <div className="text-foreground text-base font-semibold">Danger Zone</div>
      <div>
        <DeleteForm projectId={params.project_id} />
      </div>
    </div>
  );
};

export default SettingsPage;
