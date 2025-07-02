import { Response, NextFunction } from "express";
import { PermissionEnum } from "../enums/permissions.enum";
import { getUserPermissions } from "../utils/user-permissions.utils";
import { Request } from "express";

export const permissionMiddleware = (requiredPermission: PermissionEnum) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    console.log("ye hai userId", userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const userPermissions = await getUserPermissions(userId);
      console.log("ye hai perns", userPermissions);
      if (userPermissions.includes(requiredPermission)) {
        return next();
      } else {
        return res.status(403).json({
          message: "Forbidden: You don't have the required permission",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
