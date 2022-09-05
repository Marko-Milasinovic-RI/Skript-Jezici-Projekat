const express = require('express')
const mysql = require('mysql')
const jwt = require('jsonwebtoken');

const router = express.Router()

const { postUser, loginUser, getUsers, getUser } = require('./userController')

router.post('/postUser', postUser)
router.post('/logIn', loginUser)
router.get('/getUsers', authenticateToken, getUsers)
router.get('/:user', authenticateToken, getUser)


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'secretKey', (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    } else {
        return res.sendStatus(401)
    }
}

module.exports = router