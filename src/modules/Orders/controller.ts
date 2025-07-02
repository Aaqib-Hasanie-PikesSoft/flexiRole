// src/modules/orders/controller.ts

import { Request, Response } from "express";
import { OrderService } from "./service";

const orderService = new OrderService();

export const createOrder = async (req: Request, res: Response) => {
  const { user_id, order_date, order_status, total_amount } = req.body;
  try {
    const order = await orderService.createOrder({
      user_id,
      order_date,
      order_status,
      total_amount,
    });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  try {
    const orders = await orderService.getUserOrders(user_id);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const order_id = Number(req.params.order_id);
  const { new_status } = req.body;
  try {
    const order = await orderService.updateOrderStatus(order_id, new_status);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const order_id = Number(req.params.order_id);
  try {
    const deleted = await orderService.deleteOrder(order_id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
