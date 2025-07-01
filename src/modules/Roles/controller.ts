import { Request, Response } from "express";
import { RoleService } from "./service";

const roleService = new RoleService();

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : String(error),
      });
  }
};

export const createRole = async (req: Request, res: Response) => {
  const { role_name, description } = req.body;

  try {
    const newRole = await roleService.createRole({ role_name, description });
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : String(error),
      });
  }
};

export const getRoleByIdOrName = async (req: Request, res: Response) => {
  const { identifier } = req.params;

  try {
    const role = await roleService.getRoleByIdOrName(identifier);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: "Role not found." });
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

export const updateRole = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updates = req.body;

  try {
    const updatedRole = await roleService.updateRole(id, updates);
    if (updatedRole) {
      res.status(200).json(updatedRole);
    } else {
      res.status(404).json({ message: "Role not found." });
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

export const deleteRole = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const deleted = await roleService.deleteRole(id);
    if (deleted) {
      res.status(200).json({ message: "Role deleted successfully." });
    } else {
      res.status(404).json({ message: "Role not found." });
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
