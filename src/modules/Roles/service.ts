import { Role } from "./model";

export class RoleService {
  async getAllRoles() {
    return await Role.findAll();
  }

  async createRole(roleData: { role_name: string; description?: string }) {
    return await Role.create(roleData);
  }

  async getRoleByIdOrName(identifier: string) {
    if (!isNaN(Number(identifier))) {
      return await Role.findByPk(Number(identifier));
    } else {
      return await Role.findOne({ where: { role_name: identifier } });
    }
  }

  async updateRole(
    id: number,
    updates: Partial<{ role_name: string; description: string }>
  ) {
    const role = await Role.findByPk(id);
    if (role) {
      await role.update(updates);
      return role;
    }
    return null;
  }

  async deleteRole(id: number) {
    const role = await Role.findByPk(id);
    if (role) {
      await role.destroy();
      return true;
    }
    return false;
  }
}
