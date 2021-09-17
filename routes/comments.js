const express = require('express');

const {
    getComents,
    addComment,
    updateComent,
    deleteComment,
} = require('../controllers/Comments')

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(protect, getComents)
    .post(protect,/*authorize('specialist', 'admin')*/ addComment)


router
    .route('/:id')
    .put(protect,/*authorize('specialist', 'admin')*/ updateComent)
    .delete(protect,/*authorize('specialist', 'admin')*/deleteComment)

module.exports = router;