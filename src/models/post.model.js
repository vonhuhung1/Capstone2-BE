const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 1000,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 20000,
    },
    status: {
      type: Boolean,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      minLength: 0,
      maxLength: 200,
    },
    image: {
      type: String,
      require: true,
      trim: true,
      minlength: 0,
      maxLength: 150,
    },
    slub: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      maxLength: 5000,
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
