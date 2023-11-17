import { Separator } from "#/components/ui/separator";
import { SubPageHeader } from "#/components/ui/subpage-header";
import { getPageSession } from "#/lib/auth/lucia";
import { TIER_USERS_FEATURE_ID } from "#/lib/const";
import { getProjectInvites } from "#/lib/project/get-project-invites";
import { getProjectMembers } from "#/lib/project/get-project-members";
import { hasProjectAuthority } from "#/lib/project/project-authority";
import { tier } from "#/lib/tier";
import { MembershipRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { MemberList } from "./components/member-list/member-list";
import { MembershipActions } from "./components/member-ship-actions";

interface Props {
  params: {
    project_id: string;
  };
}

const MembersPage: React.FC<Props> = async ({ params }) => {
  const session = await getPageSession();
  if (!session) redirect("/auth/login");

  const [featureLimits, members, invites, hasAuthority] = await Promise.all([
    tier.lookupLimit(`org:${params.project_id}`, TIER_USERS_FEATURE_ID),
    getProjectMembers(params.project_id),
    getProjectInvites(params.project_id),
    hasProjectAuthority(session.user.userId, params.project_id),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <SubPageHeader
        title="Members"
        description="Teammates that have access to this project."
      >
        <MembershipActions
          projectId={params.project_id}
          isAdminOrOwner={hasAuthority}
          role={
            members?.find((member) => member.userId === session.user.userId)
              ?.role ?? MembershipRole.MEMBER
          }
          memberLimitReached={featureLimits.used === featureLimits.limit}
        />
      </SubPageHeader>
      <Separator />
      <MemberList
        currentUserId={session.user.userId}
        hasAuthority={hasAuthority}
        invites={invites}
        members={members}
      />
    </div>
  );
};

export default MembersPage;
