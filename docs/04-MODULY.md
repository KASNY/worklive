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
3. **Assets** — ewidencja zasobów firmy. Frontend MVP Sprintu 3 działa na danych mockowanych, korzysta ze wspólnego drzewa lokalizacji i kodów QR; persystencja oraz API nie są wdrożone.
4. **QR** — frontendowe podstawy identyfikacji zasobów: generowany kod w szczegółach, Copy code, placeholder Download QR i ręczny lookup na `/scan`. Skanowanie aparatem i resolver backendowy nie należą do Sprintu 3.
5. **Locations** — mockowane drzewo firma → oddział → budynek → hala/biuro/magazyn → regał/szafka/stanowisko, zarządzanie w `/locations`, szczegóły i lista przypisanych assets.
6. **Documents** — frontend MVP Sprintu 4 na danych mockowanych: lista i filtrowanie, mock upload, sheet szczegółów oraz powiązanie dokumentu z Asset.
7. **Warranty** — frontend MVP Sprintu 4 jako część Assets i Documents: data końca, status wyliczany z daty, powiązana faktura oraz lista gwarancji kończących się w ciągu 90 dni.
8. **People** — frontend basics Sprintu 5: lista pracowników, dane organizacyjne, filtry działu i roli oraz Sheet szczegółów.
9. **Departments** — frontend basics Sprintu 5: sześć działów firmy, członkowie, kierownik oraz mockowane dodawanie i usuwanie osób.
10. **Tasks** — praca do wykonania, odpowiedzialność, status i termin.
11. **Tickets** — frontend MVP Sprintu 5: zgłoszenia do działu lub osoby, priorytety i statusy, komentarze, activity timeline, załączniki oraz opcjonalne powiązanie z Asset.
12. **Projects** — grupowanie pracy i rekordów wokół przedsięwzięć.
13. **Calendar** — prezentacja udokumentowanych zdarzeń i terminów w czasie.
14. **Reports** — zestawienia oparte wyłącznie na zatwierdzonych danych i metrykach.
15. **Inventory** — frontend MVP Sprintu 7: stany magazynowe, przyjęcia, wydania, przesunięcia, rezerwacje, korekty, inwentaryzacja, historia ruchów, QR i powiązania z Assets/Tickets na danych mockowanych.

Kolejność nie stanowi kompletnej specyfikacji modułów ani zgody na równoległą implementację. Rozpoczęcie kolejnego etapu wymaga zatwierdzenia zależności i dokumentu modułu. Szczegółowe pola, statusy, ekrany, raporty, zdarzenia kalendarza i workflow pozostają niezatwierdzone do czasu utworzenia odpowiednich specyfikacji.

## Funkcje przekrojowe

Historia zmian, bezpieczeństwo, backupy, wyszukiwanie, filtrowanie, sortowanie i paginacja są zdolnościami przekrojowymi. Każdy moduł musi wskazać, które z nich wykorzystuje i w jaki sposób. Nie są one pretekstem do dodawania zachowań nieopisanych w specyfikacji modułu.
