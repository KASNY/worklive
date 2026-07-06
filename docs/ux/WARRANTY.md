# Warranty — UX

> Status: frontend MVP Sprintu 4 na danych mockowanych

## Cel modułu

Warranty pozwala szybko ocenić ochronę gwarancyjną Asset i odnaleźć fakturę będącą podstawą roszczenia. W Sprincie 4 nie jest osobną trasą; występuje w Asset details, Documents i na Dashboardzie.

## Statusy

- `Aktywna` — data końca jest późniejsza niż 90 dni;
- `Kończy się` — do daty końca pozostało od 0 do 90 dni;
- `Wygasła` — data końca minęła;
- `Brak` — Asset nie ma daty gwarancji.

Status jest wyliczany po stronie klienta z `warrantyUntil`. Nie stanowi decyzji prawnej ani potwierdzenia warunków producenta.

## Prezentacja i workflow

Asset details pokazuje datę, status, liczbę dni dla kończącej się gwarancji oraz pierwszą fakturę powiązaną z Asset. `/documents` pokazuje sekcję „Kończące się gwarancje”, a Dashboard kartę z liczbą i linkiem do Documents. Faktura jest zwykłym dokumentem typu `Faktura` z tym samym `assetId`.

## Stany i przyszły rozwój

Brak daty lub faktury ma jawny komunikat. Backend ma później przechowywać warunki, dostawcę, okres, rozszerzenia, historię roszczeń i przypomnienia. Okno 90 dni oraz wybór dokumentu podstawowego wymagają decyzji konfiguracyjnej przed trwałą implementacją.
