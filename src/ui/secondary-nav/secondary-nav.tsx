import { cn } from "#/utils/dom-utils";
import { ActiveIndicator } from "./active-indicator";

export interface SecondaryNavProps {
  links: NavbarLink[];
}

export interface NavbarLink {
  href: string;
  label: string;
}

export const SecondaryNav: React.FC<SecondaryNavProps> = (props) => {
  const { links } = props;

  return (
    <div className="self-end overflow-hidden">
      <div className="flex relative overflow-hidden">
        <nav className="w-full">
          <ul className="flex m-0 p-0 gap-2 pt-4">
            {links.map((link, idx) => (
              <li
                key={idx}
                className="flex  items-center gap-3 whitespace-nowrap relative"
              >
                <a
                  href={link.href}
                  className={cn(
                    "transition-colors flex flex-col relative pb-3",
                    "group"
                  )}
                >
                  <div className="mt-3 transition-colors group-hover:bg-gray-200 rounded-md px-2 py-1 text-sm font-medium">
                    {link.label}
                  </div>
                  <ActiveIndicator href={link.href} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
