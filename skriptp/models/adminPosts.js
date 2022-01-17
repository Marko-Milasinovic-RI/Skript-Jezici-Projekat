'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AdminPosts extends Model {
        static associate({Users, APosts}) {
            this.belongsTo(Users, {foreignKey: "userId", as: "user"});
            this.belongsTo(APosts, {foreignKey: "aPostId", as: "aPost"});
        }
    };
    AdminPosts.init({

            comment: DataTypes.STRING,
            sfw: DataTypes.BOOLEAN,
            likes: DataTypes.INTEGER,
            controversial: DataTypes.FLOAT
        },
        {
            sequelize,
            modelName: 'AdminPosts',
        });
    return AdminPosts;
};