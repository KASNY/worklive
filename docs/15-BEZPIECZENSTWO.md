# Bezpieczeństwo

## Fundament

- minimalne uprawnienia i domyślna odmowa;
- izolacja workspace w bazie, API, storage, cache i backupach;
- walidacja wszystkich danych wejściowych;
- hashowanie haseł oraz tokenów jednorazowych;
- sekrety wyłącznie w bezpiecznej konfiguracji środowiska;
- TLS, bezpieczne nagłówki i kontrola CORS/CSRF adekwatna do sesji;
- audyt operacji administracyjnych i zmian danych;
- zależności skanowane w CI.

## QR

QR zawiera nieprzewidywalny, unieważnialny identyfikator prowadzący do zasobu lub lokalizacji. Nie zawiera danych poufnych i nie omija logowania ani uprawnień.

## Przed produkcją

Wymagane są model zagrożeń, przegląd OWASP, polityka podatności, retencja logów, procedura incydentu i test izolacji tenantów.
