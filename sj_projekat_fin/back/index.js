const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser') 
const jwt = require('jsonwebtoken')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const PORT = 3003
const URLmysql = "mysql://localhost:27017/Posts?readPreference=primary&appname=MysqlDB%sifra123&ssl=false" 
mysql.connect(URLmysql, { useNewUrlParser: true,useUnifiedTopology: true },(error) => {
    if(!error){
        console.log("Success Connected");
    }else{
        console.log("Error connecting problem");
    }
})


// Routers
const postsRouter = require('./posts/route')

app.use('/posts', postsRouter)


const userRouter = require('./posts/userRoute')

app.use('/users', userRouter)

const server = app.listen(PORT, console.log(`Server running on port ${PORT}.`))