# Design system

## Status i odpowiedzialność

`packages/ui` jest jedynym źródłem prawdy dla współdzielonych komponentów, tokenów, wzorców interakcji i zasad dostępności WorkLive. Pakiet zawiera między innymi `BrandLogo`, `Button`, `Card`, `Input`, `Textarea`, `Badge`, `Progress`, `Dialog`, `Sheet`, `Select`, `Table`, `Skeleton` i `EmptyState`, narzędzie `cn` oraz presety ruchu. Są używane przez `apps/workspace`.

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

Tło `#F8FAFC`, powierzchnie `#FFFFFF`, tekst `#0F172A`, tekst pomocniczy `#64748B`, tekst muted `#94A3B8`, obramowania `#E5E7EB`, input border `#CBD5E1`, akcje `#2563EB` i hover `#1D4ED8`.

### Ciemny motyw

Bazą jest `#0F172A`, a `#2563EB` pozostaje akcentem. Tokeny powierzchni, tekstu, obramowań, hover, focus i statusów muszą zostać zatwierdzone po sprawdzeniu kontrastu. Nie wolno zgadywać ich w kodzie.

Użytkownik wybiera motyw jasny, ciemny lub systemowy. Oba motywy mają identyczny layout, spacing, rozmiary, radiusy i hierarchię. Różnią się wyłącznie wartościami tokenów kolorów, borderów, cieni i tła.

### Tokeny obowiązkowe

| Token                | Light     | Zastosowanie                    |
| -------------------- | --------- | ------------------------------- |
| `background`         | `#F8FAFC` | tło strony                      |
| `foreground`         | `#0F172A` | tekst główny                    |
| `card`               | `#FFFFFF` | karty i powierzchnie elevated   |
| `card-foreground`    | `#0F172A` | tekst kart                      |
| `border`             | `#E5E7EB` | standardowe obramowania         |
| `muted`              | `#F1F5F9` | stonowane powierzchnie          |
| `muted-foreground`   | `#64748B` | tekst pomocniczy                |
| `primary`            | `#2563EB` | główna akcja                    |
| `primary-foreground` | `#FFFFFF` | tekst na primary                |
| `accent`             | `#EFF6FF` | subtelna niebieska powierzchnia |
| `accent-foreground`  | `#1D4ED8` | tekst na accent                 |

Komponent korzysta z tokenu, jeśli istnieje; nie powiela wartości koloru lokalnie bez uzasadnionej roli dekoracyjnej.

### Animacja zmiany motywu

Na czas przełączenia dokument otrzymuje klasę `theme-transition`. `background-color`, `border-color`, `color` i `box-shadow` przechodzą przez 240 ms z easingiem `ease-in-out`. Nie ma radial reveal, fade overlay ani animacji zależnej od miejsca kliknięcia. Wymiary i layout nie są animowane. `prefers-reduced-motion: reduce` zeruje czas przejścia, a `next-themes` ustawia klasę motywu przed renderem, co ogranicza miganie przy starcie.

## BrandLogo

`BrandLogo` jest jedynym komponentem do renderowania znaku WorkLive. Używa zwykłego elementu `<img>` i wybiera jeden z czterech plików w `/brand/`:

- `variant="dark"` bez tła: `icon-dark-no-bg.svg`;
- `variant="light"` bez tła: `icon-light-no-bg.svg`;
- `variant="dark"` z `withBackground`: `icon-dark.svg`;
- `variant="light"` z `withBackground`: `icon-light.svg`.

SVG nie otrzymuje filtrów, opacity zmieniającego wygląd, `currentColor` ani nadpisania `fill`. Wordmark pozostaje tekstem: Work `#FFFFFF`/`#0F172A`, Live `#2563EB`. W kontekście zależnym od motywu aplikacja renderuje właściwy wariant bez modyfikowania samego obrazu.

## Login visual hero

Login ma jeden visual hero współdzielony przez light i dark. Workspace preview, statystyki, formularz oraz ich spacing są identyczne. Light mapuje je na jasne tokeny i delikatne niebieskie dekoracje, a dark na istniejące premium powierzchnie navy. `BrandLogo` wybiera odpowiedni SVG, nie zmieniając rozmiaru wordmarku ani miejsca w layoucie.

Workspace preview ma bazową szerokość około 620 px, opacity 0,94, skalę 0,92 i obrót nie większy niż 1°. Używa tych samych `Card`, `Badge` i tokenów co workspace, ale jest dekoracyjny (`aria-hidden`, bez interakcji). Struktura odwzorowuje realny produkt: sidebar, topbar, statystyki i Recent Activity. Nie tworzymy osobnego języka wizualnego dla makiety.

Animacje wejścia loginu realizuje Framer Motion. Dozwolone są: opacity, translateY do 16 px, skala preview około 0,9 i stagger statystyk. Czas pojedynczej animacji wynosi 250–500 ms, easing jest łagodny, a animacje nie mogą powodować layout shift ani opóźniać obsługi formularza.

## Zasady jakości

- tokeny zamiast surowych kolorów i wymiarów;
- wspólne skale odstępów, typografii, promieni i cieni;
- widoczny fokus co najmniej tak czytelny jak hover;
- kolor nigdy nie jest jedynym nośnikiem znaczenia;
- komponent dokumentuje loading, empty, disabled, error i success, jeśli dotyczą;
- zgodność z WCAG 2.2 AA jest warunkiem akceptacji.

Font, semantyczne kolory statusów i pełny katalog komponentów pozostają decyzjami otwartymi. Brak decyzji nie może zostać uzupełniony przypadkową wartością w aplikacji.

## Presety ruchu

Źródłem wspólnych czasów, easingów i wariantów Framer Motion jest `packages/ui/src/motion/presets.ts`. Standardowy czas wynosi 240 ms, zakres interakcji 220–280 ms, a domyślny easing odpowiada łagodnemu `ease-out`.

- dropdown: fade, przesunięcie z `-8px` i skala od `0.98`, z `transform-origin` przy elemencie wyzwalającym;
- drawer: overlay fade oraz slide-in z lewej strony; zamknięcie pozostaje zamontowane do końca animacji;
- Dialog: portal montuje od razu wycentrowaną powierzchnię, overlay wykonuje fade, a zawartość skaluje się `0.98 → 1`; centrowanie nie może korzystać z animowanej właściwości `transform`;
- Sheet: overlay fade i slide-in z prawej dla szczegółów lub z lewej dla nawigacji mobilnej;
- mikrointerakcje: transition 200 ms dla koloru, borderu, cienia i niewielkiego active state; bez animowania wymiarów.

Radix odpowiada za focus trap, Escape, kliknięcie poza i semantykę Dialog/Sheet. Dropdown implementuje kliknięcie poza i Escape jawnie. Każdy trigger publikuje stan przez `aria-expanded` tam, gdzie ma to zastosowanie.

Dialog i Sheet korzystają z natywnego cyklu Presence Radix i animacji CSS opartych na `data-state`. `forceMount` jest zabroniony dla modalnych overlayów, ponieważ zamknięty prymityw może utrzymać scroll lock lub focus scope. Root zachowuje ostatnią treść, aby Radix mógł dokończyć fade, scale lub slide-out, ale po animacji Portal, Overlay i Content muszą zniknąć z DOM.

Zamknięta powierzchnia nie może polegać wyłącznie na `opacity: 0` ani `pointer-events: none`. Test akceptacyjny obejmuje brak portalu w DOM oraz brak `overflow: hidden`, inert lub aktywnego focus trap na stronie po zamknięciu.

### Scrollbar

Scrollbar jest tokenizowany przez `--scrollbar-track`, `--scrollbar-thumb` i `--scrollbar-thumb-hover`. Implementacja obejmuje WebKit oraz standardy Firefox. Lokalny komponent nie może nadpisywać scrollbara przypadkowymi kolorami; wyjątkiem jest udokumentowana powierzchnia o innym kontraście.

### Skeleton i Empty State

`Skeleton` jest używany dla rzeczywistego stanu ładowania o przewidywalnym layoucie. Liczba i rozmiar bloków powinny przypominać docelowy ekran. Nie używamy Skeleton dla braku danych, błędu ani pustego filtra — te sytuacje obsługuje `EmptyState` z ikoną, tytułem, krótkim opisem i opcjonalnym CTA.

### Reduced motion

`prefers-reduced-motion: reduce` wyłącza slide, scale, puls i animacje dekoracyjne. Framer Motion korzysta z `useReducedMotion`, a animacje CSS kończą się praktycznie natychmiast. Funkcje, focus i możliwość zamknięcia powierzchni pozostają identyczne.

## Implementacja Etapu 1

- Tailwind CSS 4 udostępnia tokeny przez zmienne CSS w `apps/workspace/app/globals.css`;
- jasny, ciemny i systemowy motyw obsługuje `next-themes`;
- komponenty bazowe używają wzorców shadcn/ui, Radix Slot i CVA;
- komponenty domenowe Splash, Login i Dashboard należą do `apps/workspace`, ponieważ realizują udokumentowane ekrany produktu;
- ikony pochodzą z Lucide, a branding z `apps/workspace/public/brand`.
