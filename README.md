# LTRLABS_ZADANIE

## Opis zadania

Zadanie polega na uzupełnieniu wartości finansowych (net_total, tax, total) dla dwóch encji: Order i OrderItem.  
Order składa się z wielu OrderItem, gdzie dla każdej pozycji podana jest cena netto jednostkowa oraz ilość.  
Należy obliczyć wartość netto i brutto pozycji oraz całego zamówienia, uwzględniając wysokość podatku w procentach.

---

## Struktura projektu

- `src/entities/` – definicje encji Order oraz OrderItem (typy danych w TS)
- `src/services/` – logika obliczeń uzupełniających wartości
- `tests/` – testy jednostkowe

---

## Jak używać

1. Zainstaluj zależności:

npm install

2. Uruchom testy:

npm test

3. Opcjonalnie skompiluj projekt:

npm run build

---

## Technologie

- TypeScript
- Jest (testy)
- Node.js

---

## Odpowiedź na pierwsze zadanie

### Typy w bazie danych

Wszystkie wartości finansowe (`net_total`, `tax`, `total`, `net_price`) przechowywane są jako decimal(15,4),
co oznacza maksymalnie 15 cyfr z 4 miejscami po przecinku.  
Pole `quantity` przechowuje jako integer, ponieważ reprezentuje liczbę całkowitą sztuk.

### Dlaczego?

- Typ `decimal(15,4)` zapewnia precyzję niezbędną do prawidłowych obliczeń finansowych, unikając błędów zaokrągleń typowych dla typów zmiennoprzecinkowych (float/double).
- Typ `integer` jest naturalny dla ilości rzeczywistych sztuk produktu.

### Implementacja w TypeScript

Encje w projekcie definiuję jako interfejsy z typem `number` dla wartości liczbowych, co odpowiada typom w bazie danych, choć w TS `number` reprezentuje wszystkie liczby zmiennoprzecinkowe i całkowite.

---

## Odpowiedź na drugie zadanie

### Implementacja

Kod został zorganizowany modułowo, gdzie każda funkcja realizuje ściśle określoną odpowiedzialność:

calculateItemNetTotal - oblicza net_total pozycji na podstawie net_price i quantity.

calculateItemTotal - oblicza wartość brutto pozycji total, korzystając z net_total i procentowej stawki podatku; umożliwia ujemny podatek (np. rabaty).

calculateOrderNetTotal - sumuje wartości net_total wszystkich pozycji, walidując nieujemność i obecność.

calculateOrderTax - sumuje podatek na podstawie net_total i podatku procentowego z walidacją poprawności danych.

calculateOrderTotals - funkcja agregująca, która wywołuje powyższe obliczenia, uzupełniając całe zamówienie o brakujące wartości finansowe.

### Testy i TDD

Wszystkie funkcje posiadają kompletne testy jednostkowe, obejmujące:

- typowe przypadki i wartości brzegowe, np. zero, duże liczby, ułamki

- sytuacje niepoprawne – sprawdzenie błędów dla ujemnych i brakujących wartości,

- obsługę ujemnych stawek podatku (korekty, rabaty)

Projekt realizowany był zgodnie z metodyką Test-Driven Development (TDD):

- Najpierw powstawały testy dla danej funkcji (również brzegowe).

- Następnie kod był implementowany tak, aby przechodził te testy.

- Testy gwarantują odporność na błędy, łatwą rozbudowę i jasne zachowanie funkcji.

### Architektura projektu

- Każda funkcja została umieszczona w osobnym pliku w src/services/, co zwiększa modularność, czytelność i umożliwia łatwe testowanie.

- Plik src/index.ts służy jako centralny punkt eksportu funkcji, ułatwiając importy i rozwój projektu.

- Struktura projektu ułatwia skalowanie i dodawanie kolejnych funkcjonalności.
