import type { OrderItem } from '../entities/OrderItem';

export function calculateItemTotal(
  item: OrderItem,
  taxRate: number
): OrderItem {
  if (item.net_total === undefined) {
    throw new Error('net_total musi zostać policzony przed total');
  }
  if (item.net_total < 0) {
    throw new Error('net_total nie może być ujemne');
  }
  if (taxRate < 0) {
    throw new Error('taxRate nie może być ujemny');
  }
  const total = item.net_total * (1 + taxRate / 100);
  return { ...item, total };
}
