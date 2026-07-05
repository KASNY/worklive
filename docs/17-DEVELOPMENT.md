# Development

Projekt używa pnpm 11 oraz Node.js 24. Kod docelowo będzie organizowany w `apps/*` i `packages/*`, bez kopiowania współdzielonych kontraktów. Każdy workspace ma prywatny manifest i korzysta ze wspólnych konfiguracji z `packages/config`.

## Przepływ pracy

1. Aktualizacja dokumentacji i changelogu.
2. Akceptacja zakresu oraz ewentualnego ADR.
3. Mała gałąź i implementacja zgodna z opisem.
4. Testy, lint, typowanie i przegląd.
5. Aktualizacja dokumentacji, jeśli implementacja ujawniła nową decyzję.

## Narzędzia docelowe

Next.js/React dla webu, NestJS dla API, Expo dla mobile, Electron lub Tauri dla desktopu, Prisma/PostgreSQL dla danych. TanStack Query obsługuje stan serwerowy, React Hook Form formularze, a Zod kontrakty walidacji.

## Komendy repozytorium

- `pnpm dev` — uruchamia skrypty developerskie pakietów równolegle;
- `pnpm build` — buduje wszystkie pakiety w kolejności zależności;
- `pnpm lint` — uruchamia ESLint;
- `pnpm format` / `pnpm format:check` — zapisuje lub sprawdza format Prettier;
- `pnpm typecheck` — sprawdza TypeScript bez emisji plików;
- `pnpm clean` — usuwa wyłącznie wygenerowane katalogi projektu.

Instalacja uruchamia `husky`, a hook pre-commit przekazuje staged pliki do `lint-staged`. CI wykonuje instalację z zamrożonym lockfile, lint, kontrolę formatowania, typecheck i build.

Strategia gałęzi i narzędzia testowe zostaną ustalone przed inicjalizacją kodu aplikacji.
