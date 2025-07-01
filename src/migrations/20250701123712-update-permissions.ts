import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addConstraint("Permissions", {
      fields: ["permission_name"],
      type: "unique",
      name: "unique_permission_name_constraint",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint(
      "Permissions",
      "unique_permission_name_constraint"
    );
  },
};
