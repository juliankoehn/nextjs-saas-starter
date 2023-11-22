import { Button } from "#/components/ui/button";
import { PageHeader } from "#/ui/page-header";
import { cn } from "#/utils/dom-utils";
import { NextPage } from "next";

interface Props {
  params: {
    project_id: string;
  };
}

const ProjectIndex: NextPage<Props> = (props) => {
  const { params } = props;

  return (
    <div
      className={cn("flex max-w-7xl w-full mx-auto pt-6 pb-36 gap-6 flex-col")}
    >
      <PageHeader>
        <Button>Create Metered Entity</Button>
      </PageHeader>
    </div>
  );
};

export default ProjectIndex;
