export interface OrderItemAttributes {
  id: number;
  order_id: number;
  inventory_id: number;
  quantity: number;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface CreateOrderItemData {
  order_id: number;
  inventory_id: number;
  quantity: number;
  price: number;
}

export interface CreateOrderItemData {
  order_id: number;
  inventory_id: number;
  quantity: number;
  price: number;
}

export interface UpdateOrderItemData {
  quantity?: number;
  price?: number;
}
