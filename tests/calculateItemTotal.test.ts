import { calculateItemTotal } from '../src/services/calculateItemTotal';
import type { OrderItem } from '../src/entities/OrderItem';

describe('calculateItemTotal', () => {
  it('funkcja powinna poprawnie obliczyć total dla typowego elementu', () => {
    const input: OrderItem = {
      net_price: 100,
      quantity: 3,
      net_total: 300,
    };

    const taxRate = 10; // 10%
    const result = calculateItemTotal(input, taxRate);

    expect(result.total).toBeCloseTo(330); // 300 * 1.10
    expect(result.net_total).toBe(300);
  });

  it('funkcja powinna obsłużyć zero jako net_total', () => {
    const input: OrderItem = {
      net_price: 0,
      quantity: 5,
      net_total: 0,
    };

    const taxRate = 15;
    const result = calculateItemTotal(input, taxRate);

    expect(result.total).toBeCloseTo(0);
  });

  it('funkcja powinna obsłużyć zerowy podatek', () => {
    const input: OrderItem = {
      net_price: 100,
      quantity: 1,
      net_total: 100,
    };

    const taxRate = 0;
    const result = calculateItemTotal(input, taxRate);

    expect(result.total).toBeCloseTo(100);
  });

  it('funkcja powinna obsłużyć ułamkowy podatek i net_total', () => {
    const input: OrderItem = {
      net_price: 12.3456,
      quantity: 2.5,
      net_total: 30.864,
    };

    const taxRate = 7.5;
    const result = calculateItemTotal(input, taxRate);

    expect(result.total).toBeCloseTo(33.1788, 4);
  });

  it('funkcja powinna zgłosić błąd, jeśli net_total jest niezdefiniowane', () => {
    const input = {
      net_price: 100,
      quantity: 2,
    } as OrderItem; // celowe pominięcie net_total

    const taxRate = 10;

    expect(() => calculateItemTotal(input, taxRate)).toThrow(
      'net_total musi zostać policzony przed total'
    );
  });

  it('funkcja powinna obsłużyć bardzo dużą wartość net_total', () => {
    const input: OrderItem = {
      net_price: 1e12,
      quantity: 2,
      net_total: 2e12,
    };

    const taxRate = 5;
    const result = calculateItemTotal(input, taxRate);

    expect(result.total).toBeCloseTo(2.1e12);
  });

  it('funkcja powinna obsłużyć ujemny podatek (np. korekta, zwrot czy rabat)', () => {
    const input: OrderItem = {
      net_price: 200,
      quantity: 1,
      net_total: 200,
    };

    const taxRate = -10; // ujemny podatek

    const result = calculateItemTotal(input, taxRate);

    expect(result.total).toBeCloseTo(180); // 200 * 0.9
  });
});
