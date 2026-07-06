# Dashboard — UX

> Status: frontend demonstracyjny Etapu 1 wdrożony

## Stan implementacji

Ekran `/dashboard` działa na stałym zestawie danych mockowanych. Zaimplementowano responsywną powłokę, statystyki, Quick Actions, Recent Activity, Upcoming Tasks, Assets Summary, Projects Summary oraz rozwijane Notifications. Mocki pokazują kierunek UX i nie oznaczają wdrożenia modułów Tasks, Projects, Warranty ani Notifications po stronie domeny.

## Cel i użytkownicy

Dashboard jest pierwszym ekranem po wejściu do aktywnego workspace. Daje każdej roli szybki obraz dostępnych danych, spraw wymagających uwagi i ostatnich zmian.

## Sekcje ekranu

### Nagłówek

- powitanie użytkownika;
- nazwa aktywnego workspace;
- informacja o bieżącej dacie prezentowana w strefie workspace;
- Quick Actions właściwe dla roli.

### Podsumowanie Assets

Trzy karty: wszystkie niearchiwalne zasoby, aktywne oraz wyłączone z użycia. Kliknięcie prowadzi do listy z odpowiednim filtrem, jeśli użytkownik ma dostęp.

### Upcoming Tasks

Etap 1 pokazuje trzy przykładowe zadania jako mock prezentacyjny. Po wdrożeniu Tasks sekcja może korzystać z rzeczywistych danych wyłącznie według osobnej specyfikacji tego modułu.

### Upcoming Warranties

Etap 1 nie ma osobnej karty Upcoming Warranties. Przykładowe zdarzenie o gwarancji występuje wyłącznie w mockowanym Recent Activity i Notifications. Rzeczywista karta oraz dane wymagają specyfikacji Warranty.

### Assets Summary

Mock prezentuje łączną liczbę zasobów oraz rozkład na cztery demonstracyjne kategorie. Kategorie i wartości nie stanowią kontraktu modelu Assets.

### Projects Summary

Mock prezentuje trzy projekty z zespołem, terminem i procentowym postępem. Moduł Projects pozostaje niewdrożony; pola i sposób liczenia postępu wymagają jego specyfikacji.

### Recent Activity

Chronologiczna lista najnowszych, dozwolonych zdarzeń z aktorem, akcją, obiektem i czasem. Link do obiektu jest dostępny tylko przy zachowanym dostępie.

## Quick Actions

- Dodaj zasób;
- Zobacz zasoby;
- Zaproś pracownika;
- Ustawienia workspace.

Widoczność wynika z roli. Kolejność preferuje najczęstsze dozwolone działanie, ale w MVP nie jest personalizowana.

## Akcje użytkownika

- otwarcie Quick Action;
- przejście z karty statystyki do Assets;
- otwarcie rekordu z Recent Activity;
- przejście do pełnej sekcji, jeżeli istnieje w MVP;
- ponowienie pobrania danych po błędzie.

## Dane

- bieżący użytkownik i workspace;
- zagregowane liczby Assets;
- dostępne akcje wynikające z roli;
- ostatnie zdarzenia audytowe;
- demonstracyjne dane Tasks i Projects oraz stan niewdrożonego Warranty;
- powiadomienia są prezentowane w osobnym centrum, nie jako kopia na Dashboardzie.

## Stany i błędy

- nowy workspace: powitanie, zerowe rzeczywiste liczniki Assets i akcja dodania pierwszego zasobu;
- brak prawa tworzenia: akcja prowadzi wyłącznie do odczytu zasobów;
- po podłączeniu rzeczywistych danych brak aktywnego modułu musi mieć jawny stan „Moduł nie jest jeszcze dostępny”;
- brak aktywności: neutralna informacja bez sztucznego przykładu;
- częściowy błąd: sprawne sekcje pozostają widoczne, a błędna sekcja ma własne ponowienie;
- całkowity błąd: komunikat strony z możliwością ponowienia.

## Przyszłe rozszerzenia

Pełna historia, konfigurowalne widgety, personalizacja układu, dane Calendar i Reports oraz dashboardy zależne od roli. Nie należą do pierwszego MVP.
