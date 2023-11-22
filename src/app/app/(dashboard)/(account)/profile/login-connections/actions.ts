"use server";

import { auth } from "#/lib/auth/lucia";
import { revalidatePath } from "next/cache";

export const disconnectKey = async (providerId: string, userId: string) => {
  console.log("disconnectKey called", providerId, userId);
  await auth.deleteKey(providerId, userId);

  revalidatePath("/");
  return;
};
