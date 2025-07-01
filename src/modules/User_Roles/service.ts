// src/modules/user_roles/service.ts

import { UserRole } from "./model";

export class UserRoleService {
  async assignRole(user_id: number, role_id: number) {
    return await UserRole.create({ user_id, role_id });
  }

  async getAllUserRoles() {
    return await UserRole.findAll();
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
