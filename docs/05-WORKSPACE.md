# Workspace firmy

Workspace reprezentuje jedną firmę i jest granicą bezpieczeństwa danych. Konto może należeć do wielu workspace, ale każde żądanie działa w jednym aktywnym kontekście.

## Zasady

- każdy rekord biznesowy należy do workspace;
- odczyt, pliki, wyszukiwanie, cache, audyt i backup zachowują izolację;
- identyfikator z klienta nie stanowi potwierdzenia dostępu;
- przełączenie workspace ponownie wyznacza uprawnienia;
- dostęp między workspace nie jest dostępny.

## Cykl życia

Twórca workspace zostaje właścicielem. Workspace może docelowo być aktywny, zawieszony lub zamknięty. Skutki zawieszenia, eksportu i usunięcia danych są do decyzji przed implementacją.
