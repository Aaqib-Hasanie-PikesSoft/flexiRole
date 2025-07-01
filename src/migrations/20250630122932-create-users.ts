import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: {
    createTable: (
      arg0: string,
      arg1: {
        id: {
          type: DataTypes.IntegerDataTypeConstructor;
          primaryKey: boolean;
          autoIncrement: boolean;
          unique: boolean;
        };
        username: {
          type: DataTypes.StringDataTypeConstructor;
          allowNull: boolean;
        };
        email: {
          type: DataTypes.StringDataTypeConstructor;
          allowNull: boolean;
          unique: boolean;
        };
        password: {
          type: DataTypes.StringDataTypeConstructor;
          allowNull: boolean;
        };
        created_at: {
          type: DataTypes.DateDataTypeConstructor;
          allowNull: boolean;
          defaultValue: DataTypes.AbstractDataTypeConstructor;
        };
        updated_at: {
          type: DataTypes.DateDataTypeConstructor;
          allowNull: boolean;
          defaultValue: DataTypes.AbstractDataTypeConstructor;
        };
      }
    ) => any;
  }) => {
    return queryInterface.createTable("Users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
  },

  down: async (queryInterface: { dropTable: (arg0: string) => any }) => {
    return queryInterface.dropTable("Users");
  },
};
