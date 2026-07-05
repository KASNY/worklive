# Design system

Współdzielony system interfejsu będzie rozwijany w `packages/ui` przy użyciu Tailwind CSS i shadcn/ui. Komponenty mają działać w jasnym i ciemnym motywie.

## Jasny motyw

Tło `#F8FAFC`, powierzchnie `#FFFFFF`, tekst `#111827`, tekst pomocniczy `#64748B`, obramowania `#E5E7EB`, akcje `#2563EB`.

## Ciemny motyw

Bazą jest `#0F172A`, a kolor `#2563EB` pozostaje akcentem. Konkretne tokeny powierzchni, tekstu, obramowań, hover, focus oraz statusów muszą zostać zatwierdzone po badaniu kontrastu — nie należy ich zgadywać w kodzie.

## Zasady

- tokeny zamiast surowych kolorów w komponentach;
- wspólna skala odstępów, promieni, typografii i cieni;
- stan focus co najmniej tak czytelny jak hover;
- kolor nie jest jedynym nośnikiem znaczenia;
- przełącznik: jasny, ciemny i ustawienie systemowe.

Logo, font oraz kolory semantyczne pozostają do decyzji.
