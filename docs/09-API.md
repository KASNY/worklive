# API

API będzie tworzone w NestJS i TypeScript dla klientów WorkLive. Nie ustalono jeszcze REST vs. innego stylu; wymaga to ADR przed implementacją.

## Zasady kontraktu

- wersjonowanie od pierwszego publicznego kontraktu;
- walidacja danych wejściowych przez Zod lub mechanizm zatwierdzony w ADR;
- autoryzacja i kontekst workspace w każdym żądaniu biznesowym;
- spójny format błędów, paginacji i identyfikatorów żądań;
- operacje istotne zapisują audyt;
- brak sekretów i danych wrażliwych w logach;
- limity ruchu dla punktów narażonych na nadużycia.

Endpointy, payloady i kody odpowiedzi zostaną opisane przed ich kodowaniem. Publiczne API dla integracji zewnętrznych nie jest obecnie zatwierdzone.
