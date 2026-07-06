# Documents — UX

> Status: frontend MVP Sprintu 4 na danych mockowanych

## Cel modułu

Documents porządkuje instrukcje, faktury, certyfikaty, zdjęcia, umowy i inne pliki workspace. Dokument może być ogólny albo powiązany z jednym Asset.

## Ekran `/documents`

Ekran zawiera nagłówek, akcję Upload Document, sekcję kończących się gwarancji, wyszukiwarkę, filtry typu, zasobu, daty i autora oraz tabelę dokumentów. Wiersz pokazuje nazwę, plik, typ, powiązany zasób, datę dodania, autora i rozmiar. Kliknięcie otwiera Sheet z metadanymi, opisem i placeholderem podglądu oraz pobierania.

## Akcje i dane

Mock upload wymaga nazwy i nazwy pliku, pozwala wybrać typ, autora, Asset oraz opis. Zapis dopisuje dokument do lokalnego stanu i otwiera szczegóły. Model zawiera `id`, `name`, `type`, `fileName`, `size`, `addedAt`, `author`, opcjonalny `assetId` i `description`.

## Stany puste i błędy

Brak wyników pokazuje Empty State z akcją uploadu. Sprint 4 nie przesyła binarnego pliku, nie waliduje MIME i nie generuje trwałego URL. Błędy storage, limity rozmiaru, skan antywirusowy oraz kontrola dostępu wymagają backendu i osobnej dokumentacji.

## Przyszły rozwój

Trwały storage, wersjonowanie, preview PDF/obrazów, pobieranie, usuwanie, wiele powiązań, OCR, podpisy, audyt i retencja zostaną dodane dopiero po opisaniu ich kontraktów.
