# Decyzje architektoniczne

ADR dokumentuje ważną, trudną do odwrócenia decyzję: kontekst, rozważane warianty, wybór i konsekwencje. Decyzje otrzymują kolejny numer i status: proponowana, zaakceptowana, odrzucona lub zastąpiona.

## Rejestr

| ADR     | Temat                                   | Status           |
| ------- | --------------------------------------- | ---------------- |
| ADR-001 | Monorepo pnpm z `apps/*` i `packages/*` | zaakceptowana    |
| ADR-002 | TypeScript jako wspólny język aplikacji | zaakceptowana    |
| ADR-003 | MinIO czy Cloudflare R2                 | do przygotowania |
| ADR-004 | Electron czy Tauri                      | do przygotowania |
| ADR-005 | Styl i wersjonowanie API                | do przygotowania |
| ADR-006 | Mechanizm sesji i algorytm haseł        | do przygotowania |
| ADR-007 | Wspólny tooling repozytorium            | zaakceptowana    |

## ADR-001 — monorepo pnpm

Kontekst: pięć aplikacji korzysta ze wspólnych komponentów, typów i konfiguracji. Decyzja: pnpm workspaces z rozdzieleniem `apps` i `packages`. Konsekwencja: współdzielenie jest jawne, a zależności pakietów muszą pozostać kierunkowe.

## ADR-002 — TypeScript

Decyzja: TypeScript jest wspólnym językiem aplikacji webowych, API i pakietów. Nie przesądza to konfiguracji poszczególnych runtime'ów.

## ADR-007 — wspólny tooling repozytorium

Decyzja: Node.js 24, pnpm 11, TypeScript, ESLint flat config, Prettier, EditorConfig, Husky i lint-staged tworzą wspólną warstwę jakości. GitHub Actions uruchamia lint, sprawdzenie formatowania, typecheck i build na pull requestach oraz zmianach głównej gałęzi. Konfiguracja nie inicjalizuje frameworków ani kodu aplikacji.
