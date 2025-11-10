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
