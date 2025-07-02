// src/modules/orders/service.ts

import { OrderAttributes } from "src/interfaces/order-attributes.interface";
import { Order } from "./model";
import { OrderStatusEnum } from "src/enums/order-status.enum";

export class OrderService {
  async createOrder(data: {
    user_id: number;
    order_date: Date;
    order_status: string;
    total_amount: number;
  }) {
    return await Order.create(data);
  }

  async getAllOrders() {
    return await Order.findAll();
  }

  async getUserOrders(user_id: number) {
    return await Order.findAll({ where: { user_id } });
  }

  async updateOrderStatus(order_id: number, new_status: OrderStatusEnum) {
    const order = await Order.findByPk(order_id);
    if (!order) {
      return null;
    }
    const orderTyped = order as unknown as OrderAttributes;
    orderTyped.order_status = new_status;
    await (order as any).save();
    return orderTyped;
  }

  async deleteOrder(order_id: number) {
    const order = await Order.findByPk(order_id);
    if (!order) {
      return false;
    }
    await order.destroy();
    return true;
  }
}
