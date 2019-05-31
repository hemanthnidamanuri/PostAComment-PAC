/*
    Model :postmodel
    postmodel is for sequelize models defination
    two associations or relationship
    postmodel has many comments [ postmodel - id [PRIMARY KEY]  => comments = > postid [FOREIGN KEY]
    postmodel has many likes [ postmodel - id [PRIMARY KEY]  => likes = > postid [FOREIGN KEY]
 */

'use strict';
module.exports = (sequelize, DataTypes) => {
  const postmodel = sequelize.define('postmodel', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    postedby: DataTypes.INTEGER,
    postedon: DataTypes.DATE,
    tag: DataTypes.STRING,
    views: DataTypes.INTEGER
  }, {});
  postmodel.associate = function(models) {
    // associations can be defined here
    postmodel.hasMany(models.comment, {foreignKey: 'id',sourceKey: 'id'});
    postmodel.hasMany(models.like, {foreignKey: 'id',sourceKey: 'id'});
    postmodel.belongsTo(models.user, {foreignKey: 'postedby',targetKey:'id' });
  };
  return postmodel;
};
