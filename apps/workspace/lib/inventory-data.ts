export type InventoryStatus = "Dostępny" | "Niski stan" | "Brak" | "Zarezerwowany" | "W drodze";
export type InventoryOperation =
  "Przyjęcie" | "Wydanie" | "Przesunięcie" | "Rezerwacja" | "Korekta" | "Inwentaryzacja";

export type InventoryProduct = {
  id: string;
  name: string;
  code: string;
  sku: string;
  qrCode: string;
  description: string;
  category: string;
  department: string;
  location: string;
  quantity: number;
  unit: string;
  minimumStock: number;
  reservedQuantity: number;
  inTransitQuantity: number;
  lastMovement: string;
};

export type InventoryMovement = {
  id: string;
  productId: string;
  type: InventoryOperation;
  quantity: number;
  person: string;
  date: string;
  location: string;
  description: string;
  fromLocation?: string;
  toLocation?: string;
  supplier?: string;
  documentNumber?: string;
  recipient?: string;
  department?: string;
  project?: string;
  ticketId?: string;
  assetId?: string;
};

export const inventoryLocations = [
  "Magazyn centralny · Regał A03",
  "Magazyn centralny · Regał B01",
  "Magazyn centralny · Strefa IT",
  "Hala produkcyjna A · Szafka UR",
  "Hala produkcyjna B · Narzędziownia",
];

export const inventoryCategories = ["Elementy złączne", "Części", "IT", "Materiały", "Narzędzia"];

export const initialInventoryProducts: InventoryProduct[] = [
  {
    id: "inv-001",
    name: "Śruby imbusowe M8×30",
    code: "MAG-SRB-001",
    sku: "SRB-M8-30-100",
    qrCode: "INV-0001",
    description: "Śruby ocynkowane klasy 8.8, opakowanie zbiorcze.",
    category: "Elementy złączne",
    department: "Utrzymanie ruchu",
    location: inventoryLocations[0]!,
    quantity: 1240,
    unit: "szt.",
    minimumStock: 300,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "Dzisiaj, 09:18",
  },
  {
    id: "inv-002",
    name: "Łożysko 6204 2RS",
    code: "MAG-LOZ-014",
    sku: "SKF-6204-2RS",
    qrCode: "INV-0002",
    description: "Łożysko kulkowe uszczelnione do napędów linii.",
    category: "Części",
    department: "Utrzymanie ruchu",
    location: inventoryLocations[0]!,
    quantity: 42,
    unit: "szt.",
    minimumStock: 20,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "Dzisiaj, 08:42",
  },
  {
    id: "inv-003",
    name: "Drukarka etykiet Zebra ZD421",
    code: "MAG-PRN-006",
    sku: "ZD4A042-D0EM00EZ",
    qrCode: "INV-0003",
    description: "Drukarka termotransferowa przygotowana do wydania.",
    category: "IT",
    department: "IT",
    location: inventoryLocations[2]!,
    quantity: 2,
    unit: "szt.",
    minimumStock: 2,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "Wczoraj, 15:30",
  },
  {
    id: "inv-004",
    name: "Mysz Logitech M650",
    code: "MAG-IT-021",
    sku: "LOG-M650-GR",
    qrCode: "INV-0004",
    description: "Bezprzewodowa mysz biurowa.",
    category: "IT",
    department: "IT",
    location: inventoryLocations[2]!,
    quantity: 0,
    unit: "szt.",
    minimumStock: 5,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "Wczoraj, 13:12",
  },
  {
    id: "inv-005",
    name: "Laptop Dell Latitude 5450",
    code: "MAG-IT-034",
    sku: "DELL-LAT-5450-I7",
    qrCode: "INV-0005",
    description: "Laptop biznesowy przed konfiguracją i nadaniem numeru Asset.",
    category: "IT",
    department: "IT",
    location: inventoryLocations[2]!,
    quantity: 6,
    unit: "szt.",
    minimumStock: 2,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "3 lip, 10:45",
  },
  {
    id: "inv-006",
    name: "Monitor Dell P2425H",
    code: "MAG-IT-035",
    sku: "DELL-P2425H",
    qrCode: "INV-0006",
    description: "Monitor 24 cale do stanowisk biurowych.",
    category: "IT",
    department: "IT",
    location: inventoryLocations[2]!,
    quantity: 3,
    unit: "szt.",
    minimumStock: 4,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "2 lip, 16:22",
  },
  {
    id: "inv-007",
    name: "Kabel Ethernet Cat.6 3 m",
    code: "MAG-KBL-008",
    sku: "CAT6-3M-BLU",
    qrCode: "INV-0007",
    description: "Patchcord sieciowy niebieski.",
    category: "IT",
    department: "IT",
    location: inventoryLocations[2]!,
    quantity: 180,
    unit: "szt.",
    minimumStock: 50,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "1 lip, 12:08",
  },
  {
    id: "inv-008",
    name: "Toner HP 147A",
    code: "MAG-TON-011",
    sku: "HP-W1470A",
    qrCode: "INV-0008",
    description: "Czarny toner do drukarek HP LaserJet Enterprise.",
    category: "IT",
    department: "Administracja",
    location: inventoryLocations[2]!,
    quantity: 4,
    unit: "szt.",
    minimumStock: 6,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "30 cze, 09:11",
  },
  {
    id: "inv-009",
    name: "Taśma pakowa transparentna",
    code: "MAG-PAK-004",
    sku: "TAPE-48-66-TR",
    qrCode: "INV-0009",
    description: "Taśma 48 mm × 66 m do pakowania wysyłek.",
    category: "Materiały",
    department: "Magazyn",
    location: inventoryLocations[1]!,
    quantity: 0,
    unit: "rol.",
    minimumStock: 40,
    reservedQuantity: 0,
    inTransitQuantity: 120,
    lastMovement: "Dzisiaj, 07:55",
  },
  {
    id: "inv-010",
    name: "Opakowanie kartonowe 400×300",
    code: "MAG-PAK-010",
    sku: "BOX-400-300-200",
    qrCode: "INV-0010",
    description: "Karton klapowy do wysyłek części.",
    category: "Materiały",
    department: "Magazyn",
    location: inventoryLocations[1]!,
    quantity: 450,
    unit: "szt.",
    minimumStock: 100,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "Wczoraj, 11:40",
  },
  {
    id: "inv-011",
    name: "Oprawka narzędziowa BT40",
    code: "MAG-CNC-017",
    sku: "BT40-ER32-100",
    qrCode: "INV-0011",
    description: "Oprawka ER32 do centrów CNC.",
    category: "Części",
    department: "Produkcja",
    location: inventoryLocations[4]!,
    quantity: 12,
    unit: "szt.",
    minimumStock: 10,
    reservedQuantity: 8,
    inTransitQuantity: 0,
    lastMovement: "Dzisiaj, 10:02",
  },
  {
    id: "inv-012",
    name: "Klucz płasko-oczkowy 17 mm",
    code: "MAG-NAR-028",
    sku: "TOOL-WRENCH-17",
    qrCode: "INV-0012",
    description: "Narzędzie warsztatowe do zestawów serwisowych.",
    category: "Narzędzia",
    department: "Utrzymanie ruchu",
    location: inventoryLocations[3]!,
    quantity: 28,
    unit: "szt.",
    minimumStock: 8,
    reservedQuantity: 0,
    inTransitQuantity: 0,
    lastMovement: "28 cze, 14:31",
  },
];

export const initialInventoryMovements: InventoryMovement[] = [
  {
    id: "mov-001",
    productId: "inv-011",
    type: "Rezerwacja",
    quantity: 8,
    person: "Marek Kowalski",
    date: "Dzisiaj, 10:02",
    location: inventoryLocations[4]!,
    description: "Rezerwacja dla projektu Modernizacja linii B",
    project: "Modernizacja linii B",
  },
  {
    id: "mov-002",
    productId: "inv-001",
    type: "Wydanie",
    quantity: -40,
    person: "Piotr Zieliński",
    date: "Dzisiaj, 09:18",
    location: inventoryLocations[0]!,
    description: "Wydanie na utrzymanie ruchu",
    recipient: "Agnieszka Dąbrowska",
    department: "Utrzymanie ruchu",
    assetId: "asset-001",
    ticketId: "ticket-001",
  },
  {
    id: "mov-003",
    productId: "inv-002",
    type: "Wydanie",
    quantity: -2,
    person: "Piotr Zieliński",
    date: "Dzisiaj, 08:42",
    location: inventoryLocations[0]!,
    description: "Wymiana łożysk napędu CNC-04",
    recipient: "Marek Kowalski",
    assetId: "asset-001",
    ticketId: "ticket-001",
  },
  {
    id: "mov-004",
    productId: "inv-009",
    type: "Przyjęcie",
    quantity: 120,
    person: "Anna Nowak",
    date: "Dzisiaj, 07:55",
    location: inventoryLocations[1]!,
    description: "Dostawa w drodze · planowane przyjęcie",
    supplier: "PackPro",
    documentNumber: "PZ/2026/071",
  },
  {
    id: "mov-005",
    productId: "inv-003",
    type: "Wydanie",
    quantity: -1,
    person: "Jakub Wójcik",
    date: "Wczoraj, 15:30",
    location: inventoryLocations[2]!,
    description: "Wydanie drukarki etykiet do magazynu",
    department: "Magazyn",
    project: "Audyt magazynu centralnego",
  },
  {
    id: "mov-006",
    productId: "inv-004",
    type: "Wydanie",
    quantity: -3,
    person: "Jakub Wójcik",
    date: "Wczoraj, 13:12",
    location: inventoryLocations[2]!,
    description: "Wydanie wyposażenia dla nowych stanowisk",
    department: "Administracja",
  },
  {
    id: "mov-007",
    productId: "inv-010",
    type: "Przyjęcie",
    quantity: 300,
    person: "Piotr Zieliński",
    date: "Wczoraj, 11:40",
    location: inventoryLocations[1]!,
    description: "Przyjęcie opakowań",
    supplier: "Kartonex",
    documentNumber: "PZ/2026/069",
  },
  {
    id: "mov-008",
    productId: "inv-005",
    type: "Przyjęcie",
    quantity: 6,
    person: "Anna Nowak",
    date: "3 lip, 10:45",
    location: inventoryLocations[2]!,
    description: "Dostawa laptopów do konfiguracji",
    supplier: "Dell Partner",
    documentNumber: "FV/2026/881",
  },
  {
    id: "mov-009",
    productId: "inv-006",
    type: "Wydanie",
    quantity: -2,
    person: "Jakub Wójcik",
    date: "2 lip, 16:22",
    location: inventoryLocations[2]!,
    description: "Monitory dla działu jakości",
    department: "Jakość",
  },
  {
    id: "mov-010",
    productId: "inv-007",
    type: "Przesunięcie",
    quantity: 50,
    person: "Piotr Zieliński",
    date: "1 lip, 12:08",
    location: inventoryLocations[2]!,
    description: "Przesunięcie ze strefy przyjęć",
    fromLocation: inventoryLocations[1]!,
    toLocation: inventoryLocations[2]!,
  },
  {
    id: "mov-011",
    productId: "inv-008",
    type: "Wydanie",
    quantity: -2,
    person: "Anna Nowak",
    date: "30 cze, 09:11",
    location: inventoryLocations[2]!,
    description: "Toner do HP LaserJet M611",
    assetId: "asset-005",
    ticketId: "ticket-003",
  },
  {
    id: "mov-012",
    productId: "inv-012",
    type: "Inwentaryzacja",
    quantity: 2,
    person: "Marek Kowalski",
    date: "28 cze, 14:31",
    location: inventoryLocations[3]!,
    description: "Nadwyżka po inwentaryzacji narzędziowni",
  },
];

export function inventoryStatus(product: InventoryProduct): InventoryStatus {
  if (product.inTransitQuantity > 0 && product.quantity === 0) return "W drodze";
  if (product.quantity === 0) return "Brak";
  if (product.reservedQuantity > 0 && product.reservedQuantity >= product.quantity / 2)
    return "Zarezerwowany";
  if (product.quantity <= product.minimumStock) return "Niski stan";
  return "Dostępny";
}
