
/*
    like-Migration  formed from likes.
 */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('likes', {
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
      likedon: {
        type: Sequelize.DATE
      },
      likedby: {
        type: Sequelize.INTEGER,
        references:{
          foreignKey: 'id',
          model: 'users',
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
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
    return queryInterface.dropTable('likes');
  }
};
