const express = require('express')
const { getPosts, createPost,updatePost, deletePost } = require('../controllers/Posts')

const Post = require('../models/Post')

const router = express.Router();

router
    .route('/')
    .get(getPosts)
    .post(createPost)

router 
     .route('/:id')
     .put(updatePost)
     .delete(deletePost)

module.exports = router;