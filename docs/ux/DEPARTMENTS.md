# Departments — UX basics

> Status: frontend Sprintu 5 na danych mockowanych

## Cel i ekran

Departments porządkuje odpowiedzialność za zgłoszenia. `/departments` pokazuje IT, Utrzymanie ruchu, Produkcję, Jakość, Magazyn i Administrację wraz z kodem, opisem, kierownikiem i liczbą członków.

Kliknięcie działu otwiera Sheet szczegółów z kierownikiem i listą członków. Użytkownik może mockowo przenieść osobę do działu albo usunąć ją z działu; kierownika nie można usunąć tą akcją.

## Dane i przyszły rozwój

Dział zawiera `id`, nazwę, kod, opis i `leadId`. Osoba wskazuje dział przez `departmentId`. Zmiany istnieją tylko w lokalnym stanie ekranu. Tworzenie działów, wiele działów na osobę, zastępstwa, reguły routingu Tickets, uprawnienia i audyt wymagają osobnej dokumentacji.
