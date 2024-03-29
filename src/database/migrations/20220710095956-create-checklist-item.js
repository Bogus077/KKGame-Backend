'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CheckListItem', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CheckListItem');
  }
};