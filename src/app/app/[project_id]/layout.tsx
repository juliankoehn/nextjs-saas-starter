import { NextPage } from "next";
import { MainNav } from './_components/main-nav';

const ProjectLayout: NextPage<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="transition-all block ps-16">
        <MainNav
            links={[
                {
                    href: '#',
                    label: 'Umfragen'
                },
                {
                    href: '#',
                    label: 'Einstellungen'
                }
            ]}
        />
      {children}
    </div>
  );
};

export default ProjectLayout;
