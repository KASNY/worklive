"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ComponentProps, type HTMLAttributes, type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";

export function Dialog({
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

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm data-[state=closed]:animate-[wl-overlay-out_220ms_ease-in_both] data-[state=open]:animate-[wl-overlay-in_240ms_ease-out_both] motion-reduce:animate-none" />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg [translate:-50%_-50%] overflow-y-auto rounded-2xl border bg-card p-6 shadow-2xl outline-none will-change-[opacity,scale] data-[state=closed]:animate-[wl-dialog-out_220ms_ease-in_both] data-[state=open]:animate-[wl-dialog-in_240ms_ease-out_both] motion-reduce:animate-none",
          className,
        )}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50">
          <X className="size-4" />
          <span className="sr-only">Zamknij</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-5 space-y-1.5 pr-8", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  );
}
