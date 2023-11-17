"use client";

import { Button, buttonVariants } from "#/components/ui/button";
import { CP_PREFIX } from "#/lib/const";
import { MembershipRole } from "@prisma/client";
import { DoorOpenIcon } from "lucide-react";
import Link from "next/link";
import { AddTeamMember } from "./add-team-member";

export interface MembershipActionsProps {
  projectId: number | string;
  isAdminOrOwner: boolean;
  role: MembershipRole;
  memberLimitReached: boolean;
}

export const MembershipActions: React.FC<MembershipActionsProps> = (props) => {
  const { isAdminOrOwner, role, memberLimitReached, projectId } = props;

  return (
    <div className="flex gap-2">
      {role !== MembershipRole.OWNER && (
        <Button variant="outline">
          <DoorOpenIcon className="me-2 h-4 w-4" />
          Leave Team
        </Button>
      )}
      {isAdminOrOwner && (
        <>
          {!memberLimitReached ? (
            <AddTeamMember projectId={projectId} />
          ) : (
            <Link
              href={`${CP_PREFIX}/${projectId}/settings/billing`}
              className={buttonVariants()}
            >
              Upgrade to invite members
            </Link>
          )}
        </>
      )}
    </div>
  );
};
