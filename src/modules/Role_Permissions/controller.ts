import { Request, Response } from "express";
import { RolePermissionService } from "./service";

const rolePermissionService = new RolePermissionService();

export const assignPermission = async (req: Request, res: Response) => {
  const { role_id, permission_id } = req.body;
  try {
    const rolePermission = await rolePermissionService.assignPermission(
      role_id,
      permission_id
    );
    res.status(201).json(rolePermission);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getRolePermissions = async (req: Request, res: Response) => {
  const role_id = Number(req.params.role_id);
  try {
    const permissions = await rolePermissionService.getRolePermissions(role_id);
    res.status(200).json(permissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateRolePermission = async (req: Request, res: Response) => {
  const role_id = Number(req.params.role_id);
  const old_permission_id = Number(req.params.permission_id);
  const { new_permission_id } = req.body;

  if (!new_permission_id || typeof new_permission_id !== "number") {
    return res
      .status(400)
      .json({ message: "new_permission_id (number) is required in body." });
  }

  try {
    const updated = await rolePermissionService.updateRolePermission(
      role_id,
      old_permission_id,
      new_permission_id
    );
    if (!updated) {
      return res.status(404).json({ message: "Role permission not found." });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const removeRolePermission = async (req: Request, res: Response) => {
  const role_id = Number(req.params.role_id);
  const permission_id = Number(req.params.permission_id);
  try {
    const deleted = await rolePermissionService.removeRolePermission(
      role_id,
      permission_id
    );
    if (deleted) {
      res
        .status(200)
        .json({ message: "Role permission removed successfully." });
    } else {
      res.status(404).json({ message: "Role permission not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
