import { cn } from "#/utils/dom-utils";
import React from "react";

export interface PageHeaderProps {
  left?: React.ReactNode;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { children, left } = props;

  return (
    <div
      className={cn("flex items-center justify-between gap-5 mb-6 relative")}
    >
      <div className={cn("flex gap-3 items-center")}>{left}</div>
      <div className={cn("flex gap-3 items-center")}>{children}</div>
    </div>
  );
};
