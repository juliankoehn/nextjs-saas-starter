import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { ErrorCode } from "./error-code";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-expect-error
        id: token.sub,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error(`For some reason credentials are missing`);
          throw new Error(ErrorCode.InternalServerError);
        }

        try {
          const user = await login(credentials.email, credentials.password);
          return user;
        } catch (e) {
          console.error(`Failed to login user: ${e}`);
          // we are passing the error to the client
          throw e;
        }
      },
    }),
  ],
};

type LoginFn = (email: string, password: string) => Promise<User>;

export const login: LoginFn = async (email, password) => {
  const user = await db.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  // Don't leak information about it being username or password that is invalid
  if (!user) {
    throw new Error(ErrorCode.IncorrectEmailPassword);
  }

  if (!(await compare(password, user.password))) {
    throw new Error(ErrorCode.IncorrectEmailPassword);
  }

  return user;
};

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const auth = async () =>
  getServerSession(authOptions) as Promise<{
    user: User;
  } | null>;
