import { sequelize } from '../database/database.config';
import { Association, CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare phone: string;
  declare password: string;
  declare name: CreationOptional<string>;
  declare lastName: CreationOptional<string>;
  declare middleName: CreationOptional<string>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

User.init(
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
    password: {
      type: Sequelize.STRING
    },
    name: {
      allowNull: true,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: true,
      type: Sequelize.STRING
    },
    middleName: {
      allowNull: true,
      type: Sequelize.STRING
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
    tableName: 'User'
  }
)
