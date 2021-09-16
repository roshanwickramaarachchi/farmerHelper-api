const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Post = require('../models/Post');

// @desc      Get all posts
// @route     GET /api/v1/posts
// @access    Public
exports.getPosts = async (req, res, next) => {
    try {
        const post = await Post.find();

        res.status(201).json({
            success: true,
            count: post.length,
            data: post
        });

    } catch (err) {
        res.status(400).json({ succcess: false, error: err })
    }

};

// @desc      Create new post
// @route     POST /api/v1/posts
// @access    Private
exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);

        res.status(201).json({
            success: true,
            data: post
        });

    } catch (err) {
        res.status(400).json({ succcess: false, error: err })
    }

};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updatePost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ succcess: false })
        }

        post = await Post.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
          });

        res.status(200).json({
            success: true,
            data: post
        });

    } catch (err) {
        res.status(400).json({ succcess: false, error: err })
    }

};

// @desc      Delete post
// @route     DELETE /api/v1/posts/:id
// @access    Private

exports.deletePost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ succcess: false })
        }

        Post.remove();

        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (err) {
        res.status(400).json({ succcess: false, error: err })
    }

};