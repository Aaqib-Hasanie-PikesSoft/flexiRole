// src/routes/generalRouter.ts

import express from "express";
import { Router } from "express";
import userRoutes from "./modules/Users/routes";
import roleRoutes from "./modules/Roles/routes";
import permissionRoutes from "./modules/Permissions/routes";
import userRoleRoutes from "./modules/User_Roles/routes";
import rolePermissionRoutes from "./modules/Role_Permissions/routes";
import orderRoutes from "./modules/Orders/routes";
import orderItemsRoutes from "./modules/Order_items/routes";
import inventoryItemsRoutes from "./modules/Inventory/routes";
import { authenticate } from "./middlewares/authentication.middleware";

const generalRouter = Router();

generalRouter.use("/users-api", userRoutes);

generalRouter.use(authenticate);

generalRouter.use("/roles-api", roleRoutes);
generalRouter.use("/permissions-api", permissionRoutes);
generalRouter.use("/user-roles-api", userRoleRoutes);
generalRouter.use("/role-permission-api", rolePermissionRoutes);
generalRouter.use("/orders-api", orderRoutes);
generalRouter.use("/order-items-api", orderItemsRoutes);
generalRouter.use("/inventory-api", inventoryItemsRoutes);

export default generalRouter;
