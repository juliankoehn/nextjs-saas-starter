"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React, { PropsWithChildren } from "react";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
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
