const Joi = require("joi");
const express = require('express');
const jwt = require('jsonwebtoken');
const { sequelize, SPosts, Users } = require('../models');
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


route.get('/sposts', (req, res) => {
    SPosts.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

route.post("/sposts", (req, res) => {
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
        SPosts.create(obj)
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json("Error = " + err));
    } else {
        res.json({err: ifError});
    }
});

route.delete('/sposts', (req,res) => {
    SPosts.findOne({where: {id: req.body.id}})
        .then(aPost => {
            aPost.destroy()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
});

route.put('/sposts', (req, res) => {
    SPosts.findOne({where: {id: req.body.id}})
        .then(sPost => {
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
                sPost.controversial = req.body.controversial;
                sPost.comment = req.body.comment;
                sPost.sfw = req.body.sfw;
                sPost.likes = req.body.likes;

                sPost.save().then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err));
            } else {
                res.json({err: ifError});
            }
        })
        .catch(err => res.status(500).json(err));

});

module.exports = route;