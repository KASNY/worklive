# Zasady projektu WorkLive

## Reguła nadrzędna

> **DOKUMENTACJA NAJPIERW, KOD PÓŹNIEJ.**

`docs/` jest głównym źródłem prawdy. Każda funkcja, encja, uprawnienie, integracja i istotna decyzja techniczna musi zostać opisana przed implementacją.

## Reguły obowiązkowe

1. Nie wymyślamy funkcji w kodzie.
2. Brak opisu oznacza brak zgody na implementację.
3. Sprzeczność rozstrzygamy najpierw w dokumentacji.
4. Zmiana funkcji aktualizuje co najmniej zakres, dane, role, bezpieczeństwo i changelog, jeśli są dotknięte.
5. Decyzja trudna do odwrócenia wymaga ADR.
6. Wartość oznaczona „do decyzji” blokuje odpowiadającą jej implementację.
7. Kod nie może rozszerzać API, modelu danych ani uprawnień poza zatwierdzony kontrakt.
8. Dokumentacja opisuje stan planowany i jawnie odróżnia go od stanu wdrożonego.

## Pierwszeństwo

W razie rozbieżności obowiązują kolejno: ten dokument, zaakceptowane ADR, dokument domenowy o najwęższym zakresie, README, a dopiero potem kod. Rozbieżność musi zostać naprawiona, nie utrwalona.
