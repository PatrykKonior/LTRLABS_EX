import type { Order } from '../entities/Order';
import {
  calculateItemNetTotal,
  calculateItemTotal,
  calculateOrderNetTotal,
  calculateOrderTax,
} from '../index';

export function calculateOrderTotals(order: Order, taxRate: number): Order {
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
