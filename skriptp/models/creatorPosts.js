'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CreatorPosts extends Model {
        static associate({Users, APosts}) {
            this.belongsTo(Users, {foreignKey: "userId", as: "user"});
            this.belongsTo(APosts, {foreignKey: "cPostId", as: "cPost"});
        }
    };
    CreatorPosts.init({

            comment: DataTypes.STRING,
            sfw: DataTypes.BOOLEAN,
            likes: DataTypes.INTEGER,
            controversial: DataTypes.FLOAT
        },
        {
            sequelize,
            modelName: 'CreatorPosts',
        });
    return CreatorPosts;
};