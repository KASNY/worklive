"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button, EmptyState, dropdownMotion, reducedDropdownMotion } from "@worklive/ui";

import { notifications as initialNotifications } from "@/lib/mock-data";

type NotificationItem = {
  title: string;
  detail: string;
  time: string;
  unread: boolean;
};

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    initialNotifications.map((notification) => ({ ...notification })),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const unread = notifications.filter((notification) => notification.unread).length;

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-muted-foreground active:scale-95"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Powiadomienia${unread ? `, ${unread} nieprzeczytane` : ""}`}
        aria-expanded={open}
      >
        <Bell />
        {unread > 0 && (
          <span className="absolute top-2 right-2 size-2 rounded-full bg-blue-500 ring-2 ring-background" />
        )}
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            {...(reduceMotion ? reducedDropdownMotion : dropdownMotion)}
            className="absolute top-12 right-0 z-50 w-[min(390px,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border bg-popover shadow-2xl"
            role="dialog"
            aria-label="Powiadomienia"
          >
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
              <div>
                <p className="font-semibold">Powiadomienia</p>
                <p className="text-xs text-muted-foreground">
                  {unread ? `${unread} nieprzeczytane` : "Wszystko przeczytane"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={!unread}
                onClick={() =>
                  setNotifications((items) => items.map((item) => ({ ...item, unread: false })))
                }
              >
                <CheckCheck /> Oznacz wszystkie jako przeczytane
              </Button>
            </div>
            {notifications.length ? (
              <div className="max-h-[420px] overflow-y-auto p-1.5">
                {notifications.map((notification) => (
                  <button
                    key={`${notification.title}-${notification.time}`}
                    className="flex w-full gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 active:bg-muted/80"
                    onClick={() =>
                      setNotifications((items) =>
                        items.map((item) =>
                          item === notification ? { ...item, unread: false } : item,
                        ),
                      )
                    }
                  >
                    <span
                      className={`mt-1.5 size-2 shrink-0 rounded-full ${notification.unread ? "bg-blue-500" : "bg-border"}`}
                    />
                    <span className="min-w-0">
                      <strong className="text-sm">{notification.title}</strong>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {notification.detail}
                      </span>
                      <span className="mt-1 block text-[10px] text-muted-foreground">
                        {notification.time}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<BellOff />}
                title="Brak powiadomień"
                description="Nowe informacje pojawią się tutaj."
                className="py-12"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
