# Development

Projekt używa Node.js 24, pnpm 11 i monorepo z `apps/*` oraz `packages/*`. Współdzielone konfiguracje należą do `packages/config`, typy do `packages/types`, narzędzia do `packages/utils`, a design system do `packages/ui`.

## Definition of Ready

Funkcja może wejść do developmentu dopiero, gdy:

1. ma opis w dokumentacji;
2. należy do zatwierdzonego modułu i zakresu etapu;
3. ma opisane ekrany, akcje, dane, uprawnienia, workflow, stany puste i błędy;
4. ma oddzielony zakres MVP od przyszłego rozwoju;
5. decyzje otwarte nie blokują implementowanego zakresu;
6. wpływ na bazę, API, bezpieczeństwo, backup i design system został opisany;
7. istotna decyzja architektoniczna ma zaakceptowany ADR.

Brak któregokolwiek wymaganego elementu oznacza powrót do dokumentacji, nie zgodę na uzupełnienie założeń w kodzie.

## Przepływ pracy

1. Utwórz lub zaktualizuj specyfikację modułu z `docs/templates/MODULE_TEMPLATE.md`.
2. Zaktualizuj dokumenty przekrojowe i changelog, jeśli zmiana ich dotyczy.
3. Zatwierdź zakres oraz wymagane ADR.
4. Implementuj wyłącznie zatwierdzony zakres.
5. Używaj komponentów i tokenów z `packages/ui`.
6. Uruchom testy, lint, formatowanie, typecheck i build.
7. Jeśli podczas pracy pojawi się nowa decyzja, przerwij dany fragment i najpierw zaktualizuj docs.

## Granice monorepo

- aplikacje składają zatwierdzone moduły i nie duplikują współdzielonych kontraktów;
- komponenty wielokrotnego użytku i design tokens należą do `packages/ui`;
- lokalny komponent UI wymaga wcześniejszej, jawnej decyzji w dokumentacji;
- aplikacja nie może importować kodu wewnętrznego innej aplikacji;
- pakiety nie mogą zależeć od aplikacji;
- nazwy domenowe w kodzie muszą odpowiadać dokumentacji.

## Narzędzia docelowe

Next.js i React dla webu, NestJS dla API, Expo dla mobile, Electron lub Tauri dla desktopu oraz Prisma i PostgreSQL dla danych. TanStack Query obsługuje stan serwerowy, React Hook Form formularze, a Zod kontrakty walidacji. Warianty nierozstrzygnięte wymagają ADR.

## Stan aplikacji workspace

Etap 1 używa Next.js 16, React 19, Tailwind CSS 4, next-themes i Lucide. `apps/workspace` ma działające polecenia `dev`, `build`, `start`, `lint` i `typecheck`. Frontend korzysta z `@worklive/ui`; nie zawiera backendu, bazy danych ani prawdziwej autoryzacji.

## Komendy repozytorium

- `pnpm dev` — uruchamia dostępne skrypty developerskie pakietów;
- `pnpm build` — sprawdza build workspace;
- `pnpm lint` — uruchamia ESLint;
- `pnpm format` / `pnpm format:check` — zapisuje lub sprawdza Prettier;
- `pnpm typecheck` — sprawdza TypeScript bez emisji;
- `pnpm clean` — usuwa wygenerowane artefakty.

CI instaluje zamrożony lockfile i uruchamia kontrolę formatowania, lint, typecheck oraz build. Husky i lint-staged zabezpieczają staged pliki lokalnie.
