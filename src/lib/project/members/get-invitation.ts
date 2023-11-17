import { db } from "#/lib/db";

export const getInvitationByToken = async (token: string) => {
  return db.projectInvitation.findUnique({
    where: {
      token,
    },
    include: {
      project: true,
      invitedBy: true,
    },
  });
};
