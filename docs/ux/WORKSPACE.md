# Workspace — UX

> Status: specyfikacja MVP do akceptacji

## Cel i użytkownicy

Workspace zapewnia jednoznaczny kontekst firmy i izoluje jej dane. Wszyscy członkowie widzą nazwę aktywnego workspace; ustawieniami i członkostwem zarządzają wyłącznie uprawnione role.

## Ekrany i sekcje

### Przełącznik workspace

W sidebarze pokazuje nazwę aktywnego workspace. Po otwarciu wyświetla dostępne workspace wraz z rolą. Pole wyszukiwania pojawi się dopiero po udokumentowaniu potrzeby.

### Ustawienia ogólne

- nazwa workspace;
- domyślna strefa czasowa;
- status tylko do odczytu, jeśli użytkownik nie ma uprawnienia do zmiany;
- zapis zmian.

### Członkowie

- lista: imię i nazwisko, e-mail, rola, status członkostwa;
- akcja zaproszenia;
- zmiana roli w dozwolonych granicach;
- dezaktywacja członkostwa;
- ponowienie lub unieważnienie oczekującego zaproszenia.

### Zaproś pracownika

Formularz lub dialog zawiera e-mail i rolę oraz jasną informację, do którego workspace zostanie wysłane zaproszenie.

## Akcje użytkownika

- przełączenie workspace;
- edycja zatwierdzonych ustawień;
- przegląd członków;
- zaproszenie pracownika;
- ponowienie lub unieważnienie zaproszenia;
- zmiana roli albo dezaktywacja członkostwa zgodnie z uprawnieniami.

## Dane

- identyfikator, nazwa, status i strefa czasowa workspace;
- aktywna rola bieżącego użytkownika;
- członkowie: konto, rola i status;
- zaproszenia: e-mail, rola, status, autor i czas utworzenia.

## Stany i błędy

- użytkownik jednego workspace nie widzi zbędnej listy przełączania;
- pusty stan członków zachęca uprawnionego użytkownika do zaproszenia;
- brak uprawnień usuwa akcje edycji, ale nie ukrywa aktywnego kontekstu;
- konflikt nazwy nie jest zakładany, ponieważ nazwa nie musi być globalnie unikalna;
- wygasłe lub unieważnione zaproszenie nie może zostać zaakceptowane;
- odebranie ostatniego Właściciela jest zabronione.

## Przyszłe rozszerzenia

Branding workspace, dane formalne firmy, preferencje regionalne, transfer własności, eksport, zamknięcie workspace, zespoły i dostęp gościnny.
