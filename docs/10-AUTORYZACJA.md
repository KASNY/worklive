# Autoryzacja i logowanie

## Przepływ

Użytkownik loguje się adresem e-mail i hasłem. Po poprawnym uwierzytelnieniu otrzymuje bezpieczną sesję, wybiera dostępny workspace, a API sprawdza członkostwo i rolę przy każdej operacji.

## Wymagania

- hasła są hashowane współczesnym algorytmem, którego wybór wymaga ADR;
- sesje mają bezpieczne, `HttpOnly`, `Secure` cookies tam, gdzie dotyczy;
- wylogowanie unieważnia sesję;
- ochrona przed brute force i enumeracją kont;
- zapomniane hasło używa jednorazowego, czasowego tokenu przechowywanego jako skrót;
- zdarzenia bezpieczeństwa są audytowane bez zapisu sekretów.

MFA, SSO i logowanie społecznościowe nie należą obecnie do zakresu. Dokładne czasy sesji i odzyskiwania hasła są do decyzji.
