// src/modules/order_items/controller.ts

import { Request, Response } from "express";
import { OrderItemService } from "./service";
import {
  CreateOrderItemData,
  UpdateOrderItemData,
} from "src/enums/order-items.interface";

const orderItemService = new OrderItemService();

export const addOrderItem = async (req: Request, res: Response) => {
  const { order_id, inventory_id, quantity, price }: CreateOrderItemData =
    req.body;
  try {
    const orderItem = await orderItemService.addOrderItem({
      order_id,
      inventory_id,
      quantity,
      price,
    });
    res.status(201).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllOrderItems = async (_req: Request, res: Response) => {
  try {
    const orderItems = await orderItemService.getAllOrderItems();
    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getOrderItemsByOrderId = async (req: Request, res: Response) => {
  const order_id = Number(req.params.order_id);
  try {
    const orderItems = await orderItemService.getOrderItemsByOrderId(order_id);
    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateOrderItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { quantity, price }: UpdateOrderItemData = req.body;
  try {
    const updatedItem = await orderItemService.updateOrderItem(id, {
      quantity,
      price,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Order item not found." });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const removeOrderItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleted = await orderItemService.removeOrderItem(id);
    if (!deleted) {
      return res.status(404).json({ message: "Order item not found." });
    }
    res.status(200).json({ message: "Order item removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
