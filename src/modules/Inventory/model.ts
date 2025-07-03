// src/modules/inventory/model.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database/database";
import {
  CreateInventoryData,
  InventoryAttributes,
} from "src/interfaces/inventory.interface";

class Inventory
  extends Model<InventoryAttributes, CreateInventoryData>
  implements InventoryAttributes
{
  public id!: number;
  public product_name!: string;
  public stock_quantity!: number;
  public price!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
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
  },
  {
    sequelize,
    tableName: "Inventory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export { Inventory };
