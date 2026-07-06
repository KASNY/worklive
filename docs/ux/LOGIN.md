# Login — UX

> Status: frontend demonstracyjny Etapu 1 wdrożony

## Stan implementacji

Ekran `/login` jest responsywnym mockiem z uzupełnionymi danymi demonstracyjnymi, przełącznikiem widoczności hasła, stanem ładowania i przejściem do `/dashboard`. Nie komunikuje się z API, nie sprawdza danych i nie tworzy sesji. Odzyskiwanie hasła pozostaje wyłącznie nieaktywną akcją wizualną do czasu wdrożenia Auth.

## Cel i użytkownicy

Ekrany Auth umożliwiają właścicielowi i zaproszonemu pracownikowi bezpieczne wejście do WorkLive, odzyskanie dostępu oraz kontynuowanie przerwanej ścieżki.

## Ekrany

### Logowanie

Centralna karta zawiera logo WorkLive, nagłówek, e-mail, hasło, akcję „Zaloguj się” i link „Nie pamiętam hasła”. Link do utworzenia konta jest pokazywany tylko w kontekście zakupu lub zaproszenia; MVP nie zakłada otwartej rejestracji bez tych ścieżek.

### Utworzenie konta

Formularz zawiera imię, nazwisko, e-mail, hasło, powtórzenie hasła oraz wymagane zgody. E-mail przekazany z checkoutu lub zaproszenia jest wstępnie uzupełniony, ale sposób jego zmiany wymaga decyzji.

### Odzyskanie hasła

Pierwszy ekran przyjmuje e-mail i zawsze pokazuje neutralne potwierdzenie. Link jednorazowy prowadzi do formularza nowego hasła. Po sukcesie użytkownik wraca do logowania.

### Wybór workspace

Jest wyświetlany tylko przy więcej niż jednym aktywnym członkostwie. Każda pozycja pokazuje nazwę workspace i rolę użytkownika.

## Akcje użytkownika

- zalogowanie;
- przejście do odzyskania hasła;
- ustawienie nowego hasła;
- utworzenie konta w zatwierdzonym kontekście;
- wybór workspace;
- powrót do bezpiecznej strony docelowej po logowaniu.

## Dane

- e-mail;
- hasło lub nowe hasło;
- imię i nazwisko przy rejestracji;
- wymagane zgody;
- bezpieczny kontekst zaproszenia, zakupu lub strony docelowej.

Hasło nie jest logowane ani zapisywane w stanie trwałym klienta. Komunikaty nie potwierdzają istnienia konta.

## Stany i błędy

- błędne dane: ogólny komunikat bez wskazania, które dane konta istnieją;
- zbyt wiele prób: czasowe ograniczenie i informacja o ponowieniu;
- wygasły link: możliwość rozpoczęcia odzyskiwania ponownie;
- brak aktywnego członkostwa: informacja o braku dostępu, bez ujawniania workspace;
- przerwana sesja: powrót do logowania z bezpiecznie zachowanym kierunkiem nawigacji.

## Przyszłe rozszerzenia

MFA, SSO, logowanie społecznościowe, passkeys i zarządzanie aktywnymi sesjami. Nie należą do MVP.
