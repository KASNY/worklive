# Backupy

Backup obejmuje PostgreSQL, pliki obiektowe i dane konieczne do odtworzenia relacji oraz izolacji workspace.

## Zasady

- szyfrowanie w tranzycie i spoczynku;
- oddzielenie kopii od środowiska podstawowego;
- ograniczony i audytowany dostęp;
- status, czas i kontrola integralności każdej kopii;
- okresowe testy odtworzenia w środowisku izolowanym;
- weryfikacja danych, plików i braku przecieku między workspace.

Odtworzenie produkcyjne wymaga właściciela workspace i kontrolowanej operacji administratora platformy. Samodzielne odtwarzanie pojedynczych rekordów nie jest częścią pierwszego zakresu.

RPO, RTO, harmonogram, retencja i region przechowywania muszą zostać zatwierdzone przed deploymentem produkcyjnym.
