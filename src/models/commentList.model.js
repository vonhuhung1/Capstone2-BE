const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const commentListSchema = mongoose.Schema(
  {
    commentId: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Comment',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
commentListSchema.plugin(toJSON);
commentListSchema.plugin(paginate);

const CommentList = mongoose.model('CommentList', commentListSchema);

module.exports = CommentList;
