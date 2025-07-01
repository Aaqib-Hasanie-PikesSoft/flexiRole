import { RolePermission } from "./model";

export class RolePermissionService {
  async assignPermission(role_id: number, permission_id: number) {
    return await RolePermission.create({ role_id, permission_id });
  }

  async getRolePermissions(role_id: number) {
    return await RolePermission.findAll({ where: { role_id } });
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
