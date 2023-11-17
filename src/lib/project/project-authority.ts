import { MembershipRole } from "@prisma/client";
import { db } from "../db";
import { ForbiddenError, UnauthorizedError } from "../error-code";

export const hasProjectAccess = async (userId: string, projectId: string) => {
  const membership = await db.membership.findUnique({
    where: {
      userId_projectId: {
        projectId: projectId,
        userId: userId,
      },
      accepted: true,
    },
  });

  if (membership) {
    return true;
  }

  return false;
};

export const isAdminOrOwner = async (userId: string, projectId: string) => {
  const membership = await db.membership.findUnique({
    where: {
      userId_projectId: {
        projectId: projectId,
        userId: userId,
      },
      accepted: true,
    },
  });

  if (
    membership &&
    (membership.role === MembershipRole.ADMIN ||
      membership.role === MembershipRole.OWNER)
  ) {
    return true;
  }

  return false;
};

export const hasProjectAuthority = async (
  userId: string,
  projectId: string
) => {
  const hasAccess = await hasProjectAccess(userId, projectId);
  if (!hasAccess) {
    throw new UnauthorizedError();
  }

  const isAdminOrOwnerAccess = await isAdminOrOwner(userId, projectId);
  if (!isAdminOrOwnerAccess) {
    throw new ForbiddenError("You are not the admin or owner of this team");
  }

  return true;
};
