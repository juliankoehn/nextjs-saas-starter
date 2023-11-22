import { Sidebar } from "#/components/ui/sidebar";
import { UnlockIcon, UserIcon, WorkflowIcon } from "lucide-react";
import { NextPage } from "next";

const ProfileLayout: NextPage<{
  children: React.ReactNode;
}> = async ({ children }) => {
  return (
    <div className="transition-all block ps-16">
      <Sidebar
        links={[
          {
            href: "/app/profile",
            label: "Profile",
            icon: <UserIcon />,
            exact: true,
          },
          {
            href: "/app/profile/login-connections",
            label: "Login Connections",
            icon: <WorkflowIcon />,
          },
          {
            href: "/app/profile/security",
            label: "Security",
            icon: <UnlockIcon />,
          },
        ]}
      />
      <div className="mx-auto max-w-7xl p-8">{children}</div>
    </div>
  );
};

export default ProfileLayout;
