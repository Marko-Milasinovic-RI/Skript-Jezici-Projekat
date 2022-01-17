const Joi = require("joi");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const { sequelize, Users, Films } = require("./models");
require("dotenv").config();

var corsOptions = {
    origin: "http://localhost:8001",
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post("/register", (req, res) => {
    var errorLog;
    var isValid = true;

    const objectCheck = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email
    };

    const reqs = Joi.object().keys({
        username: Joi.string().min(5).max(50).required(),
        firstname: Joi.string().min(2).required(),
        lastname: Joi.string().min(2).required(),
        password: Joi.string().min(10).required(),
        role: Joi.optional(),
        email: Joi.string().trim().email().required()
    });

    Joi.validate(objectCheck, reqs, (err, result) => {
        if(err){
            errorLog = err.message;
            isValid = false;
            console.log(err);
        }
    });

    objectCheck.password = bcrypt.hashSync(req.body.password, 10);

    if (isValid) {
        Users.create(objectCheck).then(rows => {
            const usr = {
                userId: rows.id,
                username: rows.username,
                role: rows.role
            };

            const newToken = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

            console.log("New user has been created with token: " + newToken);

            res.json({token: newToken});

        }).catch(err => res.status(500).json("Error: " + err));
    } else {
        res.json({err: errorLog});
    }
});

app.post("/login", (req, res) => {
    
    Users.findOne({where: {username: req.body.username}}).then( retUsername => {
            if(retUsername == null){
                res.status(400).json({msg: "Invalid credentials!"});
                return;
            }

            if(retUsername.role == "user"){
                res.json({msg: "Users not allowed!"});
                return;
            }
        
            if(bcrypt.compareSync(req.body.password, retUsername.password)){

                const tokenObject = {
                    userId: retUsername.id,
                    username: retUsername.username,
                    role: retUsername.role
                };

                const retToken = jwt.sign(tokenObject, process.env.ACCESS_TOKEN_SECRET);

                res.json({token: retToken});
            }else{
                res.status(400).json({msg: "Invalid credentials!"});
            }

        }).catch(err => res.status(500).json(err));
});

app.listen({ port: 9001 }, async() => {
    await sequelize.authenticate();
    console.log("Authentication has started on port: 9001");
});