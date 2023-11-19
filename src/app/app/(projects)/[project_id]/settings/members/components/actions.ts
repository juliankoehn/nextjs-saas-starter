"use server";
import { getPageSession } from "#/lib/auth/lucia";
import { db } from "#/lib/db";
import { UnauthorizedError } from "#/lib/error-code";
import { MembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteInviteAction = async (inviteId: string) => {
  const session = await getPageSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  await db.projectInvitation.delete({
    where: {
      id: inviteId,
      project: {
        members: {
          some: {
            userId: session.user.userId,
            role: {
              in: [MembershipRole.ADMIN, MembershipRole.OWNER],
            },
          },
        },
      },
    },
  });

  revalidatePath("/");
  return {
    status: "OK",
    message: "Invitation deleted successfully",
  };
};

export const deleteMemberAction = async (memberId: string) => {
  const session = await getPageSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  await db.membership.delete({
    where: {
      id: memberId,
      project: {
        members: {
          some: {
            userId: session.user.userId,
            role: {
              in: [MembershipRole.ADMIN, MembershipRole.OWNER],
            },
          },
        },
      },
    },
  });

  revalidatePath("/");
  return {
    status: "OK",
    message: "Member deleted successfully",
  };
};
