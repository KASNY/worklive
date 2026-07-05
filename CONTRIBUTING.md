# Współpraca przy WorkLive

## Najważniejsza reguła

Najpierw zmień dokumentację, następnie kod. Pull request z nową funkcją bez wcześniejszego opisu w `docs/` nie powinien zostać scalony.

## Przebieg zmiany

1. Znajdź dokument będący źródłem prawdy dla zmiany.
2. Opisz zakres, zachowanie, dane, uprawnienia i wpływ na bezpieczeństwo.
3. Dla ważnej decyzji technicznej dodaj wpis w `20-DECYZJE-ARCHITEKTONICZNE.md`.
4. Zaktualizuj changelog dokumentacji.
5. Dopiero po akceptacji dokumentów rozpocznij implementację i testy.

Nie dodawaj funkcji „przy okazji”. Nie zatwierdzaj założeń oznaczonych jako „do decyzji” bez osobnej decyzji.

## Standard

Docelowe zasady gałęzi, commitów, przeglądów i testów opisuje `docs/17-DEVELOPMENT.md`, a reguły kodu `docs/18-STANDARD-KODU.md`.
