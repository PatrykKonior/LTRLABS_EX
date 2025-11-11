import { calculateItemTotal } from '../src/services/calculateItemTotal';
import type { OrderItem } from '../src/entities/OrderItem';

describe('calculateItemTotal', () => {
  it('powinien poprawnie obliczyć total dla typowego elementu', () => {
    const input: OrderItem = { net_price: 100, quantity: 3, net_total: 300 };
    const taxRate = 10;
    const result = calculateItemTotal(input, taxRate);
    expect(result.total).toBeCloseTo(330, 4);
  });

  it('powinien obsłużyć zero jako net_total', () => {
    const input: OrderItem = { net_price: 0, quantity: 5, net_total: 0 };
    const taxRate = 15;
    const result = calculateItemTotal(input, taxRate);
    expect(result.total).toBeCloseTo(0, 4);
  });

  it('powinien obsłużyć zerowy podatek', () => {
    const input: OrderItem = { net_price: 100, quantity: 1, net_total: 100 };
    const taxRate = 0;
    const result = calculateItemTotal(input, taxRate);
    expect(result.total).toBeCloseTo(100, 4);
  });

  it('powinien obsłużyć ułamkowy podatek i net_total', () => {
    const input: OrderItem = {
      net_price: 12.3456,
      quantity: 2.5,
      net_total: 30.864,
    };
    const taxRate = 7.5;
    const result = calculateItemTotal(input, taxRate);
    expect(result.total).toBeCloseTo(33.1788, 4);
  });

  it('powinien zgłosić błąd, jeśli net_total jest niezdefiniowane', () => {
    const input = { net_price: 100, quantity: 2 } as OrderItem;
    const taxRate = 10;
    expect(() => calculateItemTotal(input, taxRate)).toThrow(
      'net_total musi zostać policzony przed total'
    );
  });

  it('powinien obsłużyć bardzo dużą wartość net_total', () => {
    const input: OrderItem = { net_price: 1e12, quantity: 2, net_total: 2e12 };
    const taxRate = 5;
    const result = calculateItemTotal(input, taxRate);
    expect(result.total).toBeCloseTo(2.1e12, 4);
  });

  it('powinien zgłosić błąd przy ujemnym taxRate', () => {
    const input: OrderItem = { net_price: 200, quantity: 1, net_total: 200 };
    const taxRate = -10;
    expect(() => calculateItemTotal(input, taxRate)).toThrow(
      'taxRate nie może być ujemny'
    );
  });
});
