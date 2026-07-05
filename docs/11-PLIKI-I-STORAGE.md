# Pliki i storage

Metadane dokumentu są w PostgreSQL, a treść w magazynie obiektowym MinIO lub Cloudflare R2. Wybór dostawcy wymaga ADR.

## Dokumentacja firmowa

Dokument ma nazwę, typ MIME, rozmiar, sumę kontrolną, klucz obiektu, autora i powiązania z zatwierdzonymi rekordami. MVP obejmuje dodanie, pobranie, opisanie i archiwizację zgodnie z rolą. Wersjonowanie treści nie jest zatwierdzone.

## Bezpieczeństwo

- prywatne buckety i krótkotrwały autoryzowany dostęp;
- klucze obiektów nie ujawniają nazw firm ani sekretów;
- walidacja rozmiaru i typu po stronie serwera;
- izolacja ścieżek i uprawnień workspace;
- szyfrowanie transmisji i danych spoczynkowych;
- suma kontrolna do kontroli integralności.

Limity plików, skanowanie antywirusowe i retencja są do decyzji przed uploadem produkcyjnym.
