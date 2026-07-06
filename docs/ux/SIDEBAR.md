# Sidebar — UX

> Status: frontend demonstracyjny Etapu 1 wdrożony

## Stan implementacji

Sidebar działa w wariancie stałym na szerokim ekranie i jako panel modalny na mniejszych ekranach. Pokazuje mockowany workspace NovaTech oraz pozycje Dashboard, Zasoby, Zadania, Projekty, Kalendarz, Zespół i Ustawienia. Poza Dashboardem są to na razie nieaktywne elementy demonstracyjne bez tras modułów.

## Cel i użytkownicy

Sidebar zapewnia stałą orientację w aplikacji, pokazuje aktywny workspace i udostępnia wyłącznie moduły oraz akcje dostępne użytkownikowi.

## Sekcje

### Marka i workspace

- znak WorkLive;
- nazwa aktywnego workspace;
- przełącznik workspace tylko przy wielu członkostwach.

### Nawigacja główna

- Dashboard;
- Assets.

Etap 1 pokazuje także Zadania, Projekty i Kalendarz jako elementy makiety dashboardu. Przed produkcją pozycja może prowadzić do ekranu wyłącznie po wdrożeniu i aktywacji modułu zgodnie z rolą. QR, Locations, Documents, Warranty, People, Tickets i Reports nie są prezentowane.

### Administracja

- Członkowie;
- Ustawienia workspace.

Sekcja lub jej akcje są ukryte, jeżeli rola nie ma odpowiednich uprawnień.

### Użytkownik

- imię i nazwisko;
- rola w aktywnym workspace;
- profil;
- wylogowanie.

## Akcje użytkownika

- przejście do ekranu;
- przełączenie workspace;
- zwinięcie i rozwinięcie sidebara na szerokim ekranie;
- otwarcie lub zamknięcie sidebara na małym ekranie;
- otwarcie menu użytkownika;
- wylogowanie.

## Dane

- aktywny workspace i lista dostępnych workspace;
- aktywna trasa;
- moduły dostępne w danym wdrożeniu;
- uprawnienia nawigacyjne;
- dane bieżącego użytkownika i jego rola.

## Stany i błędy

- stan zwinięty zachowuje dostępne etykiety dla ikon;
- focus po zamknięciu mobilnego panelu wraca do przycisku otwierającego;
- niedostępna trasa nie pozostaje aktywna po zmianie workspace;
- błąd przełączenia zachowuje poprzedni workspace i wyjaśnia problem;
- brak dostępu usuwa pozycję z nawigacji, ale API nadal niezależnie egzekwuje uprawnienia.

## Przyszłe rozszerzenia

Ulubione, przypinanie modułów, zmiana kolejności, globalne wyszukiwanie i nawigacja zależna od zespołu. Nie należą do MVP.
