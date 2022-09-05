const mysql = require('mysql')

const PostModel = new mysql.Schema({
    title: {
        type: String,
        required : true,
    },
    author: {
        type: String,
        required : false,
    },
    content: {
        type: String,
        required : false,
    }

})

module.exports = mysql.model('Post',PostModel)