import { calculateOrderTax } from '../src/services/calculateOrderTax';
import type { OrderItem } from '../src/entities/OrderItem';

describe('calculateOrderTax', () => {
  it('funkcja powinna poprawnie obliczyć sumę podatku dla kilku pozycji', () => {
    const items: OrderItem[] = [
      { net_price: 100, quantity: 1, net_total: 100 },
      { net_price: 50, quantity: 2, net_total: 100 },
      { net_price: 25, quantity: 4, net_total: 100 },
    ];
    const taxRate = 10;
    const result = calculateOrderTax(items, taxRate);
    expect(result).toBeCloseTo(30, 4);
  });

  it('funkcja powinna zwrócić 0, gdy lista jest pusta', () => {
    const items: OrderItem[] = [];
    const taxRate = 10;
    const result = calculateOrderTax(items, taxRate);
    expect(result).toBe(0);
  });

  it('powinna rzucić błąd, gdy któreś net_total jest undefined', () => {
    const items: OrderItem[] = [
      { net_price: 100, quantity: 1, net_total: 100 },
      { net_price: 50, quantity: 2 }, // brak net_total
    ];
    const taxRate = 10;
    expect(() => calculateOrderTax(items, taxRate)).toThrow(
      'net_total musi być zdefiniowane'
    );
  });

  it('powinna rzucić błąd, gdy któreś net_total jest null', () => {
    const items: OrderItem[] = [
      { net_price: 20, quantity: 1, net_total: null as any },
    ];
    const taxRate = 10;
    expect(() => calculateOrderTax(items, taxRate)).toThrow(
      'net_total musi być zdefiniowane'
    );
  });

  it('powinna rzucić błąd, gdy któryś net_total jest ujemne', () => {
    const items: OrderItem[] = [
      { net_price: 100, quantity: 1, net_total: -50 },
    ];
    const taxRate = 10;
    expect(() => calculateOrderTax(items, taxRate)).toThrow(
      'net_total nie może być ujemne'
    );
  });

  it('powinna poprawnie obliczyć podatek przy zerowym taxRate', () => {
    const items: OrderItem[] = [
      { net_price: 100, quantity: 1, net_total: 100 },
    ];
    const taxRate = 0;
    const result = calculateOrderTax(items, taxRate);
    expect(result).toBe(0);
  });

  it('powinna poprawnie obsłużyć bardzo duże wartości net_total', () => {
    const items: OrderItem[] = [
      { net_price: 1e12, quantity: 1, net_total: 1e12 },
      { net_price: 1e13, quantity: 1, net_total: 1e13 },
    ];
    const taxRate = 5;
    const result = calculateOrderTax(items, taxRate);
    expect(result).toBeCloseTo(5.5e11, 4);
  });

  it('powinna rzucić błąd przy ujemnym taxRate', () => {
    const items: OrderItem[] = [
      { net_price: 200, quantity: 1, net_total: 200 },
    ];
    const taxRate = -10;
    expect(() => calculateOrderTax(items, taxRate)).toThrow(
      'taxRate nie może być ujemny'
    );
  });

  it('powinna rzucić błąd, gdy taxRate nie jest liczbą skończoną', () => {
    const items: OrderItem[] = [
      { net_price: 100, quantity: 1, net_total: 100 },
    ];
    expect(() => calculateOrderTax(items, NaN)).toThrow(
      'taxRate musi być liczbą skończoną'
    );
    expect(() => calculateOrderTax(items, Infinity)).toThrow(
      'taxRate musi być liczbą skończoną'
    );
  });
});
