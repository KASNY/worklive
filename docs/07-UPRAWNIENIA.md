# Uprawnienia

MVP używa ról przypisanych do członkostwa w workspace. Domyślną odpowiedzią jest odmowa, a kontrola odbywa się po stronie API.

## Role

- **Właściciel** — pełna kontrola, role, ustawienia i zgoda na odtworzenie;
- **Administrator** — członkowie i moduły, bez przejęcia własności;
- **Kierownik** — zarządzanie danymi operacyjnymi i pracą;
- **Pracownik** — odczyt potrzebnych danych, własne zgłoszenia i aktualizacja przypisanych zadań;
- **Tylko odczyt** — odczyt danych biznesowych.

Zmiany ról są audytowane. Administrator nie może nadać roli właściciela, a użytkownik nie może podnieść własnych uprawnień. QR nie omija kontroli dostępu.

Role własne, zespoły, goście i uprawnienia per rekord są poza obecnym zakresem.
