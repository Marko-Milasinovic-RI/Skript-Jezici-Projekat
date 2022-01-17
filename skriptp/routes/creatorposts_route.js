const Joi = require("joi");
const express = require('express');
const jwt = require('jsonwebtoken');
const { sequelize, CreatorPosts, Users } = require('../models');
require('dotenv').config();

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({msg: "Error"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.status(403).json({msg: err});

        req.user = user;

        next();
    });
}

route.use(authToken);

route.get('/creatorPosts', (req, res) => {
    CreatorPosts.findAll({include: ["user"]})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

route.post("/creatorPosts", (req, res) => {
    var ifError;
    var isValid = true;

    const objectCheck = {
        controversial: req.body.controversial,
        comment: req.body.comment,
        likes: req.body.likes
    }

    const reqs = Joi.object().keys({
        controversial: Joi.number().required(),
        comment: Joi.string().required(),
        likes: Joi.number().required()
    });

    Joi.validate(objectCheck, reqs, (err, result) => {
        if (err) {
            ifError = err.message;
            isValid = false;
            console.log(err);
        }
    });

    const post = {
        comment: DataTypes.STRING,
        sfw: DataTypes.BOOLEAN,
        likes: DataTypes.INTEGER,
        controversial: DataTypes.FLOAT
    };

    if (isValid) {
        CreatorPosts.create(post)
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json("Error: " + err));
    } else {
        res.json({err: ifError});
    }
});

route.delete('/creatorPosts', (req,res) => {
    CreatorPosts.findOne({where: {id: req.body.id}})
        .then(creatorPost => {
            creatorPost.destroy()
                .then(rows => res.json(rows))
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
});

route.put('/creatorPosts', (req, res) => {
    CreatorPosts.findOne({where: {id: req.body.id}})
        .then(creatorPost => {
            var ifError;
            var isValid = true;

            const objectCheck = {
                controversial: req.body.controversial,
                comment: req.body.comment,
                likes: req.body.likes
            }

            const reqs = Joi.object().keys({
                controversial: Joi.number().required(),
                comment: Joi.string().required(),
                likes: Joi.number().required()
            });

            Joi.validate(objectCheck, reqs, (err, result) => {
                if (err) {
                    ifError = err.message;
                    isValid = false;
                    console.log(err);
                }
            });

            if (isValid) {
                creatorPost.controversial = req.body.controversial;
                creatorPost.comment = req.body.comment;
                creatorPost.sfw = req.body.sfw;
                creatorPost.likes = req.body.likes;

                creatorPost.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err));
            } else {
                res.json({err: ifError});
            }
        })
        .catch(err => res.status(500).json(err));
});



module.exports = route;