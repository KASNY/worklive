"use client";

import {
  Boxes,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  FolderKanban,
  Files,
  LayoutDashboard,
  MapPinned,
  Menu,
  MoreHorizontal,
  Search,
  ScanLine,
  Settings,
  TicketCheck,
  Users,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

import { Button, Sheet, SheetContent, cn } from "@worklive/ui";

import { ThemeBrandLogo } from "@/components/theme-brand-logo";
import { NotificationsMenu } from "@/components/notifications-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Zasoby", href: "/assets", icon: Boxes },
  { label: "Lokalizacje", href: "/locations", icon: MapPinned },
  { label: "Skanuj QR", href: "/scan", icon: ScanLine },
  { label: "Dokumenty", href: "/documents", icon: Files },
  { label: "Zgłoszenia", href: "/tickets", icon: TicketCheck },
  { label: "Zadania", href: "#", icon: ClipboardCheck, count: 7 },
  { label: "Projekty", href: "#", icon: FolderKanban },
  { label: "Kalendarz", href: "#", icon: CalendarDays },
] as const;

function Sidebar({ close }: { close?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-20 items-center border-b px-5">
        <ThemeBrandLogo />
      </div>
      <div className="px-3 py-4">
        <button className="flex w-full items-center gap-3 rounded-xl border bg-background/60 p-2.5 text-left hover:bg-accent">
          <span className="grid size-9 place-items-center rounded-lg bg-slate-900 text-xs font-bold text-white dark:bg-blue-600">
            NT
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-foreground">NovaTech</span>
            <span className="block text-[11px] text-muted-foreground">Workspace firmowy</span>
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3" aria-label="Główna nawigacja">
        <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Praca
        </p>
        <div className="space-y-1">
          {navigation.map((item) => {
            const active = item.href !== "#" && pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                {...(close ? { onClick: close } : {})}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring/60 active:bg-accent",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <item.icon className="size-[18px]" strokeWidth={active ? 2.3 : 1.8} />
                <span className="flex-1">{item.label}</span>
                {"count" in item && (
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        <p className="mt-7 mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Operacje
        </p>
        <div className="space-y-1">
          <Link
            href="/inventory"
            {...(close ? { onClick: close } : {})}
            className={cn(
              "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring/60 active:bg-accent",
              pathname.startsWith("/inventory")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Warehouse className="size-[18px]" />
            <span>Magazyn</span>
          </Link>
        </div>
        <p className="mt-7 mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Organizacja
        </p>
        <div className="space-y-1">
          {[
            { label: "Zespół", icon: Users, href: "/people" },
            { label: "Działy", icon: FolderKanban, href: "/departments" },
            { label: "Ustawienia", icon: Settings, href: "#" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 active:bg-accent"
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="border-t p-3">
        <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-accent">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
            AN
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-foreground">Anna Nowak</span>
            <span className="block text-[11px] text-muted-foreground">Administrator</span>
          </span>
          <MoreHorizontal className="size-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[252px] border-r xl:block">
        <Sidebar />
      </aside>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="max-w-[300px] p-0 xl:hidden">
          <Sidebar close={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="xl:pl-[252px]">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Otwórz menu"
          >
            <Menu />
          </Button>
          <div className="relative hidden w-full max-w-md md:block">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Szukaj w workspace…"
              className="h-10 w-full rounded-xl border bg-muted/45 pr-14 pl-10 text-sm outline-none focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/8"
            />
            <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
              ⌘ K
            </kbd>
          </div>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <NotificationsMenu />
            <div className="mx-1 hidden h-7 w-px bg-border sm:block" />
            <span className="hidden size-8 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[11px] font-bold text-white sm:grid">
              AN
            </span>
          </div>
        </header>
        <main className="mx-auto max-w-[1540px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">{children}</main>
      </div>
    </div>
  );
}
