const mysql = require('mysql')

const UserModel = new mysql.Schema({
    first_name: {
        type: String,
        required : true,
    },
    last_name: {
        type: String,
        required : false,
    },
    email: {
        type: String,
        required : false,
    },
    password: {
        type: String,
        required : true,
    }

})

module.exports = mysql.model('User',UserModel)