import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./User";

export class UserRefresh extends Model<InferAttributes<UserRefresh>, InferCreationAttributes<UserRefresh>> {
  declare id: CreationOptional<number>;
  declare UserId: ForeignKey<User['id']>;
  declare refresh: string;
  declare used: boolean;
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

UserRefresh.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      unique: false,
    },
    refresh: {
      type: Sequelize.STRING
    },
    used: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    tableName: 'UserRefresh'
  }
)
