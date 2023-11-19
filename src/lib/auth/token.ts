import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { db } from "../db";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
  const storedUserTokens = await db.verificationCode.findMany({
    where: {
      user_id: userId,
    },
  });

  if (storedUserTokens.length > 0) {
    const reuseableToken = storedUserTokens.find((token) => {
      return isWithinExpiration(
        Number(token.expires.getTime()) - EXPIRES_IN / 2
      );
    });
    if (reuseableToken) {
      return reuseableToken.code;
    }
  }

  // delete existing tokens
  await db.verificationCode.deleteMany({
    where: {
      user_id: userId,
    },
  });

  const token = generateRandomString(63);
  const result = await db.verificationCode.create({
    data: {
      id: token,
      user_id: userId,
      code: generateRandomString(8),
      expires: new Date(Date.now() + EXPIRES_IN),
    },
  });

  return result.code;
};

export const validateEmailVerificationToken = async (token: string) => {
  const storedToken = await db.$transaction(async (tx) => {
    const storedToken = await tx.verificationCode.findFirst({
      where: {
        code: token,
      },
    });

    if (!storedToken) {
      throw new Error("Invalid token");
    }

    await tx.verificationCode.delete({
      where: {
        id: storedToken.id,
      },
    });

    return storedToken;
  });

  const tokenExpires = storedToken.expires.getTime();
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Token expired");
  }

  return storedToken.user_id;
};

const PASSWORD_RESET_EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generatePasswordResetToken = async (userId: string) => {
  const storedUserTokens = await db.passwordResetToken.findMany({
    where: {
      user_id: userId,
    },
  });

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 1 hour
      // and reuse the token if true
      return isWithinExpiration(
        Number(token.expires) - PASSWORD_RESET_EXPIRES_IN / 2
      );
    });
    if (reusableStoredToken) return reusableStoredToken.id;
  }

  const token = generateRandomString(63);
  await db.passwordResetToken.create({
    data: {
      id: token,
      user_id: userId,
      expires: new Date().getTime() + EXPIRES_IN,
    },
  });

  return token;
};

export const validatePasswordResetToken = async (token: string) => {
  const storedToken = await db.$transaction(async (tx) => {
    const storedToken = await tx.passwordResetToken.findUnique({
      where: {
        id: token,
      },
    });

    if (!storedToken) throw new Error("Invalid token");
    await tx.passwordResetToken.delete({
      where: {
        id: storedToken.id,
      },
    });

    return storedToken;
  });

  const tokenExpires = Number(storedToken.expires); // bigint => number conversion
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Expired token");
  }
  return storedToken.user_id;
};

export const generateEmailChangeToken = async (
  userId: string,
  email: string
) => {
  const storedUserTokens = await db.emailChangeToken.findMany({
    where: {
      user_id: userId,
    },
  });

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 1 hour
      // and reuse the token if true
      return isWithinExpiration(
        Number(token.expires) - PASSWORD_RESET_EXPIRES_IN / 2
      );
    });
    if (reusableStoredToken) return reusableStoredToken.id;
  }

  const token = generateRandomString(63);
  await db.emailChangeToken.create({
    data: {
      id: token,
      user_id: userId,
      email,
      expires: new Date().getTime() + EXPIRES_IN,
    },
  });

  return token;
};

export const validateEmailChangeToken = async (token: string) => {
  const storedToken = await db.$transaction(async (tx) => {
    const storedToken = await tx.emailChangeToken.findUnique({
      where: {
        id: token,
      },
    });

    if (!storedToken) throw new Error("Invalid token");
    await tx.emailChangeToken.delete({
      where: {
        id: storedToken.id,
      },
    });

    return storedToken;
  });

  const tokenExpires = Number(storedToken.expires); // bigint => number conversion
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Expired token");
  }
  return {
    userId: storedToken.user_id,
    newEmail: storedToken.email,
  };
};
