"use server";

import { getPageSession } from "#/lib/auth/lucia";
import { TIER_USERS_FEATURE_ID } from "#/lib/const";
import { db } from "#/lib/db";
import { sendProjectInviteEmail } from "#/lib/emails";
import { getProject } from "#/lib/project/get-current-project";
import { createManyInvitations } from "#/lib/project/members/create-invitation";
import { hasProjectAuthority } from "#/lib/project/project-authority";
import { tier } from "#/lib/tier";
import { MembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface InviteMembersInput {
  emails: string[];
  role: MembershipRole;
}

export const inviteMembers = async (
  projectId: string,
  data: InviteMembersInput
) => {
  const pid = projectId;

  const session = await getPageSession();
  if (!session) {
    return {
      status: "KO",
      message: "You must be logged in to invite members",
    };
  }

  const project = await getProject(pid);
  if (!project) {
    return {
      status: "KO",
      message: "Project not found",
    };
  }

  if (!(await hasProjectAuthority(session.user.userId, project.id))) {
    return {
      status: "KO",
      message: "You must be an admin to invite members",
    };
  }

  const emailsToInvite = data.emails.map((email) => email.toLowerCase());

  // loop over all users and check if they are already in the project
  const usersInProject = await db.project.findMany({
    where: {
      id: pid,
      OR: [
        {
          members: {
            some: {
              user: {
                email: {
                  in: emailsToInvite,
                },
              },
            },
          },
        },
        {
          invitations: {
            some: {
              email: {
                in: emailsToInvite,
              },
            },
          },
        },
      ],
    },
    select: {
      members: {
        select: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      invitations: {
        select: {
          email: true,
        },
      },
    },
  });

  // filter out users that are already in the project
  const emailsToInviteFiltered = emailsToInvite.filter((email) => {
    return !usersInProject.some((u) => {
      return (
        u.members.some((m) => m.user.email === email) ||
        u.invitations.some((i) => i.email === email)
      );
    });
  });

  const total = emailsToInvite.length;
  // check if we can invite anyone tier.limit
  const limit = await tier.lookupLimit(
    `org:${projectId}`,
    TIER_USERS_FEATURE_ID
  );
  const free = limit.limit - limit.used;

  if (total > free) {
    return {
      status: "KO",
      message: `You can only invite ${free} more members`,
    };
  }

  // Send invites
  let invitedCount = 0;
  try {
    const result = await createManyInvitations({
      projectId: pid,
      invitedBy: session.user.userId,
      emails: emailsToInviteFiltered,
      role: data.role,
    });

    invitedCount = result.count;

    for (const pair of result.pairs) {
      await sendProjectInviteEmail(project.name, pair.token, pair.email);
    }
  } catch (error) {
    return {
      status: "KO",
      message: "Error inviting members",
    };
  }

  try {
    await tier.report(`org:${projectId}`, TIER_USERS_FEATURE_ID, invitedCount);
  } catch {
    // delete invites if we can't report to tier
    await db.projectInvitation.deleteMany({
      where: {
        projectId: pid,
        email: {
          in: emailsToInviteFiltered,
        },
      },
    });
  }

  revalidatePath("/");
  return {
    status: "OK",
    message: `${invitedCount} users invited successfully`,
  };
};

export const deleteInvite = async (id: string) => {
  const session = await getPageSession();
  if (!session) {
    return {
      status: "KO",
      message: "You must be logged in to delete invitations",
    };
  }

  await db.projectInvitation.delete({
    where: {
      id,
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
