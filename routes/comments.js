const express = require('express');

const { 
    getComents,
    addComment,
    updateComent,
    deleteComment,
} = require('../controllers/Comments')

const Comment = require('../models/Comment');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getComents)
    .post(addComment)


router
    .route('/:id')
    .put(updateComent)
    .delete(deleteComment)

module.exports = router;