import express from "express";
import { Router } from "express";
import userRoutes from "./modules/Users/routes";
import roleRoutes from "./modules/Roles/routes";
import permissionRoutes from "./modules/Permissions/routes";

const generalRouter = Router();

generalRouter.use("/users-api", userRoutes);
generalRouter.use("/roles-api", roleRoutes);
generalRouter.use("/permissions-api", permissionRoutes);

export default generalRouter;
