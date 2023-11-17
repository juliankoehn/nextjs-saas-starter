/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("#/lib/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    emailVerified?: Date | string;
    email: string;
    username?: string;
    name?: string;
  };
  type DatabaseSessionAttributes = {};
}