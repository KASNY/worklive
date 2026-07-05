# Baza danych

Docelowa baza relacyjna to PostgreSQL, obsługiwana przez Prisma. Szczegółowy schemat powstanie przed implementacją modułów.

## Encje rdzeniowe

`users`, `workspaces`, `memberships`, `invitations`, `employees`, `locations`, `assets`, `projects`, `documents`, `document_links`, `tasks`, `tickets`, `warranties`, `qr_tokens`, `audit_events`, `backup_runs`.

## Reguły

- globalnie unikalne identyfikatory bez danych biznesowych;
- `workspace_id` w każdej encji biznesowej;
- relacje nie mogą przekraczać granicy workspace;
- czas zapisujemy w UTC;
- standardowe pola utworzenia, aktualizacji i autora;
- domyślne usunięcie to archiwizacja;
- audyt jest dopisywany, nie edytowany;
- hasła, tokeny i sekrety nie trafiają do zdarzeń audytowych.

Redis służy wyłącznie do udokumentowanych danych nietrwałych, np. cache lub ograniczania ruchu; PostgreSQL pozostaje źródłem prawdy.
