import { Permission } from "./model";

export class PermissionService {
  async getAllPermissions() {
    return await Permission.findAll();
  }

  async createPermission(permissionData: {
    permission_name: string;
    description?: string;
  }) {
    return await Permission.create(permissionData);
  }

  async getPermissionByIdOrName(identifier: string) {
    if (!isNaN(Number(identifier))) {
      return await Permission.findByPk(Number(identifier));
    } else {
      return await Permission.findOne({
        where: { permission_name: identifier },
      });
    }
  }

  async updatePermission(
    id: number,
    updates: Partial<{ permission_name: string; description: string }>
  ) {
    const permission = await Permission.findByPk(id);
    if (permission) {
      await permission.update(updates);
      return permission;
    }
    return null;
  }

  async deletePermission(id: number) {
    const permission = await Permission.findByPk(id);
    if (permission) {
      await permission.destroy();
      return true;
    }
    return false;
  }
}
