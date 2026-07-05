# Design system

## Status i odpowiedzialność

`packages/ui` jest jedynym źródłem prawdy dla współdzielonych komponentów, tokenów, wzorców interakcji i zasad dostępności WorkLive. Pakiet jest obecnie fundamentem bez implementacji komponentów. Każdy element zostanie opisany przed dodaniem.

Design system obowiązuje wszystkie aplikacje renderujące UI. Różnice technologiczne, w szczególności między webem, desktopem i Expo, mogą wymagać adapterów lub wariantów platformowych, ale ich API, zachowanie i tokeny nadal muszą być zarządzane oraz dokumentowane w ramach `packages/ui`.

## Zasada komponentów

- najpierw sprawdzamy, czy potrzebny wzorzec istnieje w `packages/ui`;
- komponent wielokrotnego użytku powstaje w `packages/ui`, nie w aplikacji;
- komponent domenowy może składać się z elementów design systemu, ale musi należeć do udokumentowanego modułu;
- lokalny komponent aplikacji wymaga wcześniejszej decyzji w docs z uzasadnieniem i granicą odpowiedzialności;
- nie kopiujemy komponentów między aplikacjami;
- nie stylujemy interfejsu surowymi wartościami, jeśli istnieje odpowiedni token;
- shadcn/ui jest punktem wyjścia, nie osobnym źródłem prawdy i nie może omijać reguł WorkLive.

## Wymagania przed dodaniem komponentu

Opis komponentu musi określać: cel, warianty, stany, zachowanie responsywne, obsługę klawiatury, semantykę, użyte tokeny, komunikaty błędów oraz platformy. Publiczne API komponentu musi być stabilne i możliwie niezależne od pojedynczego modułu.

## Motywy i kolory

### Jasny motyw

Tło `#F8FAFC`, powierzchnie `#FFFFFF`, tekst `#111827`, tekst pomocniczy `#64748B`, obramowania `#E5E7EB`, akcje `#2563EB`.

### Ciemny motyw

Bazą jest `#0F172A`, a `#2563EB` pozostaje akcentem. Tokeny powierzchni, tekstu, obramowań, hover, focus i statusów muszą zostać zatwierdzone po sprawdzeniu kontrastu. Nie wolno zgadywać ich w kodzie.

Użytkownik docelowo wybiera motyw jasny, ciemny lub systemowy. Implementacja przełącznika wymaga wcześniejszego opisu w docs.

## Zasady jakości

- tokeny zamiast surowych kolorów i wymiarów;
- wspólne skale odstępów, typografii, promieni i cieni;
- widoczny fokus co najmniej tak czytelny jak hover;
- kolor nigdy nie jest jedynym nośnikiem znaczenia;
- komponent dokumentuje loading, empty, disabled, error i success, jeśli dotyczą;
- zgodność z WCAG 2.2 AA jest warunkiem akceptacji.

Logo, font, semantyczne kolory statusów i pełny katalog komponentów pozostają decyzjami otwartymi. Brak decyzji nie może zostać uzupełniony przypadkową wartością w aplikacji.
