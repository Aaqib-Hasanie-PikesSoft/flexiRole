"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable("Role_permission", {
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Permissions",
          key: "id",
        },
        onDelete: "CASCADE",
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
    });

    await queryInterface.addConstraint("Role_permission", {
      fields: ["role_id", "permission_id"],
      type: "unique",
      name: "unique_role_permission_constraint",
    });
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable("Role_permission");
  },
};
