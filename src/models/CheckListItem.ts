import { sequelize } from '../database/database.config';
import { CreationOptional, DataTypes as Sequelize, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./User";
import { CheckList } from './CheckList';

export class CheckListItem extends Model<InferAttributes<CheckListItem>, InferCreationAttributes<CheckListItem>> {
  declare id: CreationOptional<number>;
  declare CheckListId: ForeignKey<CheckList['id']>;
  declare title: string;
  declare time: number;
  declare check: boolean;
  declare order: number;
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

CheckListItem.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    CheckListId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'CheckList',
        key: 'id',
      },
      unique: false,
    },
    title: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.INTEGER
    },
    check: {
      type: Sequelize.BOOLEAN
    },
    order: {
      type: Sequelize.INTEGER
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
    tableName: 'CheckListItem'
  }
)
