import { db } from "../db";

export const validateUsername = async (email: string) => {
  const existingUser = await db.user.findFirst({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });

  return { isValid: !existingUser, email: existingUser?.email };
};
