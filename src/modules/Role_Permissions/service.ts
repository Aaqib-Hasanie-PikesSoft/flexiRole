import { RolePermission } from "./model";

export class RolePermissionService {
  async assignPermission(role_id: number, permission_id: number) {
    return await RolePermission.create({ role_id, permission_id });
  }

  async getRolePermissions(role_id: number) {
    return await RolePermission.findAll({ where: { role_id } });
  }
  async updateRolePermission(
    role_id: number,
    old_permission_id: number,
    new_permission_id: number
  ) {
    const existing = await RolePermission.findOne({
      where: { role_id, permission_id: old_permission_id },
    });

    if (!existing) {
      return null; // not found
    }

    const duplicate = await RolePermission.findOne({
      where: { role_id, permission_id: new_permission_id },
    });

    if (duplicate) {
      throw new Error("Role already has the new permission assigned.");
    }

    await existing.destroy();
    const updated = await RolePermission.create({
      role_id,
      permission_id: new_permission_id,
    });
    return updated;
  }

  async removeRolePermission(role_id: number, permission_id: number) {
    const rolePermission = await RolePermission.findOne({
      where: { role_id, permission_id },
    });
    if (rolePermission) {
      await rolePermission.destroy();
      return true;
    }
    return false;
  }
}
