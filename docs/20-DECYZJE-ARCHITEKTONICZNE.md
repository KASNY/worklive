# Decyzje architektoniczne

ADR dokumentuje ważną, trudną do odwrócenia decyzję: kontekst, warianty, wybór i konsekwencje. Statusy to: proponowana, zaakceptowana, odrzucona lub zastąpiona. Propozycja nie jest zgodą na implementację.

## Rejestr

| ADR     | Temat                                        | Status           |
| ------- | -------------------------------------------- | ---------------- |
| ADR-001 | Monorepo pnpm z `apps/*` i `packages/*`      | zaakceptowana    |
| ADR-002 | TypeScript jako wspólny język aplikacji      | zaakceptowana    |
| ADR-003 | MinIO czy Cloudflare R2                      | do przygotowania |
| ADR-004 | Electron czy Tauri                           | do przygotowania |
| ADR-005 | Styl i wersjonowanie API                     | do przygotowania |
| ADR-006 | Mechanizm sesji i algorytm haseł             | do przygotowania |
| ADR-007 | Wspólny tooling repozytorium                 | zaakceptowana    |
| ADR-008 | `packages/ui` jako obowiązkowy design system | zaakceptowana    |
| ADR-009 | Modułowy rozwój sterowany dokumentacją       | zaakceptowana    |

## ADR-001 — monorepo pnpm

Kontekst: pięć aplikacji korzysta ze wspólnych komponentów, typów i konfiguracji. Decyzja: pnpm workspaces z rozdzieleniem `apps` i `packages`. Konsekwencja: współdzielenie jest jawne, aplikacje nie zależą od siebie, a pakiety nie zależą od aplikacji.

## ADR-002 — TypeScript

TypeScript jest wspólnym językiem aplikacji webowych, API i pakietów. Nie przesądza to konfiguracji poszczególnych runtime'ów.

## ADR-007 — wspólny tooling repozytorium

Node.js 24, pnpm 11, TypeScript, ESLint flat config, Prettier, EditorConfig, Husky i lint-staged tworzą wspólną warstwę jakości. GitHub Actions uruchamia kontrolę formatowania, lint, typecheck i build. Konfiguracja nie inicjalizuje frameworków ani logiki aplikacji.

## ADR-008 — obowiązkowy design system

Kontekst: WorkLive jest dostarczany przez kilka aplikacji i musi zachować spójność wizualną, dostępność oraz zachowanie interakcji.

Decyzja: `packages/ui` jest obowiązkowym źródłem współdzielonych komponentów, tokenów i wzorców dla wszystkich aplikacji renderujących UI. Przypadkowe komponenty lokalne są zabronione. Wyjątek wymaga wcześniejszej decyzji w dokumentacji modułu z uzasadnieniem, właścicielem i granicą odpowiedzialności.

Konsekwencja: różnice platformowe są obsługiwane przez udokumentowane warianty lub adaptery design systemu, a nie przez kopiowanie komponentów.

## ADR-009 — rozwój modułowy sterowany dokumentacją

Kontekst: platforma rozwija wiele powiązanych domen w ramach jednego workspace.

Decyzja: moduły są dodawane etapami w kolejności z `04-MODULY.md`. Każdy moduł przed implementacją ma specyfikację utworzoną z `docs/templates/MODULE_TEMPLATE.md`, obejmującą cel, odbiorców, ekrany, dane, uprawnienia, workflow, stany puste, błędy, MVP i dalszy rozwój.

Konsekwencja: nazwa na roadmapie nie jest zgodą na kod. Brak kompletnej specyfikacji blokuje development danego zakresu.
