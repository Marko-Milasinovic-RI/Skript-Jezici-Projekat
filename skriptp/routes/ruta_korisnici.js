const express = require('express');
const Joi = require("joi");
const { sequelize, Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: "Error: No token" });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });

        if(user.role != "ADMIN"){
            return res.json();
        }

        req.user = user;
    
        next();
    });
}

route.delete('/users', authToken, (req,res) => {

    Users.findOne({ where: { id: req.body.id } })
        .then( userInstance => {
            userInstance.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json({msg: "User with given id doesn't exist!"}) );
});

route.get('/users', authToken, (req, res) => {
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.put('/users', authToken, (req, res) => {
    Users.findOne({where: {id: req.body.id}})
        .then(usr => {
            var errorLog;
            var isValid = true;

            const payload = {
                username: req.body.username,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            };

            const sema = Joi.object().keys({
                username: Joi.string().min(3).max(20).required(),
                email: Joi.string().trim().email().required(),
                firstname: Joi.string().min(1).required(),
                lastname: Joi.string().min(1).required()
            });

            Joi.validate(payload, sema, (err, result) => {
                if (err) {
                    errorLog = err.message;
                    console.log(err);
                    isValid = false;
                }
            });

            if (isValid) {
                usr.username = req.body.username;
                usr.email = req.body.email;
                usr.firstname = req.body.firstname;
                usr.lastname = req.body.lastname;
                usr.role = req.body.role;

                usr.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json(err));
            } else {
                res.json({err: errorLog});
            }
        })
        .catch(err => res.status(500).json(err));

});

module.exports = route;