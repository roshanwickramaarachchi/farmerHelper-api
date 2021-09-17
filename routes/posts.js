const express = require('express')
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/Posts')

const Post = require('../models/Post')

// Include other resource routers
const commentRouter = require('./comments');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:postId/comments', commentRouter);

router
    .route('/')
    .get(protect, getPosts)
    .post(protect, createPost)

router
    .route('/:id')
    .put(protect, updatePost)
    .delete(protect, deletePost)

module.exports = router;