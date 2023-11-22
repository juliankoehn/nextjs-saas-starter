/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("#/lib/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    emailVerified?: Date;
    timezone?: string;
    locale?: string;
    email: string;
    username?: string;
    name?: string;
    theme?: string;
  };
  type DatabaseSessionAttributes = {};
}
