import { cn } from "#/utils/dom-utils";
import Link from "next/link";

export interface NavbarLink {
  href: string;
  label: string;
}

interface NavbarProps {
  links: NavbarLink[]; // Ein Array von NavbarLink-Objekten
}

export const MainNav: React.FC<NavbarProps> = (props) => {
  const { links } = props;

  return (
    <div
      className={cn(
        "transition-all fixed top-0 left-0 flex flex-col w-16 z-10",
        "h-[calc(100%-4rem)] mt-16 bg-white shadow overflow-x-hidden will-change-auto",
        "hover:w-60 group"
      )}
    >
      <ul className="grid gap-3 pt-3">
        {links.map((link, idx) => (
          <li className="grid px-3" key={idx}>
            <Link
              href={link.href}
              className={cn(
                "grid grid-flow-col items-center h-10 rounded-md text-sm font-medium",
                "hover:bg-gray-100 relative px-3"
              )}
            >
              <span
                className={cn(
                  "truncate collapse w-0",

                  "group-hover:visible group-hover:w-auto"
                )}
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
