import { Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "created_at" | "updated_at"> {}
