import { Optional } from "sequelize";

export interface InventoryAttributes {
  id: number;
  product_name: string;
  stock_quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateInventoryData
  extends Optional<InventoryAttributes, "id" | "created_at" | "updated_at"> {}

export interface UpdateInventoryData {
  product_name?: string;
  stock_quantity?: number;
  price?: number;
}
