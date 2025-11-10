import type { OrderItem } from './OrderItem';

export interface Order {
  net_total?: number; // decimal(15,4)
  tax?: number; // decimal(15,4)
  total?: number; // decimal(15,4)
  items: OrderItem[];
}
