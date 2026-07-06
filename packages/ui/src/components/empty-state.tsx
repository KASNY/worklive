import type { ReactNode } from "react";

import { cn } from "../lib/cn";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center px-6 py-16 text-center", className)}
    >
      <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
