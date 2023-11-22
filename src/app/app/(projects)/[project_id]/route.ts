import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

interface Props {
  params: {
    project_id: string;
  };
}

export async function GET(request: NextRequest, props: Props) {
  const { params } = props;

  redirect(`/app/${params.project_id}/entity`);
}
