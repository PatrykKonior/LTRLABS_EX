import type { OrderItem } from '../entities/OrderItem';

export function calculateOrderNetTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => {
    if (item.net_total === undefined || item.net_total === null) {
      throw new Error('net_total musi być zawsze zdefiniowane i niepuste');
    }
    if (item.net_total < 0) {
      throw new Error('net_total nie może być ujemne');
    }
    return sum + item.net_total;
  }, 0);
}
