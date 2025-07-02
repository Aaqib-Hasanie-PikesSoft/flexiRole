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
  permission_name: string; // Change this from `name` to `permission_name`
}

export async function getUserPermissions(user_id: number): Promise<string[]> {
  console.log("Getting permissions for user_id:", user_id);

  const userRoles = (await UserRole.findAll({
    where: { user_id },
  })) as unknown as UserRoleAttributes[];

  console.log("User Roles:", userRoles);

  const roleIds = userRoles.map((ur) => ur.role_id);
  console.log("Role IDs:", roleIds);

  const rolePermissions = (await RolePermission.findAll({
    where: { role_id: roleIds },
  })) as unknown as RolePermissionAttributes[];

  console.log("Role Permissions:", rolePermissions);

  const permissionIds = rolePermissions.map((rp) => rp.permission_id);
  console.log("Permission IDs:", permissionIds);

  const permissions = (await Permission.findAll({
    where: { id: permissionIds },
  })) as unknown as PermissionAttributes[];

  console.log("Permissions:", permissions);

  const permissionNames = permissions.map((p) => p.permission_name); // Change `p.name` to `p.permission_name`
  console.log("Mapped Permission Names:", permissionNames);

  return permissionNames;
}
