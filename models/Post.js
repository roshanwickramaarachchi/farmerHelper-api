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
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

);

// Cascade delete comments when a post is deleted
PostSchema.pre('remove', async function (next) {
    console.log(`Comments being removed from post ${this._id}`);
    await this.model('Comment').deleteMany({ post: this._id });
    next();
});


// Reverse populate with virtuals
PostSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
    justOne: false
});

module.exports = mongoose.model('Post', PostSchema);