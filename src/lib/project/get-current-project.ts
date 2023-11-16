import { getPageSession } from "../auth/lucia";
import { db } from "../db";

export const getProject = async (projectId: number | string) => {
  const session = await getPageSession();
  if (!session) return null;

  const id = typeof projectId === "number" ? projectId : parseInt(projectId);

  const project = await db.project.findUnique({
    where: {
      id,
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
