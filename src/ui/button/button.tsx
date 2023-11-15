import { cn } from "#/utils/dom-utils";
import { cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef, memo } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

const styles = cva([
  "transition-colors grid justify-center items-center gap-2 grid-flow-col",
  "font-sans font-medium rounded-md cursor-pointer",
  // size stuff
  "px-4 h-11",
  // variant stuff
  "bg-blue-600 text-white hover:bg-blue-500",
]);

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, ...rest } = props;

    return <button ref={ref} className={cn(styles(), className)} {...rest} />;
  })
);
