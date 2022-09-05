const mysql = require('mysql')
const postModel = require('./model')

exports.getPost = async (req, res) => {
    const postTitle = req.params.post

    const post = await postModel.findOne({title : postTitle})
    res.status(200).json({ post: post })
}

exports.deletePost = async (req,res) => {

    const postTitle = req.params.post
	
    await postModel.deleteOne({title : postTitle})

    const posts = await postModel.find()
    
    res.status(200).json({ posts: posts })
    
}

exports.getPosts = async (req, res) => {
    const query = req.query

    let posts = await postModel.find()

    if(posts == null){
        return res.status(404).json({success:false,message : "Posts not found"})
    }

    let filtered

    if(query.title){
        filtered = posts.filter( (post) => {
            return post.title.includes(query.title)
        })
    }
    else if(query.content){
        filtered = posts.filter( (post) => {
            return post.content < query.content
        })
        
    }
    else{
        filtered = posts
    }
    res.status(200).json({ posts: filtered })
}

exports.addPost = async (req, res) => {
    const { title, author, content } = req.body
    const data = {
        title: title ,
        author: author,
        content: content
    }
    let post = await postModel.findOne({title : data.title})

    if(post == null){
        post = await postModel.create(data)

        return res.status(201).json({ post: post })
    }
    return res.status(404).json({success:false,message : "Error"})
}