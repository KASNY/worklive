# Zasady projektu WorkLive

## Reguła nadrzędna

> **DOKUMENTACJA NAJPIERW, KOD PÓŹNIEJ.**

`docs/` jest głównym źródłem prawdy. Każda funkcja musi mieć opis w dokumentacji przed implementacją. Dotyczy to także zmian ekranów, danych, API, uprawnień, komponentów, integracji i zachowania błędów.

## WorkLive jako platforma

WorkLive jest modularną platformą workspace dla firm. Workspace zapewnia wspólną granicę organizacji, danych i dostępu. Moduły są rozwijane etapami i muszą korzystać ze wspólnych zasad bezpieczeństwa, danych oraz interfejsu.

## Reguły obowiązkowe

1. Nie wymyślamy funkcji w kodzie.
2. Brak opisu oznacza brak zgody na implementację.
3. Każdy moduł biznesowy opisuje: cel, użytkowników, ekrany, dane, uprawnienia, workflow, stany puste, błędy i przyszły rozwój.
4. Specyfikację modułu tworzymy z `docs/templates/MODULE_TEMPLATE.md`.
5. Sprzeczność rozstrzygamy najpierw w dokumentacji.
6. Zmiana funkcji aktualizuje wszystkie dotknięte kontrakty i changelog.
7. Decyzja trudna do odwrócenia wymaga zaakceptowanego ADR.
8. Wartość „do decyzji” blokuje zależną od niej implementację.
9. Kod nie może rozszerzać modelu danych, API, ekranów ani uprawnień poza zatwierdzony kontrakt.
10. `packages/ui` jest obowiązkowym design systemem dla wszystkich aplikacji z interfejsem.
11. Nie tworzymy przypadkowych komponentów poza `packages/ui`; wyjątek wymaga wcześniejszej decyzji w docs.
12. Dokumentacja jawnie rozróżnia zakres planowany, MVP, V2 i stan wdrożony.
13. Moduł nie może naruszać izolacji workspace ani tworzyć alternatywnego źródła prawdy.
14. Implementacja nie może służyć do „odkrywania” wymagań, które powinny zostać najpierw opisane.

## Gotowość modułu

Moduł jest gotowy do developmentu dopiero po wypełnieniu wszystkich wymaganych sekcji szablonu, zamknięciu decyzji blokujących i zatwierdzeniu wpływu na bazę, uprawnienia, bezpieczeństwo, UI oraz pozostałe moduły.

## Pierwszeństwo źródeł

W razie rozbieżności obowiązują kolejno:

1. ten dokument;
2. zaakceptowane ADR;
3. dokument domenowy lub specyfikacja modułu o najwęższym zakresie;
4. pozostała dokumentacja projektu;
5. README;
6. kod.

Rozbieżność musi zostać naprawiona w źródle prawdy, a nie utrwalona przez implementację.
