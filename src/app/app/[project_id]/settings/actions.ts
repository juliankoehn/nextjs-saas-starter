"use server";
import { getPageSession } from "#/lib/auth/lucia";
import { db } from "#/lib/db";
import { MembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { GeneralFormSchema } from "./schema";

export const updateProject = async (
  projectId: number | string,
  data: GeneralFormSchema
) => {
  const id = typeof projectId === "string" ? parseInt(projectId) : projectId;

  const session = await getPageSession();
  if (!session)
    return {
      status: "KO",
      error: "You must be logged in to delete a project.",
    };

  await db.project.update({
    where: {
      id,
      members: {
        some: {
          userId: session.user.userId,
          accepted: true,
          role: {
            in: [MembershipRole.ADMIN, MembershipRole.OWNER],
          },
        },
      },
    },

    data: {
      name: data.name,
    },
  });

  revalidatePath(`/app`);

  return {
    status: "OK",
  };
};

export const deleteProject = async (id: number) => {
  const session = await getPageSession();
  if (!session)
    return {
      status: "KO",
      error: "You must be logged in to delete a project.",
    };

  await db.project.delete({
    where: {
      id,
      members: {
        some: {
          userId: session.user.userId,
          accepted: true,
          role: {
            in: [MembershipRole.ADMIN, MembershipRole.OWNER],
          },
        },
      },
    },
  });

  revalidatePath(`/app`);

  return {
    status: "OK",
  };
};
