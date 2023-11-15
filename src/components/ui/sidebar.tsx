"use client";
import { cn } from "#/utils/dom-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, isValidElement } from "react";
import { buttonVariants } from "./button";

export interface NavbarLink {
  href: string;
  label: string;
  icon?: React.ReactElement;
  exact?: boolean;
}

interface SidebarProps {
  links: NavbarLink[]; // Ein Array von NavbarLink-Objekten
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { links } = props;

  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "transition-all fixed top-0 left-0 flex flex-col w-16 z-10",
        "h-[calc(100%-4rem)] mt-16 bg-white shadow overflow-x-hidden will-change-auto",
        "hover:w-60 group"
      )}
    >
      <ul className="grid gap-2 pt-3">
        {links.map((link, idx) => (
          <li
            className="grid items-center justify-center group-hover:justify-normal group-hover:px-3 w-full"
            key={idx}
          >
            <Link
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start w-full",
                (link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href)) && "bg-muted hover:bg-muted"

                // "grid grid-flow-col items-center h-10 rounded-md text-sm font-medium",
                // "hover:bg-gray-100 relative px-3"
              )}
            >
              {link.icon &&
                isValidElement(link.icon) &&
                cloneElement(link.icon as any, {
                  className: cn("h-4 w-4", "group-hover:mr-2"),
                })}
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
    </nav>
  );
};
