import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none",
  {
    variants: {
      variant: {
        default: "border-primary/15 bg-primary/10 text-primary",
        success: "border-emerald-500/15 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        warning: "border-amber-500/15 bg-amber-500/10 text-amber-700 dark:text-amber-400",
        muted: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
