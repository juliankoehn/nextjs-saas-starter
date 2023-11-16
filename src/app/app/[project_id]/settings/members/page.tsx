import { Button, buttonVariants } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { getPageSession } from "#/lib/auth/lucia";
import { CP_PREFIX } from "#/lib/const";
import { getProjectMembers } from "#/lib/project/get-project-members";
import { MembershipRole } from "@prisma/client";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: {
    project_id: string;
  };
}

const MembersPage: React.FC<Props> = async ({ params }) => {
  const session = await getPageSession();
  if (!session) redirect("/auth/login");

  const members = await getProjectMembers(params.project_id);

  // Doing this SSR, thats why we dont use useMemo
  const isCurrentUserAdmin = () => {
    return members?.some(
      (member) =>
        [
          MembershipRole.ADMIN.toString(),
          MembershipRole.OWNER.toString(),
        ].includes(member.role) && member.userId === session.user.userId
    );
  };

  const isCurrentUser = (userId: string) => {
    if (!session) return false;
    return userId === session.user.userId;
  };

  return (
    <>
      <div className="flex justify-between space-y-0.5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Members</h2>
          <p className="text-muted-foreground">
            Teammates that have access to this project.
          </p>
        </div>
        <div>
          <Link
            href={`${CP_PREFIX}/${params.project_id}/settings/billing`}
            className={buttonVariants()}
          >
            Upgrade to invite members
          </Link>
        </div>
      </div>
      <ul className="mt-6 border rounded-lg divide-y">
        {members?.map((member) => (
          <li
            className="flex py-4 px-10 justify-between items-center"
            key={member.id}
          >
            <div className="flex items-center gap-12">
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">
                  {member.user.name ?? "Unnamed User"}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {member.user.email}
                </p>
              </div>
              <div className="text-sm"></div>
            </div>
            <div className="flex items-center gap-12">
              <span className="text-sm text-foreground capitalize">
                {member.role.toLowerCase()}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  {session.user.userId === member.user.id && (
                    <DropdownMenuItem
                      variant="destructive"
                      className="hover:cursor-pointer"
                    >
                      Leave project
                    </DropdownMenuItem>
                  )}
                  {isCurrentUserAdmin() && !isCurrentUser(member.userId) ? (
                    <DropdownMenuItem
                      variant="destructive"
                      className="hover:cursor-pointer"
                    >
                      Remove teammate
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem disabled variant="destructive">
                      Remove teammate
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MembersPage;
