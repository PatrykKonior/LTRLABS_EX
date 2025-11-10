import type { OrderItem } from '../entities/OrderItem';

export function calculateItemNetTotal(item: OrderItem): OrderItem {
  if (item.net_price === undefined || item.quantity === undefined) {
    throw new Error('net_price oraz quantity muszą być określone');
  }
  if (item.net_price < 0 || item.quantity < 0) {
    throw new Error('net_price oraz quantity muszą być nieujemne');
  }
  const net_total = item.net_price * item.quantity;
  return { ...item, net_total };
}
