import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./User";

export class SmsCode extends Model<InferAttributes<SmsCode>, InferCreationAttributes<SmsCode>> {
  declare id: CreationOptional<number>;
  declare phone: string;
  declare code: string;
  declare used: CreationOptional<boolean>;
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

SmsCode.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    phone: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    },
    used: {
      allowNull: true,
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
    tableName: 'SmsCode'
  }
)
