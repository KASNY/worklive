export type TicketCategory = "IT" | "Awaria" | "Zasób" | "Dokumentacja" | "Bezpieczeństwo" | "Inne";
export type TicketPriority = "Niski" | "Średni" | "Wysoki" | "Krytyczny";
export type TicketStatus = "Nowe" | "W trakcie" | "Oczekuje" | "Rozwiązane" | "Zamknięte";

export type TicketComment = { id: string; author: string; body: string; date: string };
export type TicketActivity = { id: string; text: string; date: string };

export type TicketRecord = {
  id: string;
  code: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  departmentId: string;
  assigneeId: string | null;
  assetId: string | null;
  reporter: string;
  createdAt: string;
  attachments: string[];
  comments: TicketComment[];
  activity: TicketActivity[];
};

export const ticketCategories: TicketCategory[] = [
  "IT",
  "Awaria",
  "Zasób",
  "Dokumentacja",
  "Bezpieczeństwo",
  "Inne",
];
export const ticketPriorities: TicketPriority[] = ["Niski", "Średni", "Wysoki", "Krytyczny"];
export const ticketStatuses: TicketStatus[] = [
  "Nowe",
  "W trakcie",
  "Oczekuje",
  "Rozwiązane",
  "Zamknięte",
];

export const initialTickets: TicketRecord[] = [
  {
    id: "ticket-001",
    code: "TIC-0042",
    title: "Frezarka zatrzymuje się podczas cyklu",
    description: "CNC-04 zgłasza alarm napędu osi Y po około 20 minutach pracy.",
    category: "Awaria",
    priority: "Krytyczny",
    status: "W trakcie",
    departmentId: "dep-maintenance",
    assigneeId: "person-008",
    assetId: "asset-001",
    reporter: "Paweł Mazur",
    createdAt: "2026-07-06 08:14",
    attachments: ["alarm-cnc.jpg"],
    comments: [
      {
        id: "comment-1",
        author: "Agnieszka Dąbrowska",
        body: "Sprawdzam logi sterownika i chłodzenie szafy.",
        date: "Dzisiaj, 09:02",
      },
    ],
    activity: [
      { id: "activity-1", text: "Zmieniono status na W trakcie", date: "Dzisiaj, 08:51" },
      { id: "activity-2", text: "Paweł Mazur utworzył zgłoszenie", date: "Dzisiaj, 08:14" },
    ],
  },
  {
    id: "ticket-002",
    code: "TIC-0041",
    title: "Brak dostępu do VPN",
    description: "Po zmianie hasła klient VPN odrzuca logowanie.",
    category: "IT",
    priority: "Wysoki",
    status: "Nowe",
    departmentId: "dep-it",
    assigneeId: "person-007",
    assetId: "asset-002",
    reporter: "Anna Nowak",
    createdAt: "2026-07-06 07:48",
    attachments: [],
    comments: [],
    activity: [
      { id: "activity-3", text: "Anna Nowak utworzyła zgłoszenie", date: "Dzisiaj, 07:48" },
    ],
  },
  {
    id: "ticket-003",
    code: "TIC-0040",
    title: "Nieczytelna etykieta magazynowa",
    description: "Etykiety z drukarki mają blade kody i nie przechodzą kontroli.",
    category: "Zasób",
    priority: "Średni",
    status: "Oczekuje",
    departmentId: "dep-it",
    assigneeId: null,
    assetId: "asset-005",
    reporter: "Piotr Zieliński",
    createdAt: "2026-07-05 14:20",
    attachments: ["etykieta.jpg"],
    comments: [
      {
        id: "comment-2",
        author: "Jakub Wójcik",
        body: "Czekamy na nowy toner z magazynu IT.",
        date: "Wczoraj, 15:10",
      },
    ],
    activity: [{ id: "activity-4", text: "Status zmieniono na Oczekuje", date: "Wczoraj, 15:10" }],
  },
  {
    id: "ticket-004",
    code: "TIC-0039",
    title: "Brak certyfikatu kalibracji",
    description: "W dokumentach klucza nie ma aktualnego certyfikatu.",
    category: "Dokumentacja",
    priority: "Średni",
    status: "Nowe",
    departmentId: "dep-quality",
    assigneeId: "person-004",
    assetId: "asset-004",
    reporter: "Marek Kowalski",
    createdAt: "2026-07-05 11:03",
    attachments: [],
    comments: [],
    activity: [
      { id: "activity-5", text: "Marek Kowalski utworzył zgłoszenie", date: "Wczoraj, 11:03" },
    ],
  },
  {
    id: "ticket-005",
    code: "TIC-0038",
    title: "Uszkodzona osłona przewodu",
    description: "Przewód zasilający przy stanowisku wymaga zabezpieczenia.",
    category: "Bezpieczeństwo",
    priority: "Wysoki",
    status: "Rozwiązane",
    departmentId: "dep-maintenance",
    assigneeId: "person-002",
    assetId: "asset-001",
    reporter: "Natalia Król",
    createdAt: "2026-07-04 09:32",
    attachments: ["przewod.jpg"],
    comments: [],
    activity: [{ id: "activity-6", text: "Zgłoszenie rozwiązane", date: "4 lip, 13:42" }],
  },
  {
    id: "ticket-006",
    code: "TIC-0037",
    title: "Skaner nie odczytuje DataMatrix",
    description: "Problem występuje na nowych etykietach dostawcy.",
    category: "IT",
    priority: "Niski",
    status: "Zamknięte",
    departmentId: "dep-it",
    assigneeId: "person-007",
    assetId: "asset-006",
    reporter: "Piotr Zieliński",
    createdAt: "2026-07-02 10:16",
    attachments: [],
    comments: [],
    activity: [{ id: "activity-7", text: "Zgłoszenie zamknięte", date: "3 lip, 16:20" }],
  },
];
