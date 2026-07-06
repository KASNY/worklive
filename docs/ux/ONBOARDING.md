# Onboarding — UX

> Status: specyfikacja MVP do akceptacji

## Cel i użytkownicy

Onboarding prowadzi nowego Właściciela od potwierdzonego zakupu do gotowego workspace i pierwszego zasobu. Nie jest prezentowany zwykłemu członkowi przyjmującemu zaproszenie.

## Ekrany i sekcje

### 1. Powitanie

- nazwa WorkLive;
- krótkie wyjaśnienie rezultatu procesu;
- wskaźnik kroków;
- akcja „Rozpocznij”.

### 2. Dane firmy

- nazwa firmy/workspace — wymagana;
- domyślna strefa czasowa — wymagana, wstępnie proponowana;
- akcje „Dalej” i „Wstecz”.

### 3. Podsumowanie workspace

- nazwa firmy;
- strefa czasowa;
- informacja, że użytkownik zostanie Właścicielem;
- akcja utworzenia workspace.

### 4. Zaproszenie zespołu

- lista wierszy e-mail i rola;
- dodanie kolejnego zaproszenia;
- usunięcie niepotrzebnego wiersza;
- akcja wysłania;
- jawna akcja „Pomiń na razie”.

### 5. Gotowe

- potwierdzenie utworzenia workspace;
- skrót następnego kroku;
- główna akcja „Przejdź do Dashboardu”;
- dodatkowa akcja „Dodaj pierwszy zasób”, prowadząca do formularza Assets.

## Akcje użytkownika

- przechodzenie wstecz i dalej;
- poprawienie danych przed utworzeniem workspace;
- utworzenie workspace;
- wysłanie lub pominięcie zaproszeń;
- przejście do Dashboardu albo pierwszego zasobu.

## Dane

- nazwa workspace;
- domyślna strefa czasowa;
- konto Właściciela;
- opcjonalne adresy e-mail i role zapraszanych osób;
- stan ukończenia onboardingu.

## Stany i błędy

- zapis postępu pozwala wrócić do pierwszego niezakończonego kroku;
- duplikat lub niepoprawny e-mail jest wskazany w odpowiednim wierszu;
- błąd zaproszenia nie cofa utworzenia workspace i pozwala ponowić;
- błąd utworzenia workspace nie prowadzi dalej ani nie tworzy duplikatu po ponowieniu;
- brak potwierdzonego zakupu kieruje do bezpiecznego ekranu wyjaśniającego kolejny krok.

## Przyszłe rozszerzenia

Import danych, wybór branży, szablony workspace, konfiguracja brandingu firmy i interaktywny tour. Nie należą do MVP.
