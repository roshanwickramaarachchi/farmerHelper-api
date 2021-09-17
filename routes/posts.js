const express = require('express')
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/Posts')

const Post = require('../models/Post')

// Include other resource routers
const commentRouter = require('./comments');

const router = express.Router();

// Re-route into other resource routers
router.use('/:postId/comments', commentRouter);

router
    .route('/')
    .get(getPosts)
    .post(createPost)

router
    .route('/:id')
    .put(updatePost)
    .delete(deletePost)

module.exports = router;