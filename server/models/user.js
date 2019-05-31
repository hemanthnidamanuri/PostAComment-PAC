'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.postmodel, {foreignKey: 'postedby', sourceKey: 'id'});
    user.hasMany(models.comment, {foreignKey: 'commentedby', sourceKey: 'id'});
  };
  return user;
};
