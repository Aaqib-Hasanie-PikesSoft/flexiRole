import { Request, Response } from "express";
import { UserService } from "./service";
import { User } from "./model";
import { Role } from "../Roles/model";
import { Permission } from "../Permissions/model";

const userService = new UserService();
export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await userService.signUp(username, email, password);
    res.status(201).json({ message: "User created successfully.", user });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await userService.signIn(email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await userService.createUser({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getUserByIdOrEmail = async (req: Request, res: Response) => {
  const identifier = req.params.identifier;
  try {
    const user = await userService.getUserByIdOrEmail(identifier);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedUser = await userService.updateUser(parseInt(id), updates);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUser(parseInt(id));
    if (result) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] }, // exclude sensitive fields
      include: [
        {
          model: Role,
          through: { attributes: [] }, // hide UserRole join table
          include: [
            {
              model: Permission,
              through: { attributes: [] }, // hide RolePermission join table
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
