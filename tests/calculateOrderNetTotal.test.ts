import { calculateOrderNetTotal } from '../src/services/calculateOrderNetTotal';
import type { OrderItem } from '../src/entities/OrderItem';

describe('calculateOrderNetTotal', () => {
  it('powinien poprawnie zsumować net_total z kilku pozycji', () => {
    const items: OrderItem[] = [
      { net_price: 100, quantity: 1, net_total: 100 },
      { net_price: 50, quantity: 2, net_total: 100 },
      { net_price: 25, quantity: 4, net_total: 100 },
    ];
    const result = calculateOrderNetTotal(items);
    expect(result).toBeCloseTo(300);
  });

  it('powinien zwrócić 0, gdy lista jest pusta', () => {
    const items: OrderItem[] = [];
    const result = calculateOrderNetTotal(items);
    expect(result).toBe(0);
  });

  it('powinien zgłosić błąd gdy pozycja ma net_total undefined', () => {
    const items: OrderItem[] = [
      { net_price: 100, quantity: 1, net_total: 100 },
      { net_price: 50, quantity: 2 }, // net_total undefined
    ];
    expect(() => calculateOrderNetTotal(items)).toThrow(
      'net_total musi być zawsze zdefiniowane i niepuste'
    );
  });

  it('powinien zgłosić błąd gdy pozycja ma net_total null', () => {
    const items: OrderItem[] = [
      { net_price: 20, quantity: 1, net_total: null as any },
    ];
    expect(() => calculateOrderNetTotal(items)).toThrow(
      'net_total musi być zawsze zdefiniowane i niepuste'
    );
  });

  it('powinien poprawnie zsumować wartości z net_total równym zero', () => {
    const items: OrderItem[] = [
      { net_price: 100, quantity: 1, net_total: 0 },
      { net_price: 50, quantity: 1, net_total: 50 },
    ];
    const result = calculateOrderNetTotal(items);
    expect(result).toBeCloseTo(50);
  });

  it('powinien zgłosić błąd, gdy pojawia się ujemny net_total', () => {
    const items: OrderItem[] = [
      { net_price: 100, quantity: 1, net_total: 100 },
      { net_price: 50, quantity: 1, net_total: -20 },
    ];
    expect(() => calculateOrderNetTotal(items)).toThrow(
      'net_total nie może być ujemne'
    );
  });

  it('powinien poprawnie zsumować bardzo duże wartości net_total', () => {
    const items: OrderItem[] = [
      { net_price: 1e12, quantity: 1, net_total: 1e12 },
      { net_price: 1e13, quantity: 1, net_total: 1e13 },
    ];
    const result = calculateOrderNetTotal(items);
    expect(result).toBeCloseTo(1.1e13);
  });
});
