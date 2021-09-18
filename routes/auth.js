const express = require('express')
const {
    register,
    login,
    getMe,
    updateDetails,
    updatePassword,
} = require('../controllers/auth')

const router = express.Router()

const { protect } = require('../middleware/auth');

router.post('/register', register)
router.post('/login', login)
router.put('/updateDetails', protect, updateDetails)
router.put('/updatepassword', protect, updatePassword)
router.get('/me', protect, getMe)

module.exports = router