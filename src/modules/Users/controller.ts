import { Request, Response } from "express";
import { UserService } from "./service";

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
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
    res
      .status(500)
      .json({
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
    res
      .status(500)
      .json({
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
    res
      .status(500)
      .json({
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
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : String(error),
      });
  }
};
