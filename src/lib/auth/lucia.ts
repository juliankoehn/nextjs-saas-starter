import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import * as context from "next/headers";
import { cache } from "react";
import { db } from "../db";

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(), // NOT nextjs()
  sessionCookie: {
    expires: false,
  },
  adapter: prisma(db, {
    user: "user",
    key: "key",
    session: "session",
  }),

  getUserAttributes(databaseUser) {
    return {
      username: databaseUser.username ?? databaseUser.name,
      emailVerified: databaseUser.emailVerified,
      locale: databaseUser.locale,
      timezone: databaseUser.timezone,
      name: databaseUser.name,
      email: databaseUser.email,
      theme: databaseUser.theme,
    };
  },
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
