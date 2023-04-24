import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./User";
import { Team } from './Team';

export class Kid extends Model<InferAttributes<Kid>, InferCreationAttributes<Kid>> {
  declare id: CreationOptional<number>;
  declare UserId: ForeignKey<User['id']>;
  declare TeamId: CreationOptional<ForeignKey<Team['id']>>;
  declare name: string;
  declare surname: string;
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Kid.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    TeamId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Team',
        key: 'id',
      },
      unique: false,
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
    name: {
      type: Sequelize.STRING
    },
    surname: {
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
    tableName: 'Kid'
  }
)
