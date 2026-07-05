# Moduły WorkLive

## Charakter platformy

WorkLive jest modularną platformą workspace dla firm produkcyjnych, serwisowych i magazynowych. Workspace stanowi wspólny kontekst organizacji, danych, użytkowników i uprawnień, a moduły biznesowe rozszerzają go etapami. Moduł nie może działać poza granicą workspace ani tworzyć własnego, niespójnego modelu użytkowników, uprawnień lub interfejsu.

## Dokumentacja przed implementacją

Każda funkcja musi mieć opis w `docs/` przed rozpoczęciem implementacji. Sam wpis na roadmapie lub nazwa modułu nie jest wystarczającą specyfikacją.

Przed implementacją każdy moduł biznesowy musi mieć osobny dokument przygotowany na podstawie `docs/templates/MODULE_TEMPLATE.md`. Dokument musi opisywać co najmniej:

- cel modułu;
- użytkowników;
- główne ekrany i akcje;
- dane oraz relacje;
- uprawnienia;
- workflow i stany rekordów;
- stany puste;
- błędy i sposób ich prezentacji;
- zakres MVP oraz przyszły rozwój.

Jeśli którakolwiek z tych części jest nieopisana albo oznaczona jako decyzja otwarta blokująca dany zakres, moduł nie jest gotowy do implementacji.

## Kolejność rozwoju modułów

Moduły są dodawane etapami w następującej kolejności:

1. **Workspace** — organizacja, jej ustawienia i granica danych.
2. **Auth** — logowanie, sesje, odzyskiwanie dostępu i zaproszenia.
3. **Assets** — ewidencja zasobów firmy.
4. **QR** — bezpieczny dostęp do udokumentowanych rekordów za pomocą kodu QR.
5. **Locations** — hierarchia lokalizacji i rozmieszczenie zasobów.
6. **Documents** — pliki, metadane i powiązania z rekordami.
7. **Warranty** — gwarancje zasobów oraz dokumenty potwierdzające.
8. **People** — członkostwa i kartoteki pracowników w workspace.
9. **Tasks** — praca do wykonania, odpowiedzialność, status i termin.
10. **Tickets** — zgłoszenia problemów i potrzeb działania.
11. **Projects** — grupowanie pracy i rekordów wokół przedsięwzięć.
12. **Calendar** — prezentacja udokumentowanych zdarzeń i terminów w czasie.
13. **Reports** — zestawienia oparte wyłącznie na zatwierdzonych danych i metrykach.

Kolejność nie stanowi kompletnej specyfikacji modułów ani zgody na równoległą implementację. Rozpoczęcie kolejnego etapu wymaga zatwierdzenia zależności i dokumentu modułu. Szczegółowe pola, statusy, ekrany, raporty, zdarzenia kalendarza i workflow pozostają niezatwierdzone do czasu utworzenia odpowiednich specyfikacji.

## Funkcje przekrojowe

Historia zmian, bezpieczeństwo, backupy, wyszukiwanie, filtrowanie, sortowanie i paginacja są zdolnościami przekrojowymi. Każdy moduł musi wskazać, które z nich wykorzystuje i w jaki sposób. Nie są one pretekstem do dodawania zachowań nieopisanych w specyfikacji modułu.
