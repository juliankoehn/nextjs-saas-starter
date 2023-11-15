"use server";

import { auth, getPageSession } from "#/lib/auth/lucia";
import { ProfileFormValues } from "./schema";

export const editProfile = async (data: ProfileFormValues) => {
  const session = await getPageSession();

  if (!session) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const user = await auth.updateUserAttributes(session.user.userId, {
      name: data.name,
    });

    return user;
  } catch (error: any) {
    console.log("error", error);
    return {
      error: error.message,
    };
  }
};
