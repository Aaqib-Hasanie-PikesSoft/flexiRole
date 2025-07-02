export interface OrderAttributes {
  id: number;
  user_id: number;
  order_date: Date;
  order_status: string;
  total_amount: number;
  created_at: Date;
  updated_at: Date;
}
