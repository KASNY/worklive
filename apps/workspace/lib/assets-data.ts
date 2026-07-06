export type AssetStatus = "Aktywny" | "W serwisie" | "Wycofany";
export type AssetType =
  "Maszyna" | "Laptop" | "Telefon" | "Narzędzie" | "Drukarka" | "Skaner" | "Pojazd";

export type AssetActivity = { title: string; detail: string; date: string };

export type Asset = {
  id: string;
  qrCode: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  internalCode: string;
  serialNumber: string;
  locationId: string;
  responsiblePerson: string;
  purchaseDate: string;
  warrantyUntil: string;
  lastActivity: string;
  documentsCount: number;
  ticketsCount: number;
  activity: AssetActivity[];
};

export const assetTypes: AssetType[] = [
  "Maszyna",
  "Laptop",
  "Telefon",
  "Narzędzie",
  "Drukarka",
  "Skaner",
  "Pojazd",
];
export const assetStatuses: AssetStatus[] = ["Aktywny", "W serwisie", "Wycofany"];
export const people = [
  "Anna Nowak",
  "Marek Kowalski",
  "Piotr Zieliński",
  "Karolina Wiśniewska",
  "Nieprzypisany",
];

const commonActivity: AssetActivity[] = [
  {
    title: "Zaktualizowano dane",
    detail: "Anna Nowak zmieniła informacje zasobu",
    date: "Dzisiaj, 09:42",
  },
  { title: "Przypisano osobę", detail: "Zmieniono osobę odpowiedzialną", date: "2 lip, 14:18" },
  { title: "Utworzono zasób", detail: "Zasób dodano do workspace NovaTech", date: "18 cze, 10:05" },
];

export const initialAssets: Asset[] = [
  {
    id: "asset-001",
    qrCode: "AST-0001",
    name: "Frezarka CNC-04",
    type: "Maszyna",
    status: "Aktywny",
    internalCode: "MCH-CNC-004",
    serialNumber: "DMG-2023-88421",
    locationId: "loc-station-cnc04",
    responsiblePerson: "Marek Kowalski",
    purchaseDate: "2023-03-14",
    warrantyUntil: "2027-03-14",
    lastActivity: "8 min temu",
    documentsCount: 6,
    ticketsCount: 1,
    activity: commonActivity,
  },
  {
    id: "asset-002",
    qrCode: "AST-0002",
    name: "MacBook Pro 14 · Anna",
    type: "Laptop",
    status: "Aktywny",
    internalCode: "IT-MBP-018",
    serialNumber: "FVFGH29KQ05D",
    locationId: "loc-office-101",
    responsiblePerson: "Anna Nowak",
    purchaseDate: "2024-01-22",
    warrantyUntil: "2027-01-22",
    lastActivity: "2 godz. temu",
    documentsCount: 2,
    ticketsCount: 0,
    activity: commonActivity,
  },
  {
    id: "asset-003",
    qrCode: "AST-0003",
    name: "iPhone 15 Pro · Serwis",
    type: "Telefon",
    status: "Aktywny",
    internalCode: "MOB-IP-011",
    serialNumber: "F2LX90A1Q6",
    locationId: "loc-service-cabinet",
    responsiblePerson: "Karolina Wiśniewska",
    purchaseDate: "2024-04-08",
    warrantyUntil: "2026-04-08",
    lastActivity: "Wczoraj",
    documentsCount: 1,
    ticketsCount: 0,
    activity: commonActivity,
  },
  {
    id: "asset-004",
    qrCode: "AST-0004",
    name: "Klucz dynamometryczny 200 Nm",
    type: "Narzędzie",
    status: "W serwisie",
    internalCode: "TLS-DYN-042",
    serialNumber: "GED-77821",
    locationId: "loc-service-cabinet",
    responsiblePerson: "Piotr Zieliński",
    purchaseDate: "2022-11-03",
    warrantyUntil: "2025-11-03",
    lastActivity: "3 dni temu",
    documentsCount: 3,
    ticketsCount: 2,
    activity: commonActivity,
  },
  {
    id: "asset-005",
    qrCode: "AST-0005",
    name: "HP LaserJet Enterprise M611",
    type: "Drukarka",
    status: "Aktywny",
    internalCode: "IT-PRN-007",
    serialNumber: "CNB9K3V17S",
    locationId: "loc-office-101",
    responsiblePerson: "Anna Nowak",
    purchaseDate: "2023-08-17",
    warrantyUntil: "2026-08-17",
    lastActivity: "5 dni temu",
    documentsCount: 2,
    ticketsCount: 1,
    activity: commonActivity,
  },
  {
    id: "asset-006",
    qrCode: "AST-0006",
    name: "Zebra DS3608",
    type: "Skaner",
    status: "Aktywny",
    internalCode: "WHS-SCN-019",
    serialNumber: "ZBR-DS36-9082",
    locationId: "loc-rack-a03",
    responsiblePerson: "Piotr Zieliński",
    purchaseDate: "2024-02-12",
    warrantyUntil: "",
    lastActivity: "Tydzień temu",
    documentsCount: 1,
    ticketsCount: 0,
    activity: commonActivity,
  },
  {
    id: "asset-007",
    qrCode: "AST-0007",
    name: "Toyota Proace City",
    type: "Pojazd",
    status: "Aktywny",
    internalCode: "FLT-TPC-003",
    serialNumber: "YARVAN2023817",
    locationId: "loc-fleet",
    responsiblePerson: "Karolina Wiśniewska",
    purchaseDate: "2023-06-29",
    warrantyUntil: "2028-06-29",
    lastActivity: "9 dni temu",
    documentsCount: 8,
    ticketsCount: 0,
    activity: commonActivity,
  },
  {
    id: "asset-008",
    qrCode: "AST-0008",
    name: "Tokarka uniwersalna TUM-35",
    type: "Maszyna",
    status: "Wycofany",
    internalCode: "MCH-TUM-002",
    serialNumber: "TUM35-1998-441",
    locationId: "loc-hall-b",
    responsiblePerson: "Nieprzypisany",
    purchaseDate: "2016-09-10",
    warrantyUntil: "2018-09-10",
    lastActivity: "Miesiąc temu",
    documentsCount: 4,
    ticketsCount: 3,
    activity: commonActivity,
  },
];
