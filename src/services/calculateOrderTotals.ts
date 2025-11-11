import type { Order } from '../entities/Order';
import {
  calculateItemNetTotal,
  calculateItemTotal,
  calculateOrderNetTotal,
  calculateOrderTax,
} from '../index';

export function calculateOrderTotals(order: Order, taxRate: number): Order {
  if (!Number.isFinite(taxRate)) {
    throw new Error('taxRate musi być liczbą skończoną');
  }
  if (taxRate < 0) {
    throw new Error('taxRate nie może być ujemny');
  }

  const itemsWithNetTotal = order.items.map(calculateItemNetTotal);
  const itemsWithTotal = itemsWithNetTotal.map((item) =>
    calculateItemTotal(item, taxRate)
  );

  const net_total = calculateOrderNetTotal(itemsWithTotal);
  const tax = calculateOrderTax(itemsWithTotal, taxRate);
  const total = net_total + tax;

  return {
    ...order,
    items: itemsWithTotal,
    net_total,
    tax,
    total,
  };
}
