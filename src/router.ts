import express from "express";
import { Router } from "express";
import userRoutes from "./modules/Users/routes";
import roleRoutes from "./modules/Roles/routes";
import permissionRoutes from "./modules/Permissions/routes";
import userRoleRoutes from "./modules/User_Roles/routes";

const generalRouter = Router();

generalRouter.use("/users-api", userRoutes);
generalRouter.use("/roles-api", roleRoutes);
generalRouter.use("/permissions-api", permissionRoutes);
generalRouter.use("/user-roles-api", userRoleRoutes);

export default generalRouter;
