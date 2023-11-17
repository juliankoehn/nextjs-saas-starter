import { db } from "#/lib/db";
import { generateId } from "#/lib/id-helper";
import { MembershipRole } from "@prisma/client";

/**
 * Creates a new project invitation.
 */
export const createInvitation = async (params: {
  projectId: string;
  invitedBy: string;
  email: string;
  role?: MembershipRole;
}) => {
  const { projectId, invitedBy, email, role } = params;
  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000); // 7 days

  return await db.projectInvitation.create({
    data: {
      projectId,
      email: email.toLowerCase(),
      role: role,
      expires,
      invitedById: invitedBy,
      token: generateId("inv"),
    },
  });
};

/**
 * Creates multiple project invitations in bulk.
 */
export const createManyInvitations = async (params: {
  projectId: string;
  invitedBy: string;
  emails: string[];
  role?: MembershipRole;
}) => {
  const { projectId, invitedBy, emails, role } = params;
  const expires = new Date(Date.now() + 7 * 24 * 3600 * 1000); // 7 days

  const pid = projectId;

  // generate tokens and email parings
  const pairs = emails.map((email) => ({
    email: email.toLowerCase(),
    token: generateId("inv"),
  }));

  const result = await db.projectInvitation.createMany({
    data: pairs.map((pair) => ({
      projectId: pid,
      email: pair.email,
      role: role,
      expires,
      invitedById: invitedBy,
      token: pair.token,
    })),
  });

  return {
    count: result.count,
    pairs,
  };
};
