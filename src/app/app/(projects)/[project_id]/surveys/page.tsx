import { Button } from "#/ui/button";
import { PageHeader } from "#/ui/page-header";
import { SecondaryNav } from "#/ui/secondary-nav";
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
      className={cn("flex max-w-8xl w-full mx-auto pt-6 pb-36 gap-6 flex-col")}
    >
      <PageHeader
        left={
          <SecondaryNav
            links={[
              { href: `/app/${params.project_id}/surveys`, label: "Surveys" },
            ]}
          />
        }
      >
        <Button>Neue Umfrage</Button>
      </PageHeader>
    </div>
  );
};

export default ProjectIndex;
