import { DataTypes } from "sequelize";
import { sequelize } from "../../database";

const RolePermission = sequelize.define(
  "RolePermission",
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Role_permission",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export { RolePermission };
