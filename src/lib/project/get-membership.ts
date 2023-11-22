import { db } from "../db";

export const getMembershipByUserIdProjectId = async (
  userId: string,
  projectId: string
) => {
  return db.membership.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
  });
};

export const getMembershipByMemberIdProjectId = async (
  memberId: string,
  projectId: string
) => {
  return db.membership.findUnique({
    where: {
      id: memberId,
      projectId,
    },
  });
};
