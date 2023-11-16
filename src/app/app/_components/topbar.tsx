import { Input } from "#/components/ui/input";
import { Logo } from "#/components/ui/logo";
import { cn } from "#/utils/dom-utils";
import Link from "next/link";
import React from "react";
import UserNavSSR from "./user-nav-ssr";

export const Topbar: React.FC = () => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 flex gap-5 items-center px-6 z-20",
        "w-screen h-16 bg-background shadow z-10 justify-between"
      )}
    >
      <Link href="/app">
        <Logo />
      </Link>
      <div>
        <Input type="search" placeholder="Search...." />
      </div>
      <div>
        <UserNavSSR />
      </div>
    </div>
  );
};
