export interface OrderItem {
  net_price: number; // decimal(15,4)
  quantity: number; // integer
  net_total?: number; // decimal(15,4)
  total?: number; // decimal(15,4)
}
