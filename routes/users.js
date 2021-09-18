const express = require('express');
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/users');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;







