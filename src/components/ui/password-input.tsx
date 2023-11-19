import { cn } from "#/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";
import { InputProps, inputVariants } from "./input";

export interface PasswordInputProps extends Omit<InputProps, "type"> {}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>((props, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={cn(inputVariants(), "pr-10")}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        className={cn("absolute right-3 top-1/2 -translate-y-1/2 transform")}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOffIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
