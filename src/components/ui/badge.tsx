import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-black/[0.05] text-ink-soft",
        brand: "bg-brand/10 text-brand",
        critico: "bg-[color-mix(in_srgb,var(--color-urgency-critico)_12%,white)] text-urgency-critico",
        alto: "bg-[color-mix(in_srgb,var(--color-urgency-alto)_12%,white)] text-urgency-alto",
        medio: "bg-[color-mix(in_srgb,var(--color-urgency-medio)_12%,white)] text-urgency-medio",
        bajo: "bg-[color-mix(in_srgb,var(--color-urgency-bajo)_12%,white)] text-urgency-bajo",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
