# Brand WorkLive

## Pozycjonowanie

Nowoczesne, spokojne i wiarygodne centrum pracy operacyjnej firmy. Marka komunikuje porządek, dostępność i bezpieczeństwo bez technicznego żargonu.

## Nazwa i głos

Zapisujemy nazwę **WorkLive**. Komunikacja jest konkretna, pomocna i profesjonalna. Nie obiecujemy funkcji, których nie zatwierdzono w dokumentacji.

## Kolory

| Token        | Wartość   | Rola                               |
| ------------ | --------- | ---------------------------------- |
| Primary Blue | `#2563EB` | główne akcje, aktywne elementy     |
| Dark Navy    | `#0F172A` | ciemne powierzchnie i motyw ciemny |
| White        | `#FFFFFF` | jasne powierzchnie                 |
| Light Gray   | `#F8FAFC` | tło jasnego motywu                 |
| Border Gray  | `#E5E7EB` | obramowania jasnego motywu         |
| Text Dark    | `#0F172A` | główny tekst jasnego motywu        |
| Text Muted   | `#64748B` | tekst pomocniczy                   |

## Logo i wordmark

Źródłowe SVG są finalnym źródłem kolorów znaku. Nie wolno zmieniać ich przez filtry CSS, `currentColor`, nadpisanie `fill`, opacity ani klasy Tailwind wpływające na wygląd obrazu.

- na ciemnym tle używamy `icon-dark-no-bg.svg`;
- na jasnym tle używamy `icon-light-no-bg.svg`;
- dla ikony aplikacji z własnym ciemnym tłem używamy `icon-dark.svg`;
- dla ikony aplikacji z własnym jasnym tłem używamy `icon-light.svg`.

Wordmark jest tekstem obok ikony. Część **Work** ma kolor `#FFFFFF` w wariancie dark lub `#0F172A` w wariancie light. Część **Live** zawsze ma kolor `#2563EB`.

W aplikacjach znak renderuje wyłącznie `BrandLogo` z `packages/ui`. Komponent przyjmuje `variant`, `withBackground`, `size` i `showWordmark`. Nie wolno tworzyć alternatywnego renderowania logo w aplikacji.

## Favicon

Workspace używa `apps/workspace/app/icon.svg`, będącego wierną kopią `packages/brand/icons/icon-dark.svg`. Next.js publikuje go jako ikonę karty przeglądarki. Favicon zachowuje własne tło i oryginalne kolory SVG; nie stosujemy filtrów ani generowanej ikony zastępczej. Tytuł dokumentu brzmi **WorkLive Workspace**.

Font marki i kolory semantyczne statusów pozostają do decyzji.
