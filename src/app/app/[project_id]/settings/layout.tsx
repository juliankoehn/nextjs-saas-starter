import { TabbedNav } from "#/components/ui/tabbed-nav";
import { CP_PREFIX } from "#/lib/const";

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    project_id: string;
  };
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  children,
  params,
}) => {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div>
        <TabbedNav
          links={[
            {
              href: `${CP_PREFIX}/${params.project_id}/settings`,
              label: "General",
              exact: true,
            },
            {
              label: "Members",
              href: `${CP_PREFIX}/${params.project_id}/settings/members`,
            },
            {
              label: "Billing",
              href: `${CP_PREFIX}/${params.project_id}/settings/billing`,
            },
          ]}
        />
      </div>
      <div className="py-8">{children}</div>
    </div>
  );
};

export default SettingsLayout;
