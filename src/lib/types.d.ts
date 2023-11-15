import "next-auth";

declare module "next-auth" {
  type User = {
    id: number;
    username: string | null;
    email: string;
    name: string | null;
    locale: string | null;
    password?: string;
  };
}
