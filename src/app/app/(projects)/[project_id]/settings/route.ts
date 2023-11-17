import { CP_PREFIX } from "#/lib/const";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

interface Props {
  params: {
    project_id: string;
  };
}

export async function GET(request: NextRequest, props: Props) {
  const { params } = props;

  redirect(`${CP_PREFIX}/${params.project_id}/settings/general`);
}
