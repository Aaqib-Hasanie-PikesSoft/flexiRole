import { Request, Response } from "express";
import { UserRoleService } from "./service";

const userRoleService = new UserRoleService();

export const assignRole = async (req: Request, res: Response) => {
  const { user_id, role_id } = req.body;
  try {
    const userRole = await userRoleService.assignRole(user_id, role_id);
    res.status(201).json(userRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllUserRoles = async (_req: Request, res: Response) => {
  try {
    const userRoles = await userRoleService.getAllUserRoles();
    res.status(200).json(userRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getUserRoles = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  try {
    const userRoles = await userRoleService.getUserRoles(user_id);
    res.status(200).json(userRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const removeUserRole = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  const role_id = Number(req.params.role_id);
  try {
    const deleted = await userRoleService.removeUserRole(user_id, role_id);
    if (deleted) {
      res.status(200).json({ message: "User role removed successfully." });
    } else {
      res.status(404).json({ message: "User role not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  const old_role_id = Number(req.params.role_id);
  const { new_role_id } = req.body;

  if (!new_role_id || typeof new_role_id !== "number") {
    return res
      .status(400)
      .json({ message: "new_role_id (number) is required in body." });
  }

  try {
    const updated = await userRoleService.updateUserRole(
      user_id,
      old_role_id,
      new_role_id
    );
    if (!updated) {
      return res.status(404).json({ message: "User role not found." });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
