export type Department = {
  id: string;
  name: string;
  code: string;
  description: string;
  leadId: string;
};

export type PersonRole = "Administrator" | "Kierownik" | "Pracownik" | "Tylko odczyt";
export type PersonStatus = "Aktywny" | "Nieobecny" | "Nieaktywny";

export type Person = {
  id: string;
  name: string;
  email: string;
  role: PersonRole;
  departmentId: string;
  position: string;
  status: PersonStatus;
  assetsCount: number;
  openTicketsCount: number;
};

export const departments: Department[] = [
  {
    id: "dep-it",
    name: "IT",
    code: "IT",
    description: "Systemy, urządzenia i dostęp użytkowników.",
    leadId: "person-001",
  },
  {
    id: "dep-maintenance",
    name: "Utrzymanie ruchu",
    code: "UR",
    description: "Ciągłość pracy maszyn, przeglądy i naprawy.",
    leadId: "person-002",
  },
  {
    id: "dep-production",
    name: "Produkcja",
    code: "PRD",
    description: "Realizacja i koordynacja procesów produkcyjnych.",
    leadId: "person-003",
  },
  {
    id: "dep-quality",
    name: "Jakość",
    code: "QA",
    description: "Kontrola jakości, certyfikacja i niezgodności.",
    leadId: "person-004",
  },
  {
    id: "dep-warehouse",
    name: "Magazyn",
    code: "WHS",
    description: "Przyjęcia, wydania i gospodarka magazynowa.",
    leadId: "person-005",
  },
  {
    id: "dep-admin",
    name: "Administracja",
    code: "ADM",
    description: "Sprawy organizacyjne, zakupy i dokumentacja firmy.",
    leadId: "person-006",
  },
];

export const people: Person[] = [
  {
    id: "person-001",
    name: "Anna Nowak",
    email: "anna.nowak@novatech.pl",
    role: "Administrator",
    departmentId: "dep-it",
    position: "IT Manager",
    status: "Aktywny",
    assetsCount: 3,
    openTicketsCount: 4,
  },
  {
    id: "person-002",
    name: "Marek Kowalski",
    email: "marek.kowalski@novatech.pl",
    role: "Kierownik",
    departmentId: "dep-maintenance",
    position: "Kierownik utrzymania ruchu",
    status: "Aktywny",
    assetsCount: 5,
    openTicketsCount: 3,
  },
  {
    id: "person-003",
    name: "Tomasz Lewandowski",
    email: "tomasz.lewandowski@novatech.pl",
    role: "Kierownik",
    departmentId: "dep-production",
    position: "Kierownik produkcji",
    status: "Aktywny",
    assetsCount: 1,
    openTicketsCount: 2,
  },
  {
    id: "person-004",
    name: "Karolina Wiśniewska",
    email: "karolina.wisniewska@novatech.pl",
    role: "Kierownik",
    departmentId: "dep-quality",
    position: "Quality Manager",
    status: "Aktywny",
    assetsCount: 2,
    openTicketsCount: 1,
  },
  {
    id: "person-005",
    name: "Piotr Zieliński",
    email: "piotr.zielinski@novatech.pl",
    role: "Kierownik",
    departmentId: "dep-warehouse",
    position: "Kierownik magazynu",
    status: "Aktywny",
    assetsCount: 4,
    openTicketsCount: 2,
  },
  {
    id: "person-006",
    name: "Ewa Kamińska",
    email: "ewa.kaminska@novatech.pl",
    role: "Administrator",
    departmentId: "dep-admin",
    position: "Office Manager",
    status: "Nieobecny",
    assetsCount: 1,
    openTicketsCount: 1,
  },
  {
    id: "person-007",
    name: "Jakub Wójcik",
    email: "jakub.wojcik@novatech.pl",
    role: "Pracownik",
    departmentId: "dep-it",
    position: "IT Support Specialist",
    status: "Aktywny",
    assetsCount: 2,
    openTicketsCount: 5,
  },
  {
    id: "person-008",
    name: "Agnieszka Dąbrowska",
    email: "agnieszka.dabrowska@novatech.pl",
    role: "Pracownik",
    departmentId: "dep-maintenance",
    position: "Automatyk",
    status: "Aktywny",
    assetsCount: 3,
    openTicketsCount: 2,
  },
  {
    id: "person-009",
    name: "Paweł Mazur",
    email: "pawel.mazur@novatech.pl",
    role: "Pracownik",
    departmentId: "dep-production",
    position: "Operator CNC",
    status: "Aktywny",
    assetsCount: 1,
    openTicketsCount: 1,
  },
  {
    id: "person-010",
    name: "Natalia Król",
    email: "natalia.krol@novatech.pl",
    role: "Tylko odczyt",
    departmentId: "dep-quality",
    position: "Audytor jakości",
    status: "Nieaktywny",
    assetsCount: 0,
    openTicketsCount: 0,
  },
];

export const personRoles: PersonRole[] = [
  "Administrator",
  "Kierownik",
  "Pracownik",
  "Tylko odczyt",
];

export function departmentName(id: string) {
  return departments.find((department) => department.id === id)?.name ?? "Brak działu";
}

export function personName(id: string | null) {
  if (!id) return "Nieprzypisane";
  return people.find((person) => person.id === id)?.name ?? "Nieznana osoba";
}
