import { getPageSession } from "../auth/lucia";
import { db } from "../db";

export const getProjects = async () => {
  const session = await getPageSession();
  if (!session) return [];

  const projects = await db.project.findMany({
    where: {
      members: {
        some: {
          userId: session.user.userId,
        },
      },
    },
  });

  return projects ?? [];
};
