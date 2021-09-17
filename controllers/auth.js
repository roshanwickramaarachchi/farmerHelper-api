const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role, photo, description } = req.body;

    // Create user
    const user = await User.create({ 
        name,
        email,
        password,
        role,
        photo,
        description,
    });

    sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }
  
    // Check for user
    const user = await User.findOne({ email }).select('+password');
  
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    // Check if password matches
    const isMatch = await user.matchPassword(password);
  
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    sendTokenResponse(user, 200, res);
  });

// Get token from model and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();       
      
    res
      .status(statusCode)
      .json({
        success: true,
        token,
      });
  };