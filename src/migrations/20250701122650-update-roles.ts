"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    // Add unique constraint on "role_name" in "Roles" table
    await queryInterface.addConstraint("Roles", {
      fields: ["role_name"],
      type: "unique",
      name: "unique_role_name_constraint", // explicit constraint name for easy rollback
    });
  },

  async down(queryInterface: any, Sequelize: any) {
    // Remove the unique constraint if rolling back
    await queryInterface.removeConstraint(
      "Roles",
      "unique_role_name_constraint"
    );
  },
};
