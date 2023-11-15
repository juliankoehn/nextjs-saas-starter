import { getPageSession } from "#/lib/auth/lucia";
import { UserNav } from "./user-nav";

export default async function UserNavSSR() {
  const session = await getPageSession();

  if (!session?.user) {
    return null;
  }

  return <UserNav user={session?.user!} />;
}
