import { User } from "./model";

export class UserService {
  async getAllUsers() {
    return await User.findAll();
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
