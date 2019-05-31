
/*
    comment-Migration  formed from comment.
 */

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postid: {
        type: Sequelize.INTEGER,
        references:{
          foreignKey: 'id',
          model: 'postmodels',
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      },
      commentedby: {
        type: Sequelize.INTEGER,
        references:{
          foreignKey: 'id',
          model: 'users',
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      },
      commentedon: {
        type: Sequelize.DATE
      },
      commentcontent: {
        type: Sequelize.STRING(500)
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comments');
  }
};
