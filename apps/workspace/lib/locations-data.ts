export type LocationType =
  | "Firma"
  | "Oddział"
  | "Budynek"
  | "Hala"
  | "Biuro"
  | "Magazyn"
  | "Regał"
  | "Szafka"
  | "Stanowisko";

export type LocationNode = {
  id: string;
  name: string;
  type: LocationType;
  parentId: string | null;
  code: string;
  description: string;
};

export const initialLocations: LocationNode[] = [
  {
    id: "loc-company",
    name: "NovaTech",
    type: "Firma",
    parentId: null,
    code: "NT",
    description: "Główny workspace firmy",
  },
  {
    id: "loc-branch-waw",
    name: "Oddział Warszawa",
    type: "Oddział",
    parentId: "loc-company",
    code: "WAW",
    description: "Oddział produkcyjno-biurowy",
  },
  {
    id: "loc-building-prod",
    name: "Budynek produkcyjny",
    type: "Budynek",
    parentId: "loc-branch-waw",
    code: "BLD-P",
    description: "Produkcja i utrzymanie ruchu",
  },
  {
    id: "loc-hall-a",
    name: "Hala A",
    type: "Hala",
    parentId: "loc-building-prod",
    code: "H-A",
    description: "Główna hala obróbki CNC",
  },
  {
    id: "loc-station-cnc04",
    name: "Stanowisko CNC-04",
    type: "Stanowisko",
    parentId: "loc-hall-a",
    code: "CNC-04",
    description: "Stanowisko frezarki CNC-04",
  },
  {
    id: "loc-hall-b",
    name: "Hala B",
    type: "Hala",
    parentId: "loc-building-prod",
    code: "H-B",
    description: "Hala maszyn konwencjonalnych",
  },
  {
    id: "loc-service",
    name: "Serwis",
    type: "Hala",
    parentId: "loc-building-prod",
    code: "SRV",
    description: "Strefa serwisowa",
  },
  {
    id: "loc-service-cabinet",
    name: "Szafka serwisowa 02",
    type: "Szafka",
    parentId: "loc-service",
    code: "SRV-S02",
    description: "Narzędzia i urządzenia serwisowe",
  },
  {
    id: "loc-building-office",
    name: "Budynek biurowy",
    type: "Budynek",
    parentId: "loc-branch-waw",
    code: "BLD-O",
    description: "Administracja i biura",
  },
  {
    id: "loc-office-101",
    name: "Biuro 101",
    type: "Biuro",
    parentId: "loc-building-office",
    code: "OFF-101",
    description: "Biuro zespołu operacyjnego",
  },
  {
    id: "loc-warehouse",
    name: "Magazyn główny",
    type: "Magazyn",
    parentId: "loc-branch-waw",
    code: "WHS",
    description: "Centralny magazyn części i urządzeń",
  },
  {
    id: "loc-rack-a03",
    name: "Regał A-03",
    type: "Regał",
    parentId: "loc-warehouse",
    code: "R-A03",
    description: "Elektronika i skanery",
  },
  {
    id: "loc-fleet",
    name: "Plac floty",
    type: "Stanowisko",
    parentId: "loc-branch-waw",
    code: "FLT",
    description: "Miejsce postoju pojazdów",
  },
];

export function getLocationPath(locationId: string, locations: LocationNode[] = initialLocations) {
  const path: LocationNode[] = [];
  let current = locations.find((location) => location.id === locationId);
  const visited = new Set<string>();

  while (current && !visited.has(current.id)) {
    path.unshift(current);
    visited.add(current.id);
    current = current.parentId
      ? locations.find((location) => location.id === current?.parentId)
      : undefined;
  }

  return path;
}

export function getLocationPathLabel(
  locationId: string,
  locations: LocationNode[] = initialLocations,
) {
  return getLocationPath(locationId, locations)
    .map((location) => location.name)
    .join(" → ");
}

export function getDescendantIds(locationId: string, locations: LocationNode[] = initialLocations) {
  const ids = new Set([locationId]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const location of locations) {
      if (location.parentId && ids.has(location.parentId) && !ids.has(location.id)) {
        ids.add(location.id);
        changed = true;
      }
    }
  }
  return ids;
}

export const locationOptions = initialLocations.filter((location) => location.type !== "Firma");
