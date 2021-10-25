const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const replyCommentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            trim: true,
            minLength: 0,
            maxLength: 150
        },
        author_id: {
            type: mongoose.Schema.ObjectId,
            require: true,
            trim: true,
            ref:'User',
        },
        status: {
            type: Boolean,
            required: true,
          },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
replyCommentSchema.plugin(toJSON);
replyCommentSchema.plugin(paginate);

const replyComment = mongoose.model('replyComment', replyCommentSchema);

module.exports = replyComment;
