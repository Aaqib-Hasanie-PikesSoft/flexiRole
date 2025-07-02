// src/modules/order_items/service.ts

import {
  CreateOrderItemData,
  OrderItemAttributes,
  UpdateOrderItemData,
} from "src/enums/order-items.interface";
import { OrderItem } from "./model";

export class OrderItemService {
  async addOrderItem(data: CreateOrderItemData): Promise<OrderItemAttributes> {
    const orderItem = await OrderItem.create(data);
    return orderItem.get() as OrderItemAttributes;
  }

  async getAllOrderItems(): Promise<OrderItemAttributes[]> {
    const orderItems = await OrderItem.findAll();
    return orderItems.map((item) => item.get() as OrderItemAttributes);
  }

  async getOrderItemsByOrderId(
    order_id: number
  ): Promise<OrderItemAttributes[]> {
    const orderItems = await OrderItem.findAll({ where: { order_id } });
    return orderItems.map((item) => item.get() as OrderItemAttributes);
  }

  async updateOrderItem(
    id: number,
    data: UpdateOrderItemData
  ): Promise<OrderItemAttributes | null> {
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return null;
    }

    if (data.quantity !== undefined) {
      orderItem.quantity = data.quantity;
    }
    if (data.price !== undefined) {
      orderItem.price = data.price;
    }

    await orderItem.save();
    return orderItem.get() as OrderItemAttributes;
  }

  async removeOrderItem(id: number): Promise<boolean> {
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return false;
    }
    await orderItem.destroy();
    return true;
  }
}
