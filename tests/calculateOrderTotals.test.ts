import { calculateOrderTotals } from '../src/services/calculateOrderTotals';
import type { Order } from '../src/entities/Order';

describe('calculateOrderTotals', () => {
  it('powinna poprawnie policzyć wszystkie wartości dla zamówienia z kilkoma pozycjami', () => {
    const order: Order = {
      items: [
        { net_price: 100, quantity: 2 },
        { net_price: 50, quantity: 3 },
      ],
    };
    const taxRate = 10;

    const result = calculateOrderTotals(order, taxRate);

    expect(result.net_total).toBeCloseTo(350);
    expect(result.tax).toBeCloseTo(35);
    expect(result.total).toBeCloseTo(385);

    expect(result.items[0]!.net_total).toBeCloseTo(200);
    expect(result.items[0]!.total).toBeCloseTo(220);
    expect(result.items[1]!.net_total).toBeCloseTo(150);
    expect(result.items[1]!.total).toBeCloseTo(165);
  });

  it('powinna obsłużyć puste zamówienie', () => {
    const order: Order = { items: [] };
    const taxRate = 10;

    const result = calculateOrderTotals(order, taxRate);

    expect(result.net_total).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.total).toBe(0);
    expect(result.items.length).toBe(0);
  });

  it('powinna rzucić błąd, gdy któraś z funkcji wewnętrznych napotka nieprawidłowe dane', () => {
    const order: Order = {
      items: [{ net_price: 100, quantity: -1 }],
    };
    const taxRate = 10;

    expect(() => calculateOrderTotals(order, taxRate)).toThrow();
  });

  it('powinna rzucić błąd przy ujemnym taxRate', () => {
    const order: Order = {
      items: [{ net_price: 100, quantity: 1 }],
    };
    const taxRate = -10;

    expect(() => calculateOrderTotals(order, taxRate)).toThrow(
      'taxRate nie może być ujemny'
    );
  });
});
