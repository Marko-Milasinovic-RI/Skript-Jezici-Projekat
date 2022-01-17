'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class cPosts extends Model {
        static associate({CreatorPosts}) {
            this.hasMany(CreatorPosts, {foreignKey: "cPostId", as: "creatorPost", onDelete: "cascade", hooks: true});
        }
    };
    cPosts.init({
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        content: DataTypes.STRING,
        date: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'cPosts',
    });
    return cPosts;
};