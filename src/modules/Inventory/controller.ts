// src/modules/inventory/controller.ts

import { Request, Response } from "express";
import { InventoryService } from "./service";
import {
  CreateInventoryData,
  UpdateInventoryData,
} from "src/interfaces/inventory.interface";

const inventoryService = new InventoryService();

export const createProduct = async (req: Request, res: Response) => {
  const { product_name, stock_quantity, price }: CreateInventoryData = req.body;
  try {
    const product = await inventoryService.createProduct({
      product_name,
      stock_quantity,
      price,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await inventoryService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const product = await inventoryService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { product_name, stock_quantity, price }: UpdateInventoryData = req.body;
  try {
    const updatedProduct = await inventoryService.updateProduct(id, {
      product_name,
      stock_quantity,
      price,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleted = await inventoryService.deleteProduct(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
