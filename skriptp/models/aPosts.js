'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class aPosts extends Model {
        static associate({AdminPosts}) {
            this.hasMany(AdminPosts, {foreignKey: "aPostId", as: "adminPost", onDelete: "cascade", hooks: true});
        }
    };
    aPosts.init({
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        content: DataTypes.STRING,
        date: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'aPosts',
    });
    return aPosts;
};