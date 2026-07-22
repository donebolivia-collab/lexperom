import * as React from "react";
import { cn } from "@/lib/utils";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand accent-[#1c2f4f]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";
