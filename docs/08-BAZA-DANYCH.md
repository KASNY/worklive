# Baza danych

Docelową relacyjną bazą danych jest PostgreSQL obsługiwany przez Prisma. PostgreSQL pozostaje źródłem prawdy dla trwałych danych biznesowych. Redis może przechowywać wyłącznie udokumentowane dane nietrwałe, takie jak cache lub dane ograniczania ruchu.

## Dokumentacja modelu

Model danych powstaje modułowo. Każda encja, pole, relacja, ograniczenie, indeks, status i reguła retencji musi zostać opisana w dokumentacji modułu przed utworzeniem schematu lub migracji. Nazwa modułu w `04-MODULY.md` nie upoważnia do samodzielnego zaprojektowania jego tabel.

Dokument modułu musi określić:

- dane wejściowe i przechowywane;
- pola wymagane, opcjonalne i wyliczane;
- relacje oraz ich kierunek;
- cykl życia i dozwolone statusy;
- zasady archiwizacji, retencji i audytu;
- ograniczenia unikalności oraz integralności;
- dane widoczne dla poszczególnych ról;
- wpływ na backup, raporty i integracje.

## Zatwierdzone encje fundamentu

Na poziomie ogólnym przewidziane są: `users`, `workspaces`, `memberships`, `invitations` i `audit_events`. Ich pełny schemat wymaga specyfikacji modułów Workspace i Auth.

Encje dla Assets, QR, Locations, Documents, Warranty, People, Tasks, Tickets, Projects, Calendar i Reports zostaną zatwierdzone wraz z dokumentami tych modułów. Nie należy tworzyć tabel wyłącznie na podstawie proponowanych nazw.

## Reguły wspólne

- identyfikatory są globalnie unikalne i nie zawierają danych biznesowych;
- każda encja biznesowa zawiera `workspace_id`;
- relacje nie mogą przekraczać granicy workspace;
- czas zapisujemy w UTC;
- rekordy mają pola utworzenia, aktualizacji i autora, jeśli dotyczy;
- domyślne usunięcie danych biznesowych oznacza archiwizację;
- audyt jest dopisywany, a nie edytowany;
- hasła, tokeny, sekrety i treści plików nie trafiają do zdarzeń audytowych;
- migracja nie może wyprzedzać zatwierdzonej dokumentacji danych.

Raporty nie mogą tworzyć alternatywnego źródła prawdy. Dane wyliczone i agregaty wymagają opisania pochodzenia, czasu aktualizacji oraz możliwości odtworzenia.
