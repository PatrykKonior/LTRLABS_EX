import { calculateItemNetTotal } from '../src/services/calculateItemNetTotal';
import type { OrderItem } from '../src/entities/OrderItem';

describe('calculateItemNetTotal', () => {
  it('funkcja powinna poprawnie obliczyć net_total dla typowego elementu', () => {
    const input: OrderItem = { net_price: 100, quantity: 3 };
    const result = calculateItemNetTotal(input);
    expect(result.net_total).toBeCloseTo(300);
    expect(result.net_price).toBe(100);
    expect(result.quantity).toBe(3);
  });

  it('funkcja powinna obsłużyć zero w quantity', () => {
    const input: OrderItem = { net_price: 50, quantity: 0 };
    const result = calculateItemNetTotal(input);
    expect(result.net_total).toBe(0);
  });

  it('funkcja powinna obsłużyć zero w net_price', () => {
    const input: OrderItem = { net_price: 0, quantity: 10 };
    const result = calculateItemNetTotal(input);
    expect(result.net_total).toBe(0);
  });

  it('funkcja powinna obsłużyć ułamkowe wartości net_price i quantity', () => {
    const input: OrderItem = { net_price: 12.3456, quantity: 2.5 };
    const result = calculateItemNetTotal(input);
    expect(result.net_total).toBeCloseTo(30.864);
  });

  it('funkcja powinna rzucić błąd przy ujemnej wartości net_price', () => {
    const input: OrderItem = { net_price: -10, quantity: 2 };
    expect(() => calculateItemNetTotal(input)).toThrow(
      'net_price oraz quantity muszą być nieujemne'
    );
  });

  it('funkcja powinna rzucić błąd przy ujemnej wartości quantity', () => {
    const input: OrderItem = { net_price: 10, quantity: -2 };
    expect(() => calculateItemNetTotal(input)).toThrow(
      'net_price oraz quantity muszą być nieujemne'
    );
  });

  it('funkcja powinna poprawnie obliczyć bardzo duże wartości', () => {
    const input: OrderItem = { net_price: 1e10, quantity: 1e5 };
    const result = calculateItemNetTotal(input);
    expect(result.net_total).toBeCloseTo(1e15);
  });

  it('funkcja powinna rzucić błąd jeśli brakuje net_price lub quantity', () => {
    // @ts-expect-error celowo brak pola net_price
    expect(() => calculateItemNetTotal({ quantity: 1 })).toThrow();

    // @ts-expect-error celowo brak pola quantity
    expect(() => calculateItemNetTotal({ net_price: 10 })).toThrow();
  });
});
