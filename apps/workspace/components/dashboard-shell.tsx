"use client";

import {
  Boxes,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  FolderKanban,
  Files,
  LayoutDashboard,
  MapPinned,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  ScanLine,
  ShieldAlert,
  Settings,
  TicketCheck,
  Users,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Sheet,
  SheetContent,
  cn,
} from "@worklive/ui";

import { ThemeBrandLogo } from "@/components/theme-brand-logo";
import { NotificationsMenu } from "@/components/notifications-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { initialAssets } from "@/lib/assets-data";
import {
  initialInventoryMovements,
  initialInventoryProducts,
  inventoryStatus,
} from "@/lib/inventory-data";
import { activities, assets, projects, quickActions, stats, tasks } from "@/lib/mock-data";
import { getWarrantyDaysLeft, getWarrantyStatus } from "@/lib/warranty-data";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Zasoby", icon: Boxes, href: "/assets", active: false },
  { label: "Lokalizacje", icon: MapPinned, href: "/locations", active: false },
  { label: "Skanuj QR", icon: ScanLine, href: "/scan", active: false },
  { label: "Dokumenty", icon: Files, href: "/documents", active: false },
  { label: "Zgłoszenia", icon: TicketCheck, href: "/tickets", active: false },
  { label: "Zadania", icon: ClipboardCheck, href: "#", count: 7, active: false },
  { label: "Projekty", icon: FolderKanban, href: "#", active: false },
  { label: "Kalendarz", icon: CalendarDays, href: "#", active: false },
] as const;

const secondaryNavigation = [
  { label: "Zespół", icon: Users, href: "/people" },
  { label: "Działy", icon: FolderKanban, href: "/departments" },
  { label: "Ustawienia", icon: Settings, href: "#" },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-20 items-center border-b border-border/70 px-5">
        <ThemeBrandLogo />
      </div>

      <div className="px-3 py-4">
        <button className="flex w-full items-center gap-3 rounded-xl border border-border/80 bg-background/60 p-2.5 text-left transition-colors hover:bg-accent">
          <span className="grid size-9 place-items-center rounded-lg bg-[#0f172a] text-xs font-bold text-white dark:bg-blue-600">
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
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              {...(onNavigate ? { onClick: onNavigate } : {})}
              className={cn(
                "group flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring/60 active:bg-accent",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <item.icon className="size-[18px]" strokeWidth={item.active ? 2.3 : 1.8} />
              <span className="flex-1">{item.label}</span>
              {"count" in item && (
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </div>

        <p className="mt-7 mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Operacje
        </p>
        <div className="space-y-1">
          <Link
            href="/inventory"
            {...(onNavigate ? { onClick: onNavigate } : {})}
            className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 active:bg-accent"
          >
            <Warehouse className="size-[18px]" strokeWidth={1.8} />
            <span>Magazyn</span>
          </Link>
        </div>

        <p className="mt-7 mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Organizacja
        </p>
        <div className="space-y-1">
          {secondaryNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              {...(onNavigate ? { onClick: onNavigate } : {})}
              className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 active:bg-accent"
            >
              <item.icon className="size-[18px]" strokeWidth={1.8} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-border/70 p-3">
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

export function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const expiringWarranties = initialAssets.filter(
    (asset) => getWarrantyStatus(asset) === "Kończy się",
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[252px] border-r border-border/70 xl:block">
        <SidebarContent />
      </aside>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="max-w-[300px] p-0 xl:hidden">
          <SidebarContent onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="xl:pl-[252px]">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-border/70 bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Otwórz menu"
          >
            <Menu />
          </Button>

          <div className="relative hidden w-full max-w-md md:block">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Szukaj zasobów, projektów, zadań…"
              className="h-10 w-full rounded-xl border border-border/80 bg-muted/45 pr-14 pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/8"
            />
            <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground shadow-xs">
              ⌘ K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Szukaj">
              <Search />
            </Button>
            <ThemeToggle />
            <NotificationsMenu />
            <div className="mx-1 hidden h-7 w-px bg-border sm:block" />
            <button className="hidden items-center gap-2 rounded-xl p-1.5 hover:bg-muted sm:flex">
              <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[11px] font-bold text-white">
                AN
              </span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1540px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span>NovaTech</span>
                <ChevronRight className="size-3.5" />
                <span>Dashboard</span>
              </div>
              <h1 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
                Dzień dobry, Anna
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Oto najważniejsze informacje z Twojego workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="bg-card">
                <CircleHelp /> Pomoc
              </Button>
              <Button>
                <Plus /> Utwórz nowe
              </Button>
            </div>
          </div>

          <section aria-labelledby="quick-actions-title" className="mb-7">
            <h2 id="quick-actions-title" className="sr-only">
              Szybkie akcje
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="group flex min-w-0 items-center gap-3 rounded-2xl border border-border/80 bg-card p-3.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
                >
                  <span className={cn("grid size-10 place-items-center rounded-xl", action.tone)}>
                    <action.icon className="size-[18px]" />
                  </span>
                  <span className="min-w-0 truncate text-sm font-semibold">{action.label}</span>
                  <ChevronRight className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </section>

          <section
            aria-label="Podsumowanie"
            className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {stats.map((stat) => {
              const tone = {
                blue: "bg-blue-500",
                violet: "bg-violet-500",
                amber: "bg-amber-500",
                emerald: "bg-emerald-500",
              }[stat.tone];
              return (
                <Card
                  key={stat.label}
                  className="overflow-hidden hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
                >
                  <Link href={stat.label === "Otwarte zgłoszenia" ? "/tickets" : "#"}>
                    <CardContent className="relative p-5">
                      <span className={cn("absolute top-0 left-0 h-1 w-full", tone)} />
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <MoreHorizontal className="size-4 text-muted-foreground" />
                      </div>
                      <p className="mt-4 text-3xl font-bold tracking-[-0.04em]">{stat.value}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </section>

          <Card className="mb-7 border-amber-500/25 bg-amber-500/[0.04]">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <ShieldAlert className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Gwarancje kończące się</p>
                  <Badge variant="warning">{expiringWarranties.length}</Badge>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {expiringWarranties.length
                    ? expiringWarranties
                        .map((asset) => `${asset.name} · ${getWarrantyDaysLeft(asset) ?? 0} dni`)
                        .join(", ")
                    : "Brak gwarancji kończących się w ciągu 90 dni."}
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/documents">
                  Dokumenty i gwarancje <ChevronRight />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-7 hover:border-primary/15 hover:shadow-md">
            <CardContent className="grid gap-4 p-5 sm:grid-cols-[auto_1fr] sm:items-center xl:grid-cols-[auto_1fr_repeat(3,minmax(110px,auto))_auto]">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Warehouse className="size-5" />
              </span>
              <div>
                <p className="font-semibold">Magazyn</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Bieżący stan operacji magazynowych
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                  {
                    initialInventoryProducts.filter((item) =>
                      ["Niski stan", "Brak"].includes(inventoryStatus(item)),
                    ).length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Niski stan</p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {initialInventoryMovements.filter((item) => item.type === "Przyjęcie").length}
                </p>
                <p className="text-xs text-muted-foreground">Nowe przyjęcia</p>
              </div>
              <div>
                <p className="text-xl font-bold">
                  {
                    initialInventoryMovements.filter(
                      (item) => item.type === "Wydanie" && item.date.startsWith("Dzisiaj"),
                    ).length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Dzisiejsze wydania</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/inventory">
                  Otwórz magazyn <ChevronRight />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
            <Card className="hover:border-primary/15 hover:shadow-md">
              <CardHeader className="flex-row items-center justify-between border-b border-border/60">
                <div>
                  <CardTitle>Ostatnia aktywność</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">Najnowsze zmiany w NovaTech</p>
                </div>
                <Button variant="ghost" size="sm">
                  Zobacz wszystko <ChevronRight />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {activities.map((activity, index) => (
                  <div
                    key={`${activity.subject}-${activity.time}`}
                    className={cn(
                      "flex gap-3 px-5 py-4",
                      index !== activities.length - 1 && "border-b border-border/60",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                        activity.color,
                      )}
                    >
                      {activity.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-5">
                        <span className="font-semibold">{activity.person}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.subject}</span>
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{activity.time}</p>
                    </div>
                    <span className="hidden size-8 place-items-center rounded-lg bg-muted text-muted-foreground sm:grid">
                      <activity.icon className="size-4" />
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="hover:border-primary/15 hover:shadow-md">
              <CardHeader className="flex-row items-center justify-between border-b border-border/60">
                <div>
                  <CardTitle>Nadchodzące zadania</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">Najbliższe 7 dni</p>
                </div>
                <Badge variant="warning">7 otwartych</Badge>
              </CardHeader>
              <CardContent className="p-0">
                {tasks.map((task, index) => (
                  <button
                    key={task.title}
                    className={cn(
                      "group flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-muted/50",
                      index !== tasks.length - 1 && "border-b border-border/60",
                    )}
                  >
                    <span className="mt-0.5 size-4 shrink-0 rounded-full border-2 border-border group-hover:border-primary" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{task.title}</span>
                      <span className="mt-1 block truncate text-[11px] text-muted-foreground">
                        {task.project}
                      </span>
                    </span>
                    <span className="text-right">
                      <span
                        className={cn(
                          "block text-xs font-semibold",
                          task.due === "Dzisiaj" ? "text-rose-500" : "text-foreground",
                        )}
                      >
                        {task.due}
                      </span>
                      <span className="mt-1 block text-[10px] text-muted-foreground">
                        {task.priority}
                      </span>
                    </span>
                  </button>
                ))}
                <div className="p-3">
                  <Button variant="ghost" size="sm" className="w-full">
                    Pokaż wszystkie zadania <ChevronRight />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <Card className="hover:border-primary/15 hover:shadow-md">
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Podsumowanie zasobów</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">128 zasobów w 4 kategoriach</p>
                </div>
                <Button variant="ghost" size="sm">
                  Zasoby <ChevronRight />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex h-3 overflow-hidden rounded-full bg-muted">
                  {assets.map((asset) => (
                    <span
                      key={asset.label}
                      className={asset.color}
                      style={{ width: `${asset.percentage}%` }}
                    />
                  ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {assets.map((asset) => (
                    <div key={asset.label} className="flex items-center gap-3">
                      <span className={cn("size-2.5 rounded-full", asset.color)} />
                      <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                        {asset.label}
                      </span>
                      <span className="text-sm font-bold">{asset.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/15 hover:shadow-md">
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Aktywne projekty</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">Postęp kluczowych inicjatyw</p>
                </div>
                <Button variant="ghost" size="sm">
                  Projekty <ChevronRight />
                </Button>
              </CardHeader>
              <CardContent className="space-y-5">
                {projects.map((project) => (
                  <div key={project.name}>
                    <div className="mb-2.5 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{project.name}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {project.team} · termin {project.deadline}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-primary">{project.progress}%</span>
                    </div>
                    <Progress
                      value={project.progress}
                      label={`Postęp projektu ${project.name}`}
                      className="h-1.5"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
