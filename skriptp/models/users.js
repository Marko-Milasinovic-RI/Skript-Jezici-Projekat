'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate({AdminPosts, CreatorPosts}) {
      this.hasMany(AdminPosts, {foreignKey: "userId", as: "adminPosts", onDelete: "cascade", hooks: true});
      this.hasMany(CreatorPosts, {foreignKey: "userId", as: "creatorPosts", onDelete: "cascade", hooks: true});
    }
  };

  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "not e-mail"
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    //defaultScope:
    //{attributes: { exlude: ['email'] }},
    modelName: 'Users'
  });
  return Users;
};