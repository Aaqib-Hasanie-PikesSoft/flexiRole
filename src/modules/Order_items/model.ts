// src/modules/order_items/model.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../database";
import { OrderItemAttributes } from "src/enums/order-items.interface";

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, "id"> {}

class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public order_id!: number;
  public inventory_id!: number;
  public quantity!: number;
  public price!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
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
    tableName: "Order_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export { OrderItem };
