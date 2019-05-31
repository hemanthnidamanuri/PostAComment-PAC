
/*
    postmodel-Migration  formed from postmodel.
 */

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('postmodels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING(1000)
      },
      postedby: {
        type: Sequelize.INTEGER,
        references:{
          foreignKey: 'id',
          model: 'users',
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      },
      postedon: {
        type: Sequelize.DATE
      },
      tag: {
        type: Sequelize.STRING
      },
      views:{
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
  down: (queryInterface) => {
    return queryInterface.dropTable('postmodels');
  }
};
