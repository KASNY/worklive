# Locations — UX

> Status: frontend Sprintu 3 na danych mockowanych

## Cel i użytkownicy

Locations porządkuje fizyczne rozmieszczenie zasobów w workspace. Właściciel, Administrator i Kierownik zarządzają drzewem; pozostali użytkownicy przeglądają lokalizacje zgodnie z przyszłymi uprawnieniami.

## Ekran `/locations`

Ekran zawiera nagłówek, akcję Add Location, hierarchiczne drzewo, liczniki assets oraz sheet szczegółów. Hierarchia wspiera poziomy: firma, oddział, budynek, hala, biuro, magazyn, regał, szafka i stanowisko. Szczegóły pokazują kod, poziom, pełną ścieżkę, opis oraz assets przypisane do wybranego węzła lub jego potomków.

## Akcje i dane

Add child tworzy węzeł pod wybraną lokalizacją. Edit zmienia nazwę, typ, kod, rodzica i opis; węzła nie można przenieść pod własnego potomka. Delete wymaga potwierdzenia i usuwa lokalną gałąź mocka, ale jest blokowany, dopóki gałąź zawiera przypisane zasoby. Wszystkie zmiany resetują się po odświeżeniu. Model węzła zawiera `id`, `name`, `type`, `parentId`, `code` i `description`.

## Stany i przyszły rozwój

Brak przypisanych assets ma jawny Empty State. Usunięcie firmy głównej jest zablokowane. Backend ma później zapewnić integralność relacji, uprawnienia, audyt, walidację dozwolonych rodziców, przenoszenie gałęzi i bezpieczne reguły usuwania.
