const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 20,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 200,
    },
    status: {
      type: Boolean,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 200,
    },
    image: {
      type: [{ index: Number, path: String }],
    },
    quantity: {
      type: Number,
      require: true,
    },
    authorId: {
      type: mongoose.Schema.ObjectId,
      require: true,
      trim: true,
      ref: 'User',
    },
    comment: {
      type: mongoose.Schema.ObjectId,
      require: true,
      trim: true,
      ref: 'CommentList',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
