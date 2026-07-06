"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ComponentProps, type HTMLAttributes, type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";

export function Sheet({
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Root>) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const visible = isControlled ? open : internalOpen;
  const preservedChildren = useRef(children);
  if (visible || (children !== null && children !== undefined && children !== false)) {
    preservedChildren.current = children;
  }

  return (
    <DialogPrimitive.Root
      {...props}
      open={visible}
      onOpenChange={(nextOpen) => {
        if (!isControlled) setInternalOpen(nextOpen);
        onOpenChange?.(nextOpen);
      }}
    >
      {visible ? children : preservedChildren.current}
    </DialogPrimitive.Root>
  );
}

export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({
  className,
  children,
  side = "right",
}: {
  className?: string;
  children: ReactNode;
  side?: "left" | "right";
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-[2px] data-[state=closed]:animate-[wl-overlay-out_220ms_ease-in_both] data-[state=open]:animate-[wl-overlay-in_260ms_ease-out_both] motion-reduce:animate-none" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 z-50 w-full max-w-xl overflow-y-auto bg-background shadow-2xl outline-none will-change-[opacity,transform] motion-reduce:animate-none",
          side === "left"
            ? "left-0 border-r data-[state=closed]:animate-[wl-sheet-left-out_220ms_ease-in_both] data-[state=open]:animate-[wl-sheet-left-in_260ms_ease-out_both]"
            : "right-0 border-l data-[state=closed]:animate-[wl-sheet-right-out_220ms_ease-in_both] data-[state=open]:animate-[wl-sheet-right-in_260ms_ease-out_both]",
          className,
        )}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-5 right-5 grid size-9 place-items-center rounded-xl border bg-background/85 text-muted-foreground shadow-sm backdrop-blur hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50">
          <X className="size-4" />
          <span className="sr-only">Zamknij</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b px-6 py-6 pr-16", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("mt-1 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
