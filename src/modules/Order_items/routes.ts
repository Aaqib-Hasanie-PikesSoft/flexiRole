// src/modules/order_items/routes.ts

import express from "express";
import {
  addOrderItem,
  getAllOrderItems,
  getOrderItemsByOrderId,
  updateOrderItem,
  removeOrderItem,
} from "./controller";

const router = express.Router();

/**
 * @swagger
 * /api/order-items-api/order-items:
 *   post:
 *     summary: Add an order item
 *     tags:
 *       - OrderItems
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - inventory_id
 *               - quantity
 *               - price
 *             properties:
 *               order_id:
 *                 type: integer
 *               inventory_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Order item added successfully
 */
router.post("/order-items", addOrderItem);

/**
 * @swagger
 * /api/order-items-api/order-items:
 *   get:
 *     summary: Get all order items
 *     tags:
 *       - OrderItems
 *     responses:
 *       200:
 *         description: A list of all order items
 */
router.get("/order-items", getAllOrderItems);

/**
 * @swagger
 * /api/order-items-api/order-items/{order_id}:
 *   get:
 *     summary: Get all order items for a specific order
 *     tags:
 *       - OrderItems
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of order items for the order
 *       404:
 *         description: Order not found
 */
router.get("/order-items/:order_id", getOrderItemsByOrderId);

/**
 * @swagger
 * /api/order-items-api/order-items/{id}:
 *   put:
 *     summary: Update quantity or price of an order item
 *     tags:
 *       - OrderItems
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       404:
 *         description: Order item not found
 */
router.put("/order-items/:id", updateOrderItem);

/**
 * @swagger
 * /api/order-items-api/order-items/{id}:
 *   delete:
 *     summary: Remove an order item
 *     tags:
 *       - OrderItems
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order item removed successfully
 *       404:
 *         description: Order item not found
 */
router.delete("/order-items/:id", removeOrderItem);

export default router;
