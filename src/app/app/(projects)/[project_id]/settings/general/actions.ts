"use server";
import { getPageSession } from "#/lib/auth/lucia";
import { db } from "#/lib/db";
import { MembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { GeneralFormSchema } from "./schema";

export const updateProject = async (
  projectId: string,
  data: GeneralFormSchema
) => {
  const id = projectId;

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

export const deleteProject = async (id: string) => {
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
