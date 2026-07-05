# WorkLive

WorkLive to planowana platforma SaaS dla firm produkcyjnych, serwisowych i magazynowych. Repozytorium jest monorepo dla strony marketingowej, panelu firmowego, API oraz klientów mobilnego i desktopowego.

> **Dokumentacja najpierw, kod później.** Funkcja może zostać zaimplementowana dopiero po opisaniu i zatwierdzeniu w `docs/`.

## Status

Projekt znajduje się w fazie fundamentu dokumentacyjnego. Nie zawiera działającej aplikacji ani logiki biznesowej.

## Struktura

- `apps/website` — strona marketingowa;
- `apps/workspace` — panel firmy po zalogowaniu;
- `apps/api` — backend API;
- `apps/mobile` — klient mobilny;
- `apps/desktop` — klient desktopowy;
- `packages/ui` — współdzielony interfejs;
- `packages/config` — współdzielone konfiguracje;
- `packages/types` — współdzielone typy kontraktów;
- `packages/utils` — ogólne, niezależne narzędzia;
- `docs` — główne źródło prawdy;
- `scripts`, `docker`, `.github` — automatyzacja, infrastruktura lokalna i CI/CD.

## Dokumentacja

Czytanie należy zacząć od [zasad projektu](./docs/21-ZASADY-PROJEKTU.md), [wizji](./docs/00-WIZJA.md) i [produktu](./docs/02-PRODUKT.md). Decyzje nieustalone są oznaczone jako „do decyzji” i nie mogą być samodzielnie rozstrzygane w kodzie.

## Technologia docelowa

Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, NestJS, Prisma, PostgreSQL, Redis, MinIO lub Cloudflare R2, Stripe, Docker, GitHub Actions, Expo oraz Electron lub Tauri. Warianty oznaczone „lub” wymagają ADR przed implementacją.

## Narzędzia repozytorium

Wymagane są Node.js 24 i pnpm 11. Po `pnpm install` dostępne są komendy `dev`, `build`, `lint`, `format`, `format:check`, `typecheck` i `clean`. Na obecnym etapie workspace zawierają wyłącznie manifesty i konfiguracje — bez kodu aplikacji.
