import { getPageSession } from "../auth/lucia";
import { db } from "../db";

export const getProjectInvites = async (projectId: string) => {
  const session = await getPageSession();
  if (!session) {
    return null;
  }

  const invites = await db.projectInvitation.findMany({
    where: {
      project: {
        id: projectId,
      },
    },
  });

  return invites;
};

export type GetProjectInvitesReturn = Awaited<
  ReturnType<typeof getProjectInvites>
>;
