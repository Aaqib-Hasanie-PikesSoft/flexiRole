// src/modules/inventory/service.ts

import {
  CreateInventoryData,
  InventoryAttributes,
  UpdateInventoryData,
} from "src/interfaces/inventory.interface";
import { Inventory } from "./model";

export class InventoryService {
  async createProduct(data: CreateInventoryData): Promise<InventoryAttributes> {
    return await Inventory.create(data);
  }

  async getAllProducts(): Promise<InventoryAttributes[]> {
    return await Inventory.findAll();
  }

  async getProductById(id: number): Promise<InventoryAttributes | null> {
    return await Inventory.findByPk(id);
  }

  async updateProduct(
    id: number,
    data: UpdateInventoryData
  ): Promise<InventoryAttributes | null> {
    const product = await Inventory.findByPk(id);
    if (!product) {
      return null;
    }

    if (data.product_name !== undefined) {
      product.product_name = data.product_name;
    }
    if (data.stock_quantity !== undefined) {
      product.stock_quantity = data.stock_quantity;
    }
    if (data.price !== undefined) {
      product.price = data.price;
    }

    await product.save();
    return product.get() as InventoryAttributes;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await Inventory.findByPk(id);
    if (!product) {
      return false;
    }
    await product.destroy();
    return true;
  }
}
