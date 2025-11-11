import type { OrderItem } from '../entities/OrderItem';

export function calculateOrderTax(items: OrderItem[], taxRate: number): number {
  if (!Number.isFinite(taxRate)) {
    throw new Error('taxRate musi być liczbą skończoną');
  }
  if (taxRate < 0) {
    throw new Error('taxRate nie może być ujemny');
  }

  return items.reduce((sum, item) => {
    if (item.net_total === undefined || item.net_total === null) {
      throw new Error('net_total musi być zdefiniowane');
    }
    if (!Number.isFinite(item.net_total)) {
      throw new Error('net_total musi być liczbą');
    }
    if (item.net_total < 0) {
      throw new Error('net_total nie może być ujemne');
    }
    return sum + (item.net_total * taxRate) / 100;
  }, 0);
}
