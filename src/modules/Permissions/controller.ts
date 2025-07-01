import { Request, Response } from "express";
import { PermissionService } from "./service";

const permissionService = new PermissionService();

export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : String(error),
      });
  }
};

export const createPermission = async (req: Request, res: Response) => {
  const { permission_name, description } = req.body;

  try {
    const newPermission = await permissionService.createPermission({
      permission_name,
      description,
    });
    res.status(201).json(newPermission);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : String(error),
      });
  }
};

export const getPermissionByIdOrName = async (req: Request, res: Response) => {
  const { identifier } = req.params;

  try {
    const permission = await permissionService.getPermissionByIdOrName(
      identifier
    );
    if (permission) {
      res.status(200).json(permission);
    } else {
      res.status(404).json({ message: "Permission not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : String(error),
      });
  }
};

export const updatePermission = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updates = req.body;

  try {
    const updatedPermission = await permissionService.updatePermission(
      id,
      updates
    );
    if (updatedPermission) {
      res.status(200).json(updatedPermission);
    } else {
      res.status(404).json({ message: "Permission not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : String(error),
      });
  }
};

export const deletePermission = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const deleted = await permissionService.deletePermission(id);
    if (deleted) {
      res.status(200).json({ message: "Permission deleted successfully." });
    } else {
      res.status(404).json({ message: "Permission not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : String(error),
      });
  }
};
