"use client";
import { cn } from "#/utils/dom-utils";
import { usePathname } from "next/navigation";

export const ActiveIndicator: React.FC<{
  href: string;
}> = ({ href }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn("mx-2 mt-1", pathname === href ? "visible" : "invisible")}
    >
      <div className={cn("w-full h-[2px] bg-blue-500")} />
    </div>
  );
};
