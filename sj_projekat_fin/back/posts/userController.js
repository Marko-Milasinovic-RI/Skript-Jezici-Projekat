const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const userModel = require('./userModel')
const bcrypt = require('bcrypt');


exports.getUser = async (req, res) => {
    const userEmail = req.params.user

    const user = await userModel.findOne({email : userEmail})

    if (!user) {
        res.statusMessage = `No user with email '${userEmail}' was found`
        res.status(404).end()
    } else {
        res.status(200).json({ user: user })
    }
}

exports.getUsers = async (req, res) => {
    let users = await userModel.find()

    if(users == null){
        return res.status(404).json({success:false,message : "Err"})
    }
    res.status(200).json({ users: users })
}

exports.loginUser = async (req, res) => {
    const body = req.body
    let user = await userModel.findOne({email : body.email})
    if(!user) {
        return res.status(404).json({success:false, message : "Err! "})
    }

    const validPassword = await bcrypt.compare(body.password, user.password);

    jwt.sign({user: user}, 'secretKey', (err, token) => {
        if (err) throw err
        else {
            if(validPassword) return res.status(200).json({token, user: user, validPassword })
            else return res.status(403).json({success:false, message: "Err"})
        }
    });
}

exports.postUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    const data = {
        first_name: first_name ,
        last_name: last_name,
        email: email,
        password: password
    }

    const salt = await bcrypt.genSalt(10);

    data.password = await bcrypt.hash(data.password, salt);

    let user = await userModel.findOne({email : data.email})
    if(user == null){
        user = await userModel.create(data)
        return res.status(201).json({ user: user })
    }
    return res.status(404).json({success:false,message : "Err! "})
}