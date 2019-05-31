/*
    Model : comment
    comment model has foregin key postid which references to primary key id in postmodl
 */

'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    postid: DataTypes.INTEGER,
    commentedby: DataTypes.INTEGER,
    commentedon: DataTypes.DATE,
    commentcontent: DataTypes.STRING
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    comment.belongsTo(models.postmodel, {foreignKey: 'id', onUpdate: 'cascade', onDelete: 'cascade'});
    comment.belongsTo(models.user, {foreignKey: 'commentedby' , targetKey: 'id'});
  };
  return comment;
};
