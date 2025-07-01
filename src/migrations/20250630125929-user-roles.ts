"use strict";

import { DataTypes, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.createTable("User_roles", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addConstraint("User_roles", {
      fields: ["user_id", "role_id"],
      type: "unique",
      name: "unique_user_role_constraint",
    });
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable("User_roles");
  },
};
