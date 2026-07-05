# Standard kodu

Dokument obowiązuje po rozpoczęciu implementacji.

## Zasady

- TypeScript w trybie ścisłym;
- brak `any` bez uzasadnienia;
- walidacja danych na granicach systemu;
- jawne kontrakty między aplikacjami i API;
- małe moduły o pojedynczej odpowiedzialności;
- nazwy domenowe zgodne z dokumentacją;
- brak sekretów, danych klientów i logów debug w repo;
- dostęp do danych zawsze w kontekście workspace;
- zmiana zachowania wymaga testu;
- komentarze wyjaśniają „dlaczego”, nie przepisują kodu.

Wspólne typy należą do `packages/types`, UI do `packages/ui`, konfiguracje do `packages/config`, a do `packages/utils` trafiają tylko niezależne funkcje ogólne.

## Narzędzia jakości

- ESLint używa flat config oraz reguł zalecanych dla JavaScript i TypeScript;
- Prettier jest jedynym narzędziem formatującym i nie konkuruje z ESLint;
- EditorConfig ustala UTF-8, LF, końcową nową linię oraz dwuspacjowe wcięcia;
- lint-staged formatuje obsługiwane staged pliki i naprawia ESLintem staged JavaScript/TypeScript;
- TypeScript dziedziczy ścisłą konfigurację z `packages/config/typescript`.

Reguły frameworkowe zostaną dodane razem z udokumentowaną inicjalizacją poszczególnych aplikacji.
