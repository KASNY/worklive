# Changelog WorkLive

Wszystkie istotne zmiany repozytorium będą zapisywane w tym pliku. Zmiany samej specyfikacji są dodatkowo opisane w `docs/19-CHANGELOG.md`.

## [Unreleased]

### Added

- fundament monorepo;
- numerowana dokumentacja produktu i architektury;
- pliki konfiguracyjne bez implementacji aplikacji.
- frontend Etapu 1 dla `apps/workspace`: Splash, Login i Dashboard na danych mockowanych;
- pierwsze komponenty design systemu w `packages/ui`;
- Sprint 2 Assets MVP: trasa `/assets`, mockowana tabela i filtry, Empty State, sheet szczegółów oraz lokalne akcje Add/Edit/Delete/Change Location/Assign Person;
- scentralizowany komponent `BrandLogo` renderujący oryginalne SVG bez filtrów CSS;
- jasny wariant visual hero logowania z dopasowanym logo, kartami i formularzem premium;
- wspólny layout light/dark, animowane przełączanie motywu i favicon WorkLive Workspace;
- realistyczny workspace preview oraz subtelne animacje Framer Motion na stronie logowania;
- Sprint 3 Locations + QR foundations: trasy `/locations` i `/scan`, mockowane drzewo lokalizacji, lokalne akcje zarządzania, powiązania Assets oraz generowane kody QR;
- Sprint 4 Documents + Warranty MVP: trasa `/documents`, mock upload, filtry i szczegóły dokumentów, integracja z Assets, statusy gwarancji oraz karta kończących się gwarancji na dashboardzie;
- Sprint 5 Tickets + Departments + People basics: trasy `/tickets`, `/departments` i `/people`, mockowane zgłoszenia i struktura organizacyjna, integracja Tickets z Assets oraz dashboardem;
- Sprint 6 Premium UX Polish: wspólne presety ruchu, animowane drawery, dropdown powiadomień, wejścia i wyjścia Dialog/Sheet, Skeleton oraz obsługa reduced motion;
- Sprint 7 Inventory MVP: trasa `/inventory`, mockowane stany i ruchy magazynowe, sześć operacji, rezerwacje, QR, alerty oraz integracje z Dashboardem i Assets;

### Changed

- przywrócono proste przełączanie motywu z podstawowym transition 240 ms; usunięto radial reveal i overlay;
- poprawiono pozycjonowanie i animacje wyjścia Dialog/Sheet: dialog jest wycentrowany przed pierwszą klatką, a powierzchnie pozostają zamontowane do końca fade, scale lub slide-out;
- Sprint 6.1 UX fixes: ujednolicono pozycjonowanie i animacje Dialog/Sheet oraz wyeliminowano skok dialogu od triggera;
- naprawiono krytyczną blokadę interakcji po Sprint 7: zamknięte Dialog/Sheet usuwają overlay, focus trap i scroll lock z DOM; dodano scrollbar WorkLive dla light/dark;
