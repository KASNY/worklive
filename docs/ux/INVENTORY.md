# Inventory — UX

> Status: frontend MVP Sprintu 7 na danych mockowanych

## Cel modułu

Inventory prowadzi operacyjną ewidencję produktów magazynowych, bieżących ilości, rezerwacji i historii ruchów. Moduł nie zastępuje Assets: produkt magazynowy jest pozycją ilościową, a Asset konkretnym identyfikowalnym zasobem firmy.

## Użytkownicy

Magazynier i Kierownik wykonują operacje magazynowe. Administrator przegląda i koryguje dane. Pracownik może przeglądać dostępność zgodnie z przyszłymi uprawnieniami. Sprint 7 nie egzekwuje ról.

## Ekran `/inventory`

Ekran zawiera nagłówek i sześć akcji operacyjnych, widgety stanów, alert niskiego stanu, wyszukiwarkę, filtry lokalizacji, statusu, kategorii i działu oraz tabelę. Kolumny: nazwa, kod, SKU, QR, lokalizacja, ilość, jednostka, minimalny stan, status, ostatni ruch i akcje.

## Dane

Produkt zawiera `id`, nazwę, kod, SKU, kod QR, opis, kategorię, dział, lokalizację, ilość, jednostkę, minimalny stan, status bazowy i datę ostatniego ruchu. Status `Niski stan` ma pierwszeństwo, gdy ilość jest większa od zera i nie przekracza minimum; zero oznacza `Brak`. Rezerwacja i dostawa mogą ustawić odpowiednio `Zarezerwowany` lub `W drodze`.

## Operacje i workflow

- Przyjęcie zwiększa ilość i zapisuje dostawcę, dokument oraz uwagę.
- Wydanie zmniejsza ilość, nie pozwala wydać więcej niż dostępny stan i może wskazać odbiorcę, dział, projekt, Ticket, Asset, QR oraz uwagę.
- Przesunięcie zmienia lokalizację produktu i zapisuje lokalizację źródłową oraz docelową.
- Rezerwacja zapisuje ilość dla projektu, Ticketu lub osoby i ustawia status rezerwacji bez fizycznego wydania.
- Korekta ustawia nową ilość z obowiązkowym opisem przyczyny.
- Inwentaryzacja zapisuje ilość policzoną i różnicę względem stanu systemowego.

Każda operacja otwiera Dialog i dopisuje ruch: aktor, czas, typ, ilość, lokalizacja i opis. Wszystkie zmiany istnieją tylko w stanie bieżącej strony.

## Szczegóły

Sheet produktu pokazuje opis, lokalizację, minimum, QR z akcjami kopiowania i mockowanego pobierania, pełną historię, osobne zestawienie przyjęć i wydań oraz powiązane Assets, projekty i Tickets.

## Integracje

Dashboard pokazuje widget Magazyn z liczbą niskich stanów, nowych przyjęć i dzisiejszych wydań. Asset Details pokazuje zużyte produkty i historię wymian wynikającą z wydań powiązanych z Asset.

## Stany puste i błędy

Brak produktów lub wyników filtrów używa `EmptyState` z `packages/ui`. Formularz blokuje niepoprawną ilość oraz wydanie ponad stan. Operacja bez wymaganego produktu, lokalizacji albo uzasadnienia nie może zostać zapisana.

## MVP i przyszły rozwój

MVP obejmuje mocki, lokalne operacje, historię, QR, alerty i relacje demonstracyjne. Backend, trwałe stany, partie, numery seryjne, ceny, dostawcy jako encje, wiele magazynów, zatwierdzanie dokumentów, anulowanie ruchów, skanowanie aparatem i uprawnienia wymagają kolejnej dokumentacji.
