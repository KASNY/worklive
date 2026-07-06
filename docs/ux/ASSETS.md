# Assets — UX

> Status: frontend MVP Sprintu 5 wdrożony na danych mockowanych
>
> Zależności: Workspace, Auth, uprawnienia i audyt

## Cel modułu

Assets umożliwia firmie prowadzenie jednej, podstawowej ewidencji maszyn, urządzeń, narzędzi i innych zasobów operacyjnych. Jest pierwszym modułem biznesowym WorkLive.

## Stan implementacji Sprintu 5

Trasa `/assets` działa bez backendu i bazy danych. Add, Edit, Delete, Change Location, Assign Person, Add Document oraz zgłoszenie problemu zmieniają wyłącznie stan w pamięci przeglądarki i resetują się po odświeżeniu. Każdy mock ma kod QR, referencję do Locations oraz powiązane dokumenty, informacje gwarancyjne i zgłoszenia.

## Dla kogo

- Właściciel, Administrator i Kierownik zarządzają zasobami;
- Pracownik oraz Tylko odczyt przeglądają zasoby;
- dostęp zawsze ogranicza aktywny workspace.

## Główne ekrany

### Lista Assets

Sekcje: nagłówek, opis modułu, akcja „Add Asset”, wyszukiwanie, filtry typu, statusu, lokalizacji i osoby odpowiedzialnej, liczba wyników, responsywna tabela oraz Empty State.

Kolumny Sprintu 3: nazwa z typem i kodem wewnętrznym, status, dokładna lokalizacja, osoba odpowiedzialna, data końca gwarancji i ostatnia aktywność. Kliknięcie wiersza otwiera sheet szczegółów.

### Nowy zasób

Modal formularza zawiera nazwę, kod wewnętrzny, typ, status, numer seryjny, lokalizację, osobę odpowiedzialną, datę zakupu i gwarancję do. Zapis dodaje rekord na początku lokalnej listy i otwiera jego szczegóły.

### Szczegóły zasobu

Sheet zawiera overview, QR, Warranty, dokumenty, Zgłoszenia i activity timeline. Zgłoszenie pokazuje kod, tytuł, priorytet i status. Akcja „Zgłoś problem z tym zasobem” otwiera formularz Ticket z automatycznie ustawionym Asset.

### Edycja zasobu

Używa tego samego formularza co tworzenie, pokazuje bieżące wartości i aktualizuje lokalny mock.

## Główne akcje użytkownika

- przeglądanie i paginowanie listy;
- wyszukiwanie;
- filtrowanie po typie, statusie, lokalizacji i osobie odpowiedzialnej;
- utworzenie zasobu;
- otwarcie szczegółów;
- edycja;
- usunięcie po potwierdzeniu;
- mockowana zmiana lokalizacji;
- mockowane przypisanie osoby;
- powrót do listy z zachowanym wyszukiwaniem i filtrem.

## Model danych MVP

| Pole                 | Wymagane | Zasada Sprintu 2                                                 |
| -------------------- | -------: | ---------------------------------------------------------------- |
| `id`                 |      tak | lokalny identyfikator mocka                                      |
| Nazwa                |      tak | czytelna nazwa zasobu                                            |
| Typ                  |      tak | Maszyna, Laptop, Telefon, Narzędzie, Drukarka, Skaner lub Pojazd |
| Status               |      tak | Aktywny, W serwisie lub Wycofany                                 |
| Kod wewnętrzny       |      tak | identyfikator prezentowany w workspace                           |
| Numer seryjny        |      tak | identyfikator producenta                                         |
| `locationId`         |      tak | referencja do elementu wspólnego drzewa Locations                |
| `qrCode`             |      tak | unikalny w mockach kod `AST-0001`, używany do QR i `/scan`       |
| Osoba odpowiedzialna |      tak | wartość mockowana; nie jest integracją z People                  |
| Data zakupu          |      tak | data w formacie formularza systemowego                           |
| Gwarancja do         |      nie | data używana do wyliczenia statusu Warranty                      |
| Ostatnia aktywność   |      tak | opis względnego czasu mocka                                      |
| Dokumenty            |      nie | relacja mockowana przez `assetId` w Documents                    |
| Tickets count        |      tak | licznik mockowany, bez modułu Tickets                            |
| Activity timeline    |      tak | lokalna historia demonstracyjna                                  |

Osoba i tickety nadal służą wyłącznie prezentacji UX. Lokalizacja korzysta ze wspólnego mockowanego drzewa, QR jest generowany po stronie klienta, a Documents i Warranty korzystają ze wspólnych mocków Sprintu 4. Persystencja, integralność relacji i reguły gwarancji wymagają backendu w przyszłym etapie.

## Uprawnienia

| Akcja               | Właściciel | Administrator | Kierownik | Pracownik | Tylko odczyt |
| ------------------- | ---------: | ------------: | --------: | --------: | -----------: |
| Lista i szczegóły   |        tak |           tak |       tak |       tak |          tak |
| Utworzenie i edycja |        tak |           tak |       tak |       nie |          nie |
| Archiwizacja        |        tak |           tak |       tak |       nie |          nie |
| Historia zmian      |        tak |           tak |       tak |       nie |          nie |

## Workflow

1. Użytkownik otwiera `/assets`, wyszukuje lub filtruje mocki.
2. Kliknięcie rekordu otwiera sheet szczegółów.
3. Add i Edit zapisują dane w stanie lokalnym.
4. Change Location wybiera istniejący węzeł drzewa Locations, a Assign Person aktualizuje wybrany mock.
5. Add Document dopisuje dokument powiązany z wybranym Asset.
6. Warranty wylicza status z daty i pokazuje pierwszą powiązaną fakturę.
7. QR pozwala skopiować kod; Download QR pozostaje jawnym placeholderem.
8. Użytkownik przegląda powiązane Tickets lub tworzy nowe zgłoszenie z ustawionym Asset.
9. Delete wymaga potwierdzenia i usuwa mock do odświeżenia strony.

Docelowe reguły archiwizacji, audytu i trwałego usuwania pozostają do wdrożenia z backendem. Obecny Delete jest demonstracją interakcji.

## Powiadomienia

Assets nie generuje powiadomień użytkownika w MVP. Zmiany są zapisywane w audycie i mogą pojawić się w Recent Activity.

## Integracje

Frontend korzysta ze wspólnego WorkspaceShell i design systemu `packages/ui`. Assets współdzieli mockowane dane Locations, QR, Documents, Warranty oraz Tickets. Powiązania z People pozostają mockowane i nie są trwałe.

## Stany puste

- brak zasobów: opis wartości oraz akcja „Add Asset”;
- brak zasobów i brak prawa tworzenia: informacja, że w workspace nie ma jeszcze zasobów;
- brak wyników wyszukiwania: informacja i akcja wyczyszczenia wyszukiwania/filtrów;
- brak historii: informacja „Brak zarejestrowanych zmian”.

## Błędy

- wymagane pole: natywna walidacja formularza;
- brak uprawnień: brak akcji oraz bezpieczny ekran odmowy przy bezpośrednim adresie;
- błąd sieci: zachowanie danych formularza i możliwość ponowienia;
- rekord zarchiwizowany lub niedostępny: komunikat bez ujawniania danych innego workspace.

## Metryki

- liczba niearchiwalnych zasobów w workspace;
- liczba aktywnych i wyłączonych z użycia zasobów;
- odsetek workspace z co najmniej jednym zasobem;
- czas od zakończenia onboardingu do utworzenia pierwszego zasobu.

Metryki służą do oceny użyteczności MVP. Nie oznaczają wdrożenia modułu Reports.

## MVP

Lista, wyszukiwanie, cztery filtry, Empty State, sheet szczegółów, Add, Edit, Delete z potwierdzeniem, Change Location z drzewa, Assign Person, generowany QR, Copy code oraz ręczne wyszukiwanie na `/scan`. Paginacja nie jest potrzebna dla ośmiu mocków i wraca przed integracją z API.

## Przyszłe rozszerzenia

Backend, baza, role egzekwowane serwerowo, audyt, paginacja API, skanowanie aparatem, pobieranie etykiet QR, trwałe relacje z Locations, People, Documents, Warranty i Tickets, kategorie konfigurowalne, import, eksport, zdjęcia, archiwum oraz operacje zbiorcze.

## Decyzje otwarte

- format, unikalność i generowanie kodu wewnętrznego przed backendem;
- docelowe statusy i dozwolone przejścia;
- rozmiary stron i limit wyników przed API;
- maksymalne długości pól — blokują schemat oraz walidację;
- zasada widoczności archiwum — blokuje przyszły widok archiwalny, nie MVP domyślnej listy.
