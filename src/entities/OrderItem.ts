export interface OrderItem {
  net_price: number; // numeric(19,4)
  quantity: number; // integer
  net_total?: number; // numeric(19,4)
  total?: number; // numeric(19,4)
}
