// src/modules/orders/routes.ts

import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} from "./controller";
import { PermissionEnum } from "../../enums/permissions.enum";
import { permissionMiddleware } from "../../middlewares/permission.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/orders-api/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - order_date
 *               - order_status
 *               - total_amount
 *             properties:
 *               user_id:
 *                 type: integer
 *               order_date:
 *                 type: string
 *                 format: date-time
 *               order_status:
 *                 type: string
 *               total_amount:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/orders", createOrder);

/**
 * @swagger
 * /api/orders-api/orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: A list of all orders
 */
router.get("/orders", getAllOrders);

/**
 * @swagger
 * /api/orders-api/orders/{user_id}:
 *   get:
 *     summary: Get all orders for a specific user
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of orders for the user
 *       404:
 *         description: User not found
 */
router.get("/orders/:user_id", getUserOrders);

/**
 * @swagger
 * /api/orders-api/orders/{order_id}:
 *   put:
 *     summary: Update order status
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - new_status
 *             properties:
 *               new_status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 */
router.put("/orders/:order_id", updateOrderStatus);

/**
 * @swagger
 * /api/orders-api/orders/{order_id}:
 *   delete:
 *     summary: Delete an order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete(
  "/orders/:order_id",
  permissionMiddleware(PermissionEnum.CAN_DELETE_ORDER),
  deleteOrder
);

export default router;
