"use server";

import { signIn } from "next-auth/react";
import { LoginSchema } from "./schema";

export const loginAction = async (input: LoginSchema) => {
  signIn("credentials", input);
  console.log("loginAction", input);
};
