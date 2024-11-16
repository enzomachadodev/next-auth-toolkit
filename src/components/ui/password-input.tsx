"use client";

import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = InputProps;

export const PasswordInput = ({
  value,
  className,
  ...rest
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative">
      <Input
        className={cn("pe-9", className)}
        type={isVisible ? "text" : "password"}
        value={value}
        {...rest}
      />
      <button
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <LuEyeOff size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <LuEye size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
