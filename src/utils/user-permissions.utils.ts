import { Permission } from "../../src/modules/Permissions/model";
import { RolePermission } from "../modules/Role_Permissions/model";
import { UserRole } from "../modules/User_Roles/model";

export interface UserRoleAttributes {
  user_id: number;
  role_id: number;
}

export interface RolePermissionAttributes {
  role_id: number;
  permission_id: number;
}

export interface PermissionAttributes {
  id: number;
  permission_name: string;
}

export async function getUserPermissions(user_id: number): Promise<string[]> {
  const userRoles = (await UserRole.findAll({
    where: { user_id },
  })) as unknown as UserRoleAttributes[];

  const roleIds = userRoles.map((ur) => ur.role_id);

  const rolePermissions = (await RolePermission.findAll({
    where: { role_id: roleIds },
  })) as unknown as RolePermissionAttributes[];

  const permissionIds = rolePermissions.map((rp) => rp.permission_id);

  const permissions = (await Permission.findAll({
    where: { id: permissionIds },
  })) as unknown as PermissionAttributes[];

  const permissionNames = permissions.map((p) => p.permission_name);

  return permissionNames;
}
