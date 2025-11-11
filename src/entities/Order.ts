import type { OrderItem } from './OrderItem';

export interface Order {
  net_total?: number; // numeric(19,4)
  tax?: number; // numeric(19,4)
  total?: number; // numeric(19,4)
  items: OrderItem[];
}
