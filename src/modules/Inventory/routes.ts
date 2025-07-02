// src/modules/inventory/routes.ts

import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./controller";
import { permissionMiddleware } from "../../middlewares/permission.middleware";
import { PermissionEnum } from "../../enums/permissions.enum";

const router = express.Router();

/**
 * @swagger
 * /api/inventory-api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_name
 *               - stock_quantity
 *               - price
 *             properties:
 *               product_name:
 *                 type: string
 *               stock_quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/products", createProduct);

/**
 * @swagger
 * /api/inventory-api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Inventory
 *     responses:
 *       200:
 *         description: A list of all products
 */
router.get(
  "/products",
  permissionMiddleware(PermissionEnum.CAN_VIEW_INVENTORY),
  getAllProducts
);

/**
 * @swagger
 * /api/inventory-api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/products/:id", getProductById);

/**
 * @swagger
 * /api/inventory-api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - Inventory
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
 *               product_name:
 *                 type: string
 *               stock_quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/products/:id", updateProduct);

/**
 * @swagger
 * /api/inventory-api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/products/:id", deleteProduct);

export default router;
