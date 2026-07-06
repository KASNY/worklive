# QR — UX foundations

> Status: frontend Sprintu 3 na danych mockowanych

## Cel i ekrany

QR daje szybki dostęp do zasobu przez stabilny kod tekstowy. Szczegóły Asset pokazują wygenerowany QR, kod `AST-XXXX`, Copy code oraz jawny placeholder Download QR. Trasa `/scan` zawiera ręczne pole kodu, wynik w formie karty zasobu i Error State dla nieistniejącego kodu.

## Dane i workflow

QR zawiera klientowy adres `worklive://asset/{code}`. W Sprincie 3 lookup działa wyłącznie na wspólnej liście mocków `AST-0001`–`AST-0008`; nie jest publicznym linkiem ani mechanizmem autoryzacji. Użytkownik wpisuje kod, zatwierdza wyszukiwanie i otrzymuje nazwę, status, typ, numer seryjny, osobę odpowiedzialną oraz pełną ścieżkę lokalizacji.

## Przyszły rozwój

Skanowanie aparatem, pobieranie PNG/SVG/PDF, druk etykiet, rotacja identyfikatorów, resolver backendowy, audyt skanów, obsługa offline i kontrola dostępu wymagają osobnej dokumentacji przed implementacją.
