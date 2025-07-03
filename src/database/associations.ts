import { User } from "../modules/Users/model";
import { Role } from "../modules/Roles/model";
import { Permission } from "../modules/Permissions/model";
import { UserRole } from "../modules/User_Roles/model";
import { RolePermission } from "../modules/Role_Permissions/model";

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  otherKey: "role_id",
});
Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  otherKey: "user_id",
});

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "role_id",
  otherKey: "permission_id",
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permission_id",
  otherKey: "role_id",
});
