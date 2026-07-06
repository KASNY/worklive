import type { InputHTMLAttributes } from "react";

import { cn } from "../lib/cn";

export function Input({ className, type, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-xl border border-input bg-background/80 px-3.5 text-sm shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
