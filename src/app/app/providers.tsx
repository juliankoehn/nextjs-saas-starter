"use client";

import { User } from "lucia";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

export type ProvidersProps = {
  user?: User;
  children: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children, user }) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="hsl(var(--foreground))"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default Providers;
