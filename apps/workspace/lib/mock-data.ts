import {
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  FolderKanban,
  PackagePlus,
  Settings2,
  UserPlus,
  Wrench,
  TicketCheck,
} from "lucide-react";

export const stats = [
  { label: "Wszystkie zasoby", value: "128", change: "+8 w tym miesiącu", tone: "blue" },
  { label: "Aktywne projekty", value: "12", change: "4 kończą się wkrótce", tone: "violet" },
  { label: "Otwarte zgłoszenia", value: "4", change: "1 krytyczne", tone: "amber" },
  { label: "Sprawność zasobów", value: "94%", change: "+2,4% od czerwca", tone: "emerald" },
] as const;

export const quickActions = [
  {
    label: "Dodaj zasób",
    icon: PackagePlus,
    tone: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    label: "Nowe zadanie",
    icon: CheckCircle2,
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    label: "Nowy projekt",
    icon: FolderKanban,
    tone: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    label: "Zaproś osobę",
    icon: UserPlus,
    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] as const;

export const activities = [
  {
    person: "Paweł Mazur",
    initials: "PM",
    action: "utworzył zgłoszenie",
    subject: "Frezarka zatrzymuje się podczas cyklu",
    time: "4 min temu",
    color: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    icon: TicketCheck,
  },
  {
    person: "Marek Kowalski",
    initials: "MK",
    action: "zaktualizował status zasobu",
    subject: "Frezarka CNC-04",
    time: "8 min temu",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    icon: Wrench,
  },
  {
    person: "Anna Nowak",
    initials: "AN",
    action: "utworzyła projekt",
    subject: "Modernizacja linii B",
    time: "32 min temu",
    color: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    icon: FolderKanban,
  },
  {
    person: "Piotr Zieliński",
    initials: "PZ",
    action: "ukończył zadanie",
    subject: "Przegląd prasy hydraulicznej",
    time: "1 godz. temu",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    icon: CheckCircle2,
  },
  {
    person: "System",
    initials: "WL",
    action: "wykrył zbliżający się termin",
    subject: "Gwarancja · Wózek H-18",
    time: "2 godz. temu",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    icon: AlertTriangle,
  },
] as const;

export const tasks = [
  {
    title: "Odbiór techniczny linii B",
    project: "Modernizacja linii B",
    due: "Dzisiaj",
    priority: "Wysoki",
  },
  {
    title: "Uzupełnij dokumentację CNC-04",
    project: "Park maszynowy",
    due: "Jutro",
    priority: "Średni",
  },
  { title: "Przegląd kwartalny magazynu", project: "Operacje Q3", due: "8 lip", priority: "Niski" },
] as const;

export const assets = [
  { label: "Maszyny produkcyjne", value: 52, percentage: 41, color: "bg-blue-500" },
  { label: "Narzędzia", value: 38, percentage: 30, color: "bg-violet-500" },
  { label: "Pojazdy i transport", value: 21, percentage: 16, color: "bg-emerald-500" },
  { label: "Pozostałe", value: 17, percentage: 13, color: "bg-slate-400" },
] as const;

export const projects = [
  { name: "Modernizacja linii B", team: "6 osób", progress: 72, deadline: "18 lip" },
  { name: "Audyt magazynu centralnego", team: "4 osoby", progress: 46, deadline: "26 lip" },
  { name: "Wdrożenie standardu 5S", team: "8 osób", progress: 28, deadline: "12 sie" },
] as const;

export const notifications = [
  {
    title: "Nowe zgłoszenie",
    detail: "TIC-0042 · Frezarka zatrzymuje się podczas cyklu",
    time: "5 min",
    unread: true,
  },
  {
    title: "Przypisane zadanie",
    detail: "Odbiór techniczny linii B",
    time: "18 min",
    unread: true,
  },
  {
    title: "Kończąca się gwarancja",
    detail: "HP LaserJet Enterprise M611 · pozostały 42 dni",
    time: "1 godz.",
    unread: true,
  },
  {
    title: "Komentarz w projekcie",
    detail: "Marek dodał komentarz w Modernizacja linii B",
    time: "3 godz.",
    unread: false,
  },
] as const;

export const statusIcons = { active: CircleDot, settings: Settings2 };
