// src/modules/user_roles/service.ts

import { UserRole } from "./model";

export class UserRoleService {
  async assignRole(user_id: number, role_id: number) {
    return await UserRole.create({ user_id, role_id });
  }

  async getAllUserRoles() {
    return await UserRole.findAll();
  }
  async updateUserRole(
    user_id: number,
    old_role_id: number,
    new_role_id: number
  ) {
    const existing = await UserRole.findOne({
      where: { user_id, role_id: old_role_id },
    });
    if (!existing) {
      return null; // not found
    }

    const duplicate = await UserRole.findOne({
      where: { user_id, role_id: new_role_id },
    });
    if (duplicate) {
      throw new Error("User already has the new role assigned.");
    }

    await existing.destroy();
    const updated = await UserRole.create({ user_id, role_id: new_role_id });
    return updated;
  }

  async getUserRoles(user_id: number) {
    return await UserRole.findAll({ where: { user_id } });
  }

  async removeUserRole(user_id: number, role_id: number) {
    const userRole = await UserRole.findOne({ where: { user_id, role_id } });
    if (userRole) {
      await userRole.destroy();
      return true;
    }
    return false;
  }
}
