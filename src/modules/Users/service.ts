import { User } from "./model";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
  async getAllUsers() {
    return await User.findAll();
  }
  async signUp(username: string, email: string, password: string) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async signIn(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }

  async createUser(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    return await User.create(userData);
  }

  async getUserByIdOrEmail(identifier: string) {
    if (!isNaN(Number(identifier))) {
      return await User.findByPk(Number(identifier));
    } else {
      return await User.findOne({ where: { email: identifier } });
    }
  }

  async updateUser(
    id: number,
    updates: Partial<{ username: string; email: string; password: string }>
  ) {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(updates);
      return user;
    }
    return null;
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
}
