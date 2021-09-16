const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [500, 'Description can not be more than 500 characters']
        },
        //averageLike: Number,
        photo: {
            type: String,
            //required: true,
            default: 'no-photo.jpg'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },

    },

);

module.exports = mongoose.model('Post', PostSchema);