const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },
        role: {
            type: String,
            enum: ['farmer', 'specialist'],
            default: 'farmer'
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
            select: false
        },
        photo: {
            type: String,
            //required: true,
            default: 'no-photo.jpg'
        },
        description: {
            type: String,
            //required: [true, 'Please add a description'],
            maxlength: [500, 'Description can not be more than 500 characters']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Reverse populate with virtuals
UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});

// Encrypt password using bcrypt   
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);