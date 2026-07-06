export type DocumentType = "Instrukcja" | "Faktura" | "Certyfikat" | "Zdjęcie" | "Umowa" | "Inny";

export type AssetDocument = {
  id: string;
  name: string;
  type: DocumentType;
  fileName: string;
  size: string;
  addedAt: string;
  author: string;
  assetId: string | null;
  description: string;
};

export const documentTypes: DocumentType[] = [
  "Instrukcja",
  "Faktura",
  "Certyfikat",
  "Zdjęcie",
  "Umowa",
  "Inny",
];

export const documentAuthors = ["Anna Nowak", "Marek Kowalski", "Piotr Zieliński"];

export const initialDocuments: AssetDocument[] = [
  {
    id: "doc-001",
    name: "Instrukcja obsługi CNC-04",
    type: "Instrukcja",
    fileName: "cnc-04-instrukcja.pdf",
    size: "4,8 MB",
    addedAt: "2026-07-02",
    author: "Marek Kowalski",
    assetId: "asset-001",
    description: "Instrukcja producenta wraz z procedurą bezpiecznego uruchomienia.",
  },
  {
    id: "doc-002",
    name: "Faktura zakupu CNC-04",
    type: "Faktura",
    fileName: "fv-2023-03-184.pdf",
    size: "382 KB",
    addedAt: "2023-03-14",
    author: "Anna Nowak",
    assetId: "asset-001",
    description: "Dokument zakupu będący podstawą gwarancji zasobu.",
  },
  {
    id: "doc-003",
    name: "Certyfikat zgodności CNC-04",
    type: "Certyfikat",
    fileName: "ce-cnc-04.pdf",
    size: "1,2 MB",
    addedAt: "2023-03-15",
    author: "Anna Nowak",
    assetId: "asset-001",
    description: "Deklaracja zgodności CE dostarczona przez producenta.",
  },
  {
    id: "doc-004",
    name: "Faktura MacBook Pro 14",
    type: "Faktura",
    fileName: "fv-mbp-018.pdf",
    size: "214 KB",
    addedAt: "2024-01-22",
    author: "Anna Nowak",
    assetId: "asset-002",
    description: "Faktura zakupu laptopa służbowego.",
  },
  {
    id: "doc-005",
    name: "Zdjęcie iPhone 15 Pro",
    type: "Zdjęcie",
    fileName: "iphone-15-pro.jpg",
    size: "2,1 MB",
    addedAt: "2026-06-28",
    author: "Piotr Zieliński",
    assetId: "asset-003",
    description: "Zdjęcie stanu urządzenia przy przyjęciu do ewidencji.",
  },
  {
    id: "doc-006",
    name: "Certyfikat kalibracji 200 Nm",
    type: "Certyfikat",
    fileName: "kalibracja-tls-042.pdf",
    size: "690 KB",
    addedAt: "2025-10-11",
    author: "Piotr Zieliński",
    assetId: "asset-004",
    description: "Ostatni certyfikat kalibracji klucza dynamometrycznego.",
  },
  {
    id: "doc-007",
    name: "Faktura HP LaserJet M611",
    type: "Faktura",
    fileName: "fv-hp-m611.pdf",
    size: "246 KB",
    addedAt: "2023-08-17",
    author: "Anna Nowak",
    assetId: "asset-005",
    description: "Faktura powiązana z gwarancją drukarki.",
  },
  {
    id: "doc-008",
    name: "Instrukcja HP LaserJet M611",
    type: "Instrukcja",
    fileName: "hp-m611-manual.pdf",
    size: "7,3 MB",
    addedAt: "2026-05-19",
    author: "Marek Kowalski",
    assetId: "asset-005",
    description: "Instrukcja obsługi i konserwacji drukarki.",
  },
  {
    id: "doc-009",
    name: "Instrukcja Zebra DS3608",
    type: "Instrukcja",
    fileName: "zebra-ds3608.pdf",
    size: "5,6 MB",
    addedAt: "2024-02-12",
    author: "Piotr Zieliński",
    assetId: "asset-006",
    description: "Konfiguracja skanera i kody programujące.",
  },
  {
    id: "doc-010",
    name: "Umowa leasingu Toyota Proace",
    type: "Umowa",
    fileName: "leasing-proace.pdf",
    size: "1,8 MB",
    addedAt: "2023-06-29",
    author: "Anna Nowak",
    assetId: "asset-007",
    description: "Umowa finansowania pojazdu firmowego.",
  },
  {
    id: "doc-011",
    name: "Polityka ewidencji sprzętu",
    type: "Inny",
    fileName: "polityka-ewidencji.pdf",
    size: "540 KB",
    addedAt: "2026-07-04",
    author: "Anna Nowak",
    assetId: null,
    description: "Dokument ogólny workspace, bez powiązania z pojedynczym zasobem.",
  },
];
