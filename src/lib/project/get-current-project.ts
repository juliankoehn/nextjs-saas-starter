import { getPageSession } from "../auth/lucia";
import { db } from "../db";

export const getProject = async (projectId: string) => {
  const session = await getPageSession();
  if (!session) return null;

  const project = await db.project.findUnique({
    where: {
      id: projectId,
      members: {
        some: {
          userId: session.userId,
          accepted: true,
        },
      },
    },
  });

  if (!project) return null;

  return project;
};
