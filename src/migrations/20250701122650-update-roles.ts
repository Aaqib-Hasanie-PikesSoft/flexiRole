"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.addConstraint("Roles", {
      fields: ["role_name"],
      type: "unique",
      name: "unique_role_name_constraint",
    });
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.removeConstraint(
      "Roles",
      "unique_role_name_constraint"
    );
  },
};
