import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

import { cn } from "../lib/cn";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative block">
      <select
        className={cn(
          "h-10 w-full appearance-none rounded-xl border border-input bg-background/80 py-2 pr-9 pl-3 text-sm shadow-xs outline-none transition-[border-color,box-shadow] focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
    </span>
  );
}
