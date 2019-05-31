/*
    Model : like
    likes model has foregin key postid which references to primary key id in postmodl
 */

'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    postid: DataTypes.INTEGER,
    likedon: DataTypes.DATE,
    likedby: DataTypes.INTEGER
  }, {});
  like.associate = function(models) {
    // associations can be defined here
    like.belongsTo(models.postmodel,{foreignKey: 'id' , onUpdate: 'cascade', onDelete: 'cascade'});
    like.belongsTo(models.user, {foreignKey: 'id' , onUpdate: 'cascade', onDelete: 'cascade'});
  };
  return like;
};
