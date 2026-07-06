# MVP WorkLive

> Status: frontend demonstracyjny rozwijany modułowo; Inventory MVP wdrażany w Sprincie 7
>
> Stan implementacji: moduły frontendowe działają na danych mockowanych; brak backendu i bazy

## Stan Etapu 1

`apps/workspace` zawiera działający, responsywny frontend w Next.js i React. Dostępne są trasy Splash (`/`), Login (`/login`) oraz Dashboard (`/dashboard`), jasny i ciemny motyw, mobilny sidebar i centrum powiadomień. Logowanie jest wyłącznie demonstracyjnym przejściem klientowym i nie tworzy sesji.

Dashboard prezentuje mockowane Quick Actions, statystyki, Recent Activity, Upcoming Tasks, Assets Summary, Projects Summary i Notifications. Dane Tasks, Projects i gwarancji widoczne w mockach są demonstracją docelowego UX, a nie wdrożeniem tych modułów. Nie wolno na ich podstawie zakładać gotowego modelu danych, workflow ani uprawnień.

Sprint 7 rozszerza demonstracyjny zakres o Inventory pod trasą `/inventory`. Moduł prowadzi lokalne stany magazynowe i ruchy oraz integruje się prezentacyjnie z Dashboardem i Assets. Szczegółowy kontrakt znajduje się w `docs/ux/INVENTORY.md`.

## Cel MVP

MVP WorkLive ma pozwolić właścicielowi firmy kupić dostęp, utworzyć konto i workspace, zaprosić zespół oraz rozpocząć uporządkowaną ewidencję zasobów. Pierwszym modułem biznesowym jest Assets. WorkLive pozostaje modularną platformą workspace: kolejne moduły są dołączane etapami bez zmiany podstawowego modelu organizacji, użytkowników i uprawnień.

MVP nie oznacza implementacji wszystkich modułów z roadmapy. Oznacza kompletną, użyteczną ścieżkę dla fundamentu oraz Assets. Elementy dashboardu zależne od Tasks i Warranty mają zdefiniowany kontrakt UX, ale nie mogą korzystać z fikcyjnych danych ani zostać zaimplementowane przed specyfikacją tych modułów.

## Zakres MVP

### W zakresie

- zakup subskrypcji po zatwierdzeniu modelu cenowego;
- konto właściciela, logowanie, wylogowanie i odzyskanie hasła;
- onboarding pierwszego workspace;
- zapraszanie pracowników do workspace;
- role MVP z `07-UPRAWNIENIA.md`;
- powłoka aplikacji: dashboard, sidebar, przełącznik workspace i centrum powiadomień;
- moduł Assets: lista, dodawanie, szczegóły, edycja i archiwizacja;
- historia ostatnich działań dla zdarzeń dostępnych w MVP;
- stany puste, błędy, loading i brak uprawnień dla każdego ekranu.

### Poza pierwszym zakresem

- QR, Locations, Documents, Warranty, Tasks, Tickets, Projects, Calendar i Reports;
- aplikacje mobilna i desktopowa;
- role niestandardowe, zespoły, goście i uprawnienia per rekord;
- MFA, SSO i logowanie społecznościowe;
- samodzielne odtwarzanie backupu;
- funkcje nieopisane w dokumentacji.

Pozycje poza pierwszym zakresem mogą wejść do kolejnych etapów dopiero po utworzeniu pełnej specyfikacji modułu.

## Ścieżka od zakupu do pierwszego użycia

1. Użytkownik otwiera stronę marketingową i przechodzi do strony planów.
2. Wybiera zatwierdzony plan i rozpoczyna zakup.
3. Tworzy konto właściciela, podając imię, nazwisko, e-mail i hasło oraz akceptując wymagane zgody.
4. Przechodzi do bezpiecznego checkoutu operatora płatności.
5. Po potwierdzeniu płatności wraca na ekran sukcesu WorkLive.
6. System tworzy dostęp właściciela do onboardingu; nie tworzy automatycznie niekompletnego workspace przed potwierdzeniem wymaganych danych.
7. Użytkownik przechodzi onboarding: informacje o firmie, podsumowanie workspace i opcjonalne zaproszenie zespołu.
8. Po zakończeniu trafia na Dashboard nowego workspace.
9. Dashboard pokazuje stan pusty oraz Quick Action „Dodaj pierwszy zasób”.
10. Użytkownik tworzy pierwszy zasób i przechodzi do jego szczegółów.
11. Po powrocie Dashboard pokazuje aktualną liczbę zasobów i zdarzenie w Recent Activity.

Jeżeli płatność została potwierdzona, ale użytkownik przerwie onboarding, po kolejnym logowaniu wraca do pierwszego niezakończonego kroku. Dokładne plany, ceny, podatki, okres próbny, operator checkoutu i obsługa nieudanej płatności wymagają osobnej decyzji przed implementacją zakupu.

## Kolejność ekranów

### Nowy klient

1. Strona planów.
2. Utworzenie konta.
3. Checkout.
4. Potwierdzenie zakupu.
5. Onboarding — powitanie.
6. Onboarding — dane firmy.
7. Onboarding — podsumowanie workspace.
8. Onboarding — zaproszenie pracowników, krok opcjonalny.
9. Onboarding — gotowe.
10. Dashboard.
11. Assets — pusty stan listy.
12. Assets — formularz nowego zasobu.
13. Assets — szczegóły zasobu.

### Powracający użytkownik

1. Login.
2. Wybór workspace, tylko jeśli konto ma więcej niż jedno aktywne członkostwo.
3. Dashboard aktywnego workspace.

### Zaproszony pracownik

1. Ekran zaproszenia z nazwą workspace i przypisaną rolą.
2. Login albo utworzenie konta.
3. Akceptacja zaproszenia.
4. Dashboard workspace w granicach przypisanych uprawnień.

## Powłoka aplikacji

Po zalogowaniu każdy ekran używa tej samej powłoki:

- sidebar z aktywnym workspace i nawigacją;
- nagłówek treści z nazwą bieżącego ekranu;
- centrum powiadomień;
- menu użytkownika;
- obszar treści ze stanami loading, empty, error i access denied.

Na małych ekranach sidebar jest zamykanym panelem. Jego zamknięcie nie zmienia aktywnego workspace ani bieżącej trasy.

## Dashboard

Dashboard odpowiada na trzy pytania: w jakim workspace pracuję, co wymaga uwagi i co wydarzyło się ostatnio.

### Informacje widoczne w pierwszym MVP

- nazwa aktywnego workspace;
- powitanie użytkownika;
- liczba wszystkich niearchiwalnych zasobów;
- liczba aktywnych zasobów;
- liczba zasobów wyłączonych z użycia;
- Quick Actions dostępne dla bieżącej roli;
- Recent Activity z ostatnimi zdarzeniami workspace widocznymi dla roli;
- Upcoming Tasks;
- Upcoming Warranties.

Dashboard nie pokazuje wartości `0` jako substytutu niedostępnego modułu. Jeśli Tasks lub Warranty nie są jeszcze aktywne, karta pokazuje stan „Moduł nie jest jeszcze dostępny” bez aktywnej akcji. Po wdrożeniu modułu karta pokazuje jego rzeczywisty pusty stan albo dane.

## Quick Actions

W pierwszym MVP:

- **Dodaj zasób** — dla Właściciela, Administratora i Kierownika;
- **Zobacz zasoby** — dla każdej roli z prawem odczytu;
- **Zaproś pracownika** — dla Właściciela i Administratora;
- **Ustawienia workspace** — dla ról uprawnionych do ustawień.

Akcja niewłaściwa dla roli nie jest wyświetlana. Quick Actions nie zastępują pełnej nawigacji.

## Recent Activity

Lista pokazuje najnowsze zdarzenia audytowe czytelne dla człowieka: utworzenie, edycję lub archiwizację zasobu, utworzenie workspace, zaproszenie, przyjęcie zaproszenia i zmianę roli. Każdy wpis zawiera aktora, akcję, obiekt, czas oraz link do obiektu, jeśli nadal istnieje i użytkownik ma dostęp.

MVP pokazuje ograniczoną listę najnowszych wpisów. Pełny ekran historii, filtry i eksport są przyszłym rozszerzeniem.

## Upcoming Tasks

Karta docelowo pokazuje najbliższe nieukończone zadania dostępne dla użytkownika, uporządkowane według terminu. Element zawiera tytuł, termin i status. Zakres danych, liczba pozycji i akcje wymagają specyfikacji modułu Tasks.

Do czasu wdrożenia Tasks karta pozostaje nieaktywna i nie może inicjować tworzenia zadania.

## Upcoming Warranties

Karta docelowo pokazuje gwarancje dostępnych zasobów z najbliższą datą zakończenia. Element zawiera nazwę zasobu i datę końca gwarancji. Okno czasowe, sortowanie i akcje wymagają specyfikacji modułu Warranty.

Do czasu wdrożenia Warranty karta pozostaje nieaktywna i nie może zbierać danych gwarancyjnych w Assets.

## Sidebar

Sidebar MVP zawiera:

1. identyfikację WorkLive;
2. przełącznik aktywnego workspace;
3. Dashboard;
4. Assets;
5. sekcję administracyjną z członkami i ustawieniami, widoczną według roli;
6. menu użytkownika z profilem i wylogowaniem.

Pozycje przyszłych modułów nie są pokazywane przed ich aktywacją. Sidebar można zwinąć na szerokim ekranie; ikony zachowują dostępne etykiety.

## Workspace

Workspace jest zawsze widocznym kontekstem firmy. Właściciel tworzy go w onboardingu. MVP obejmuje nazwę firmy, domyślną strefę czasową, status workspace, członków i role. Zmiana workspace jest dostępna tylko użytkownikom należącym do więcej niż jednego workspace i powoduje ponowne wyznaczenie danych oraz uprawnień.

Ustawienia workspace, członkowie i zaproszenia są ekranami administracyjnymi. Szczegółowy UX opisuje `ux/WORKSPACE.md`.

## Assets — pierwszy moduł biznesowy

Assets służy do prowadzenia podstawowej ewidencji maszyn, urządzeń, narzędzi i innych zasobów firmy.

### Zakres MVP Assets

- lista zasobów;
- wyszukiwanie po nazwie, identyfikatorze, producencie, modelu lub numerze seryjnym;
- filtrowanie po statusie;
- utworzenie zasobu;
- szczegóły zasobu;
- edycja zasobu;
- archiwizacja z potwierdzeniem;
- historia zmian zasobu dostępna rolom uprawnionym do audytu.

### Minimalne dane zasobu

- nazwa — wymagana;
- identyfikator wewnętrzny — wymagany i unikalny w workspace;
- status — wymagany: Aktywny lub Wyłączony z użycia;
- opis — opcjonalny;
- producent — opcjonalny;
- model — opcjonalny;
- numer seryjny — opcjonalny.

Archiwizacja nie jest statusem biznesowym i usuwa rekord z domyślnej listy bez trwałego kasowania. Lokalizacja, QR, dokumenty i gwarancja nie są polami zastępczymi w Assets; pojawią się jako relacje po wdrożeniu odpowiednich modułów.

## Notifications

MVP zawiera centrum powiadomień w aplikacji. Powiadomienie ma tytuł, krótki opis, czas, stan przeczytane/nieprzeczytane i opcjonalny link do dostępnego rekordu.

Zdarzenia MVP:

- zaproszenie do workspace — dla osoby zaproszonej;
- przyjęcie zaproszenia — dla zapraszającego;
- zmiana roli lub odebranie członkostwa — dla użytkownika, którego dotyczy zmiana;
- informacja o stanie zakupu wymagającym działania — dla Właściciela, po zatwierdzeniu przepływu płatności.

Powiadomienia o zadaniach i gwarancjach należą odpowiednio do przyszłych specyfikacji Tasks i Warranty. E-mail w MVP obsługuje wyłącznie przepływy wymagające dotarcia poza aplikacją, takie jak zaproszenie i odzyskanie hasła. Preferencje, push, digest i masowe oznaczanie są przyszłym rozszerzeniem.

## Stany globalne i błędy

- brak danych prowadzi do jednej, właściwej dla roli akcji startowej;
- brak uprawnień nie ujawnia chronionych danych i wyjaśnia ograniczenie;
- błąd sieci pozwala ponowić bez utraty bezpiecznie zachowanych danych formularza;
- konflikt unikalnego identyfikatora zasobu jest pokazany przy polu;
- niedostępny moduł jest oznaczony jako niedostępny, nie jako pusty;
- nieudany zakup nie tworzy aktywnej subskrypcji ani kompletnego workspace;
- wygaśnięte lub unieważnione zaproszenie wyjaśnia potrzebę kontaktu z administratorem.

## Kryterium pierwszego użycia

Pierwsze użycie jest zakończone, gdy właściciel ma aktywny workspace i utworzył pierwszy zasób albo świadomie zakończył onboarding na Dashboardzie z dostępną akcją „Dodaj pierwszy zasób”.

## Decyzje otwarte blokujące implementację

- model cenowy, plan, waluta, podatki i okres próbny;
- operator oraz szczegółowy kontrakt checkoutu;
- obowiązkowe zgody przy rejestracji;
- limity subskrypcji;
- czas ważności zaproszenia i linku resetu hasła;
- limit pozycji Recent Activity;
- pełny kontrakt danych i zachowań Notifications;
- specyfikacje modułów Warranty i Tasks przed aktywacją ich kart.
