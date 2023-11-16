import { getPageSession } from "../auth/lucia";
import { db } from "../db";

export const getProjectMembers = async (projectId: string | number) => {
  const id = typeof projectId === "string" ? parseInt(projectId) : projectId;

  const session = await getPageSession();
  if (!session) {
    return null;
  }

  const memberships = await db.membership.findMany({
    where: {
      project: {
        id,
      },
    },
    include: {
      user: true,
    },
  });

  return memberships;
};

export type GetProjectMemberResult = ReturnType<typeof getProjectMembers>;
