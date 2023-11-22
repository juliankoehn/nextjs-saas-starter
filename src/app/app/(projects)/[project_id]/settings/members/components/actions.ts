"use server";
import { getPageSession } from "#/lib/auth/lucia";
import { CP_PREFIX } from "#/lib/const";
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

export const changeRoleAction = async (
  memberId: string,
  projectId: string,
  role: MembershipRole
) => {
  const session = await getPageSession();

  if (!session) {
    return {
      status: "KO",
      message: "Unauthorized",
    };
  }

  const currentMembership = await db.membership.findUnique({
    where: {
      userId_projectId: {
        userId: session.user.userId,
        projectId,
      },
    },
    include: {
      project: {
        select: {
          members: true,
        },
      },
    },
  });

  if (!currentMembership) {
    return {
      status: "KO",
      message: "Unauthorized",
    };
  }

  const currentUserRole = currentMembership.role;

  const userIsAdmin =
    currentUserRole === MembershipRole.ADMIN ||
    currentUserRole === MembershipRole.OWNER;
  const userIsChangingOwnRole = memberId === currentMembership.id;

  const userCanChangeRole =
    userIsAdmin &&
    (role === MembershipRole.MEMBER ||
      role === MembershipRole.ADMIN ||
      role === MembershipRole.OWNER);

  if (!userCanChangeRole && !userIsChangingOwnRole) {
    console.log("why", userIsAdmin, userIsChangingOwnRole, userCanChangeRole);
    return {
      status: "KO",
      message: "Unauthorized",
    };
  }

  if (userIsChangingOwnRole && currentUserRole === MembershipRole.OWNER) {
    const ownersCount = currentMembership.project.members.filter(
      (member) => member.role === MembershipRole.OWNER
    ).length;

    if (ownersCount === 1) {
      return {
        status: "KO",
        message: "Cannot change role of last owner",
      };
    }
  }

  await db.membership.update({
    where: {
      id: memberId,
    },
    data: {
      role,
    },
  });

  revalidatePath(`${CP_PREFIX}/${projectId}`);
  return {
    status: "OK",
    message: "Role changed successfully",
  };
};
