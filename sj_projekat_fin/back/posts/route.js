const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const jwt = require('jsonwebtoken');

const { getPost, getPosts, deletePost, addPost } = require('./controller')

router.get('/:post', authenticateToken, getPost)
router.get('/getPosts', authenticateToken, getPosts)
router.delete('/:post', deletePost)
router.post('/addPost', addPost)

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
