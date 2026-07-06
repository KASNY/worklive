# Tickets — UX

> Status: frontend MVP Sprintu 5 na danych mockowanych

## Cel i użytkownicy

Tickets pozwala pracownikowi zgłosić problem do IT, utrzymania ruchu, produkcji, jakości, magazynu, administracji lub wybranej osoby z danego działu.

## Ekran `/tickets`

Ekran zawiera liczniki otwartych, krytycznych i oczekujących zgłoszeń, wyszukiwarkę, filtry statusu i działu oraz tabelę. Wiersz pokazuje kod, tytuł, kategorię, status, priorytet, dział, osobę, Asset i datę. Kliknięcie otwiera Sheet szczegółów.

## Formularz i dane

„Zgłoś problem” wymaga tytułu, opisu, kategorii i priorytetu. Użytkownik wybiera dział, opcjonalną osobę z tego działu, opcjonalny Asset i mockowany załącznik. Kategorie: IT, awaria, zasób, dokumentacja, bezpieczeństwo, inne. Priorytety: niski, średni, wysoki, krytyczny. Statusy: nowe, w trakcie, oczekuje, rozwiązane, zamknięte.

## Workflow

Nowy Ticket otrzymuje status „Nowe” i wpis activity. W Sheet można mockowo zmienić status oraz dodać komentarz; każda akcja dopisuje wpis timeline. Asset Details pokazuje powiązane Tickets i otwiera formularz z ustawionym Asset.

## Stany i przyszły rozwój

Brak wyników ma Empty State z akcją utworzenia. Dane resetują się po odświeżeniu. SLA, kolejki, obserwujący, realne załączniki, eskalacje, powiadomienia, uprawnienia i audyt wymagają osobnej dokumentacji.
