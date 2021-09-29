const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const commentSchema = mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
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
commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
