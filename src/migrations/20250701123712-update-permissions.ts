import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // Add unique constraint to "permission_name" in "Permissions" table
    await queryInterface.addConstraint("Permissions", {
      fields: ["permission_name"],
      type: "unique",
      name: "unique_permission_name_constraint", // explicit, clear constraint name
    });
  },

  async down(queryInterface: QueryInterface) {
    // Remove the unique constraint when rolling back
    await queryInterface.removeConstraint(
      "Permissions",
      "unique_permission_name_constraint"
    );
  },
};
