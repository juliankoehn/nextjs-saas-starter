import { Badge } from "#/components/ui/badge";
import { GetProjectInvitesReturn } from "#/lib/project/get-project-invites";
import { GetProjectMemberResult } from "#/lib/project/get-project-members";
import React from "react";
import { InvitesActions } from "./invites-actions";
import { MemberActions } from "./member-actions";
import { RolePopover } from "./role-popover";

export interface MemberListProps {
  currentUserId: string;
  invites: GetProjectInvitesReturn;
  members: GetProjectMemberResult;
  hasAuthority: boolean;
}

export const MemberList: React.FC<MemberListProps> = (props) => {
  const { invites, members, hasAuthority, currentUserId } = props;

  const currentMember = members?.find(
    (member) => member.userId === currentUserId
  );

  return (
    <ul className="rounded-lg border divide-y">
      {invites?.map((invite) => (
        <li key={invite.id} className="px-5">
          <div className="my-4 flex justify-between">
            <div className="flex w-full flex-col justify-between truncate sm:flex-row">
              <div className="flex flex-col gap-1">
                <div className="flex">
                  <span className="font-semibold text-sm">
                    {invite.name ??
                      invite.email.split("@")[0] ??
                      "Unnamed User"}
                  </span>{" "}
                  <Badge variant="outline">Invited</Badge>
                </div>
                <div className="text-foreground flex items-center">
                  <span className="text-sm text-muted-foreground">
                    {invite.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-12">
              <span className="text-sm text-foreground capitalize">
                {invite.role.toLowerCase()}
              </span>
              <InvitesActions id={invite.id} isAdmin={hasAuthority} />
            </div>
          </div>
        </li>
      ))}
      {members?.map((member) => (
        <li key={member.id} className="px-5">
          <div className="my-4 flex justify-between">
            <div className="flex w-full flex-col justify-between truncate sm:flex-row">
              <div className="flex flex-col gap-1">
                <div className="flex">
                  <span className="font-semibold text-sm">
                    {member.user.name ??
                      member.user.email.split("@")[0] ??
                      "Unnamed User"}
                  </span>
                </div>
                <div className="text-foreground flex items-center">
                  <span className="text-sm text-muted-foreground">
                    {member.user.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-12">
              <RolePopover
                isAdmin={currentMember?.role === "ADMIN"}
                isOwner={currentMember?.role === "OWNER"}
                projectId={member.projectId}
                memberId={member.id}
                role={member.role}
              />
              <MemberActions
                id={member.id}
                isAdmin={hasAuthority}
                isCurrentUser={currentUserId === member.userId}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
