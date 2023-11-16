"use server";
import { getPageSession } from "#/lib/auth/lucia";
import {
  CP_PREFIX,
  TIER_FREE_PLAN_ID,
  TIER_USERS_FEATURE_ID,
} from "#/lib/const";
import { db } from "#/lib/db";
import { tier } from "#/lib/tier";
import { MembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { OrgInfo } from "tier";
import { NewProjectFormValues } from "./schema";

export const createProject = async (data: NewProjectFormValues) => {
  "use server";

  const session = await getPageSession();
  if (!session) {
    return {
      error: "You must be logged in to create a project",
      data: null,
    };
  }

  const project = await db.project.create({
    data: {
      name: data.name,
      members: {
        create: {
          userId: session.user.userId,
          role: MembershipRole.OWNER,
          accepted: true,
        },
      },
    },
  });

  try {
    const c = await tier.lookupOrg(`org:${project.id}`);
    console.log("Checking if user/org already exists in Tier");
    console.log(c);
  } catch (error) {
    // Auto subscribe user to the free plan if they do not have any subscription already.
    // Add OrgInfo to create/update the customer profile while subscribing
    await tier.subscribe(`org:${project.id}`, TIER_FREE_PLAN_ID, {
      info: {
        name: `Project: ${project.name} - ${project.id}`,
        email: session?.user?.email as string,
        description: "",
        phone: "",
        metadata: {
          projectId: project.id.toString(),
        },
      } as OrgInfo,
    });
  }

  // increase user seats by 1
  await tier.report(`org:${project.id}`, TIER_USERS_FEATURE_ID, 1);

  revalidatePath(CP_PREFIX);

  return {
    data: project,
  };
};
