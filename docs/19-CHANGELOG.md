# Changelog dokumentacji

## [Unreleased]

Najpierw aktualizujemy ten changelog i właściwe dokumenty, potem kod.

### Dodano

- konfigurację pnpm workspace i manifesty wszystkich aplikacji oraz pakietów;
- wspólny TypeScript, ESLint, Prettier i EditorConfig;
- Husky z lint-staged oraz pipeline jakości GitHub Actions;
- katalog marki i dystrybucję ikon do klientów webowych;
- kompletny kontrakt UX pierwszego MVP od zakupu do pierwszego zasobu;
- specyfikacje UX Login, Onboarding, Workspace, Dashboard, Sidebar i Assets;
- działający frontend `apps/workspace` z trasami Splash, Login i Dashboard;
- współdzielone komponenty bazowe w `packages/ui`;
- responsywny sidebar, jasny/ciemny motyw oraz mockowane sekcje dashboardu;
- frontend Assets MVP z pełnym zestawem mocków, filtrami, szczegółami i lokalnymi akcjami zarządzania;
- obowiązkowy kontrakt `BrandLogo` z wariantami dla jasnego i ciemnego tła bez modyfikacji SVG;
- osobne warianty visual hero logowania dla light i dark mode;
- ujednolicony layout motywów, tokeny light, płynne przejście 240 ms i zasady favicon;
- dekoracyjny preview realnego workspace i kontrakt animacji wejścia loginu;
- kontrakty UX Sprintu 3 dla Locations, ręcznego lookupu QR i dokładnych lokalizacji Assets;
- kontrakty UX Sprintu 4 dla Documents, powiązań dokumentów z Assets i statusów Warranty;
- kontrakty UX Sprintu 5 dla Tickets, People, Departments oraz zgłoszeń powiązanych z Assets;

### Zmieniono

- wycofano radial reveal i przywrócono proste przełączanie light/dark z transition 240 ms;

## [0.2.0] — 2026-07-05

### Dodano

- pełny, numerowany fundament dokumentacji;
- zakres platform, modułów i pakietów monorepo;
- ogólne przepływy logowania, zaproszeń, zasobów, QR, dokumentów i backupów;
- role oraz izolację workspace;
- stack docelowy i miejsca wymagające ADR;
- brandowe kolory i zasady jasnego oraz ciemnego motywu;
- nadrzędną regułę „dokumentacja najpierw, kod później”.

### Zmieniono

- zastąpiono wcześniejsze nienumerowane dokumenty jednym uporządkowanym źródłem prawdy.
